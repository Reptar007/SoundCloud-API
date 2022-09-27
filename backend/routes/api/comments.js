const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require("../../db/models");

const router = express.Router();

router.put('/:commentId', requireAuth, async(req, res, next) =>{
    const comment = await Comment.findByPk(req.params.commentId)

    if(!comment) {
        res.json({                    
            "message": "Comment couldn't be found",
            "statusCode": 404
        })
    }

    if(comment.userId === req.user.id) {
        const { body } = req.body
        const updatedcomment = await comment.update({
            body
        })
        res.json(updatedcomment)
    } else {
      const err = new Error("Forbidden");
      err.status = 403;
      next(err);
    }
})

router.delete('/:commentId', requireAuth, async(req,res,next) =>{
     const comment = await Comment.findByPk(req.params.commentId);

     if (!comment) {
       res.json({
         message: "Comment couldn't be found",
         statusCode: 404,
       });
     }

     if (comment.userId === req.user.id) {
       await comment.destroy()
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