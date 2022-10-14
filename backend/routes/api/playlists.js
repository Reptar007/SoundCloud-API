const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User, PlaylistSong } = require("../../db/models");
const playlistsong = require("../../db/models/playlistsong");

const router = express.Router();

router.get('/current',  requireAuth, async(req, res)=>{
    const playlist = await Playlist.findAll({
        where: { userId: req.user.id }
    })

    const body = {
        Playlists: playlist
    }

    res.json(body)
})

router.get('/:playlistId', async(req, res)=>{
    const playlist = await Playlist.findByPk(req.params.playlistId, {
        include: { 
        model: Song, 
        through: {
            attributes: []
        }}
    })

    if(!playlist) {
        res.json({
          message: "Playlist couldn't be found",
          statusCode: 404,
        });
    }

    const songs = await Song.findAll({
        through: {
            where: { playlistId: playlist.id }
        }
    })

    const body = {
        ...playlist,
        Songs: songs
    }

    res.json(playlist)

})


router.put('/:playlistId', requireAuth, async(req, res, next) =>{
      const playlist = await Playlist.findByPk(req.params.playlistId);

      if (!playlist) {
        res.json({
          message: "Playlist couldn't be found",
          statusCode: 404,
        });
      }

      if (playlist.userId === req.user.id) {

        const {name, imageUrl} = req.body
        const updatedPlaylist = await playlist.update({
            name,
            imageUrl: imageUrl
        })

        res.json(updatedPlaylist);
      } else {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err);
      }


})

router.post('/:playlistId/songs', requireAuth, async(req, res, next)=> {
    const playlist = await Playlist.findByPk(req.params.playlistId)

    if(!playlist) {
        res.json({
          message: "Playlist couldn't be found",
          statusCode: 404,
        });
    }

    if (playlist.userId === req.user.id) {
      const { songId } = req.body;

      const song = await Song.findByPk(songId);

      if (!song) {
        res.json({
          message: "Song couldn't be found",
          statusCode: 404,
        });
      }

      const playlistSongs = await PlaylistSong.create({
        playlistId: playlist.id,
        songId: song.id
      })


      const addedsong = await PlaylistSong.findByPk(playlistSongs.id, {
        attributes: { exclude: ['order','createdAt', 'updatedAt']}
      })

      res.json(addedsong);
    } else {
      const err = new Error("Forbidden");
      err.status = 403;
      next(err);
    }
})

router.post('/', requireAuth, async(req, res) => {
    const { name, imageUrl } = req.body 
    
    const playlist = await Playlist.create({
        userId: req.user.id,
        name,
        imageUrl
    })

    res.json(playlist)
})



router.delete('/:playlistId', requireAuth, async(req, res, next)=>{
    const playlist = await Playlist.findByPk(req.params.playlistId)

    if (!playlist) {
      res.json({
        message: "Playlist couldn't be found",
        statusCode: 404,
      });
    }
  
    if (playlist.userId === req.user.id) {
      await playlist.destroy()

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