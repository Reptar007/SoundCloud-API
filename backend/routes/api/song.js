const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require('../../db/models')

const router = express.Router();


router.get('/', async(req, res) => {
    const songs = await Song.findAll()

    res.json(songs)
})

router.get('/current', requireAuth, async(req,res) => {
    const userId = req.user.id

    const userSongs = await Song.findAll({
        where: { userId: userId },
        attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt',['imageUrl', 'previewImage']]
    })


    const allSongs = {
        Songs: userSongs
    }
    
    res.json(allSongs)
    
})

router.post("/", requireAuth, async(req, res)=>{

    const { title, description, url, imageUrl, albumId } = req.body

    const newSong = await Song.create({
        title,
        description,
        url,
        imageUrl,
        albumId,
        userId: req.user.id
    })

    const songBody = await Song.findByPk(newSong.id, {
      attributes: [
        "id",
        "userId",
        "albumId",
        "title",
        "description",
        "url",
        "createdAt",
        "updatedAt",
        ["imageUrl", "previewImage"],
      ],
    });

    res.json(songBody)
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

        let body = {
            id: updatedSong.id,
            userId: updatedSong.userId,
            albumId: updatedSong.albumId,
            title: updatedSong.title,
            description: updatedSong.description,
            url: updatedSong.url,
            createdAt: updatedSong.createdAt,
            updatedAt: updatedSong.updatedAt,
            previewImage: updatedSong.imageUrl
        }

        res.json(body)
    } else {
        const err = new Error("Forbidden")
        err.status = 403
        next(err)
    }
})

router.get('/:songId',  async(req,res) =>{
    const song = await Song.findByPk(req.params.songId, {
        attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt',['imageUrl', 'previewImage']],
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
        attributes: ['id', 'username', ['imageUrl', 'previewImage']],
        raw:true
    })
    const album = await Album.findByPk(song.albumId, {
      attributes: ["id", "title", ["imageUrl", "previewImage"]],
      raw: true,
    });

    let body = {
        ...song,
        Artist: artist,
        Album: album
    }

    res.json(body)
})

router.delete('/:songId', requireAuth, async(req,res, next) =>{
    
    
    if (foundSong.userId === req.user.id) {
      const goneSong = await Song.findByPk(req.params.songId);

      if (!goneSong) {
        res.json({
          message: "Song couldn't be found",
          statusCode: 404,
        });
      }

      await goneSong.destroy();

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