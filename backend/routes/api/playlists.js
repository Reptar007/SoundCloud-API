const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require("../../db/models");

const router = express.Router();

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