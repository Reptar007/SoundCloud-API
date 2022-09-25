const express = require("express");

const { Song, Album, Comment, Playlist, User } = require('../../db/models')

const router = express.Router();


router.get('/', async(req, res) => {
    const songs = await Song.findAll()

    res.json(songs)
})



module.exports = router;