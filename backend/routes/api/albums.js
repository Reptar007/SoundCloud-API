const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require("../../db/models");

const { check, sanitizeBody } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')

const validateAlbums = [
  check("title")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('"Album title is required"'),
  handleValidationErrors
];



router.get('/', async(req, res, next) =>{
    const albums = await Album.findAll();

    const body = {
        Albums: albums}

    res.json(body)
    
})

router.get('/current', requireAuth, async(req, res, next) => {
   
    const userAlbums = await Album.findAll({
        where: { userId: req.user.id }
    })

    const body = {
        Albums: userAlbums
    }

    res.json(body)
})

router.get('/:albumId', async(req, res, next)=>{

    const album = await Album.findByPk(req.params.albumId, {
      raw: true
    });

     if (!album) {
       res.statusCode = 404;
       res.json({
         message: "Album couldn't be found",
         statusCode: 404,
       });
     }

    const artist = await User.findByPk(album.userId, {
      attributes: ["id", "username", ["imageUrl", "previewImage"]],
      raw: true,
    });

    const songs = await Song.findAll({
      where: { albumId: album.id },
      raw: true,
    });

    let body = {
        ...album,
        User: artist,
        Songs: songs
    }

    res.json(body)
})

router.post('/', 
singleMulterUpload('image'),
requireAuth, validateAlbums, 
async(req, res, next)=>{
    const { title, description } = req.body
    const imageUrl = await singlePublicFileUpload(req.file)

    const newAlbum = await Album.create({
        userId: req.user.id,
        title,
        description,
        imageUrl
    })

    
    res.json(res.status = 201, newAlbum)
})

router.put('/:albumId', 
  singleMulterUpload('image'),
  requireAuth, validateAlbums, 
  async(req, res, next) =>{
    const foundAlbum = await Album.findByPk(req.params.albumId)

    if (!foundAlbum) {
      res.statusCode = 404;
      res.json({
        message: "Album couldn't be found",
        statusCode: 404,
      });
    }

    if (foundAlbum.userId === req.user.id) {

      const { title, description } = req.body
      let imageUrl;
      req.file ? imageUrl = await singlePublicFileUpload(req.file) : {imageUrl} = req.body
      const updateAlbum = await foundAlbum.update({
        title,
        description,
        imageUrl,
      });

      res.json(updateAlbum);
    } else {
      const err = new Error("Forbidden");
      err.status = 403;
      next(err);
    }
})

router.delete('/:albumId', requireAuth, async(req, res, next)=>{
    const foundAlbum = await Album.findByPk(req.params.albumId)

    if (!foundAlbum) {
      res.statusCode = 404;
      res.json({
        message: "Album couldn't be found",
        statusCode: 404,
      });
    }

    if (foundAlbum.userId === req.user.id) {
      await foundAlbum.destroy({
        force: true
      })

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


module.exports = router;