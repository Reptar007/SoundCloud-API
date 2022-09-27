const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require('../../db/models')

const router = express.Router();


router.get('/', async(req, res) => {
  
  let { page, size } = req.query
  
  page = parseInt(page)
  size = parseInt(size)
  
  if( page < 1 || size < 1) {
    res.json({
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

router.post("/", requireAuth, async(req, res)=>{

    const { title, description, url, imageUrl, albumId } = req.body

    const test = await Album.findByPk(albumId)

    if(!test && albumId !== null) {
      console.log('hello')
      res.json({      
        "message": "Album couldn't be found",
        "statusCode": 404
      })
    }

    const newSong = await Song.create({
        title,
        description,
        url,
        imageUrl,
        albumId,
        userId: req.user.id
    })


    res.json(newSong)
});

router.put('/:songId', requireAuth, async(req,res,next) =>{
    const foundSong = await Song.findByPk(req.params.songId)
    if(!foundSong) {
        res.json({
          message: "Song couldn't be found",
          statusCode: 404,
        });
    }
    if(foundSong.userId === req.user.id) {
        const { title, description, url, imageUrl, albumId } = req.body

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

router.get('/:songId',  async(req,res) =>{
    const song = await Song.findByPk(req.params.songId, {
        raw:true
    })

    if(!song) {
        res.statusCode = 404
        res.json({
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

router.delete('/:songId', requireAuth, async(req,res, next) =>{
    
    const foundSong = await Song.findByPk(req.params.songId);
    if (foundSong.userId === req.user.id) {

      if (!foundSong) {
        res.json({
          message: "Song couldn't be found",
          statusCode: 404,
        });
      }

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
    res.json({
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
  
  const comments = await Comment.findAll({
    where: { userId: req.params.songId},
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

router.post('/:songId/comments', requireAuth, async(req, res)=>{
  const song = await Song.findByPk(req.params.songId);

  if (!song) {
    res.json({
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