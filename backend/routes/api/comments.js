const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Song, Album, Comment, Playlist, User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");


const router = express.Router();

const validateComments = [
  check("body")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('"Comment body text is required"'),
];

router.put('/:commentId', validateComments, requireAuth, async(req, res, next) =>{
    const comment = await Comment.findByPk(req.params.commentId)

    if(!comment) {
        return res.json(
          res.status = 404,
          {                    
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
       return res.json(
        res.status = 404,
        {
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