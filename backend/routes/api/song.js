const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require('../../db/models')

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3')

const validateSongs = [
  check("title")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Song title is required"),
  handleValidationErrors,
];

const validateComments = [
  check("body")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('"Comment body text is required"'),
];

const router = express.Router();


router.get('/', async(req, res) => {
  
  let { page, size } = req.query
  
  page = parseInt(page)
  size = parseInt(size)
  
  if( page < 1 || size < 1) {
    res.json(res.status = 400,
      {
      message: "Validation Error",
      statusCode: 400,
      errors: {
        page: "Page must be greater than or equal to 1",
        size: "Size must be greater than or equal to 1",
        createdAt: "CreatedAt is invalid",
      },
    });
  }
  
  page ? null: page = 1
  size ? null: size = 20
  
  page > 10 ? page = 10: null
  size > 20 ? size = 20: null
  
  let limit = size
  let offset = size * (page - 1)
  
  const songs = await Song.findAll({
    include: {
      model: User,
      attributes: ["id", "username", "imageUrl"],
    },
    limit,
    offset,
  });


    const body = {
        Songs: songs,
        page: page,
        size
    }

    res.json(body)
})

router.get('/current', requireAuth, async(req,res) => {
    const userId = req.user.id

    const userSongs = await Song.findAll({
        where: { userId: userId }
    })


    const allSongs = {
        Songs: userSongs
    }
    
    res.json(allSongs)
    
})

router.get('/:songId',  async(req,res) =>{
    const song = await Song.findByPk(req.params.songId, {
        raw:true
    })

    if(!song) {
        res.json(
          res.status = 404, {
          message: "Song couldn't be found",
          statusCode: 404,
        });
    }

    const artist = await User.findByPk(song.userId, {
        attributes: ['id', 'username', 'imageUrl'],
        raw:true
    })
    const album = await Album.findByPk(song.albumId, {
      attributes: ["id", "title", "imageUrl"],
      raw: true,
    });

    let body = {
        ...song,
        User: artist,
        Album: album
    }

    res.json(body)
})

router.post("/", 
  multipleMulterUpload('songFiles'), 
  [validateSongs, requireAuth], 
  async(req, res)=>{ 
    req.body.albumId === "null" ? (req.body.albumId = null) : null;
    const { title, description, albumId } = req.body
    const songFiles = await multiplePublicFileUpload(req.files)
    const test = await Album.findByPk(albumId)

    if(!test && albumId !== null) {
      
      res.status = 404,
      res.json(
        {      
        "message": "Album couldn't be found",
        "statusCode": 404
      })
    }

    const newSong = await Song.create({
        title,
        description,
        url: songFiles[0],
        imageUrl: songFiles[1],
        albumId,
        userId: req.user.id
    })

    
    res.json(res.status = 201, newSong)
});


router.put('/:songId',
multipleMulterUpload('songFiles'),
validateSongs, requireAuth, 
async(req,res,next) =>{
    const foundSong = await Song.findByPk(req.params.songId)
    if(!foundSong) {
        res.json(
          res.status = 404,
          {
          message: "Song couldn't be found",
          statusCode: 404,
        });
    }
    if(foundSong.userId === req.user.id) {
        req.body.albumId === "null" ? (req.body.albumId = null) : null;
        const { title, description, albumId } = req.body

        let url;
        let imageUrl;
        const songFiles = await multiplePublicFileUpload(req.files); 
        if(req.body.songFiles && req.body.songFiles.length !== 2) {
          const fileparse = req.body.songFiles.split('.')
          const lastEle = fileparse[fileparse.length - 1]
          if(lastEle === ('wav'|| "mp3" || "aac" || "flac")) {
            url = req.body.songFiles
            imageUrl = songFiles[0]
          } else {
            url = songFiles[0]
            imageUrl = req.body.songFiles
          }
        } else {
          url = songFiles[0]
          imageUrl = songFiles[1]
        }


        const updatedSong = await foundSong.update({
            title,
            description,
            url,
            imageUrl,
            albumId
        })


        res.json(updatedSong)
    } else {
        const err = new Error("Forbidden")
        err.status = 403
        next(err)
    }
})


router.delete('/:songId', requireAuth, async(req,res, next) =>{
    
    const foundSong = await Song.findByPk(req.params.songId);
    
    
    if (!foundSong) {
      res.json(
        res.status = 404, {
        message: "Song couldn't be found",
        statusCode: 404,
      });
    }

    if (foundSong.userId === req.user.id) {

      await foundSong.destroy();

      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      const err = new Error("Forbidden");
      err.status = 403;
      next(err);
    }
})

router.get("/:songId/comments", async(req, res) =>{

  const song = await Song.findByPk(req.params.songId)

  if(!song) {
    res.json(
      res.status = 404, 
      {
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
  
  const comments = await Comment.findAll({
    where: { songId: req.params.songId},
    include: {
      model: User,
      attributes: ['id', 'username']
    }
  })

  const body = {
    Comments: comments
  }

  res.json(body)
});

router.post('/:songId/comments', validateComments, requireAuth, async(req, res)=>{
  const song = await Song.findByPk(req.params.songId);

  if (!song) {
    res.json(
      res.status = 404, 
      {
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }

  const { body } = req.body
  const newComment = await Comment.create({
    songId: song.id,
    userId: req.user.id,
    body
  })

  res.json(newComment)
})


module.exports = router;