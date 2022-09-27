const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require("../../db/models");

const router = express.Router();

router.get('/:artistId/songs', async(req,res)=>{
    const person = await User.findByPk(req.params.artistId)
    
    if(!person) {
        res.json({
          message: "Artist couldn't be found",
          statusCode: 404,
        });
    }
    
    const userSongs = await Song.findAll({
        where: {userId: req.params.artistId}
    })
    const body = {
        Songs: userSongs
    }
    res.json(body)
})

router.get('/:artistId', async(req,res) =>{
    const person = await User.findByPk(req.params.artistId);

    if (!person) {
      res.json({
        message: "Artist couldn't be found",
        statusCode: 404,
      });
    }

    res.json(person)
})



module.exports = router;