const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User, PlaylistSong } = require("../../db/models");
const playlistsong = require("../../db/models/playlistsong");

const router = express.Router();

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


module.exports = router;