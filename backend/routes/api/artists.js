const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require("../../db/models");


const router = express.Router();

router.get('/:artistId/songs', async(req,res)=>{
    const person = await User.findByPk(req.params.artistId)
    
    if(!person) {
       return res.json(
        res.status = 404,
        {
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

router.get("/:artistId/playlists", async(req, res) => {
    const person = await User.findByPk(req.params.artistId);

    if (!person) {
      return res.json(
        res.status = 404,
        {
        message: "Artist couldn't be found",
        statusCode: 404,
      });
    }
    
    const userPlaylist = await Playlist.findAll({
        where: { userId: req.params.artistId }
    })

    const body = {
        Playlists: userPlaylist
    }

    res.json(body)
});

router.get("/:artistId/albums", async(req, res) =>{
  const person = await User.findByPk(req.params.artistId);

  if (!person) {
    return res.json((res.status = 404), {
      message: "Artist couldn't be found",
      statusCode: 404,
    });
  }

  const userAlbum = await Album.findAll({
    where: { userId: req.params.artistId },
  });

  const body = {
    Albums: userAlbum,
  };

  res.json(body);
});

router.get('/:artistId', async(req,res) =>{
    const person = await User.findByPk(req.params.artistId, {
      attributes: ['id', 'username', 'imageUrl'],
      raw:true
    });

    if (!person) {
      return res.json(
        res.status = 404,
        {
        message: "Artist couldn't be found",
        statusCode: 404,
      });
    }

    const userSongs = await Song.count({
      where: {userId: person.id}
    })

    const userAlbum = await Album.count({
      where: { userId: person.id}
    })


    const body = {
      ...person,
      totalSongs: userSongs,
      totalAlbums: userAlbum
    }

    res.json(body)
})



module.exports = router;