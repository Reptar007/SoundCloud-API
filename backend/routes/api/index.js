const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const songRouter = require("./song")
const albumRouter = require('./albums')
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);


router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use('/songs', songRouter)
router.use('/albums', albumRouter)

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;
