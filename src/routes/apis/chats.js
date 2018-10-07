const express = require("express");
const router = express.Router();

//@route  GET api/chats/test
//@desc   Tests chats route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Chats works" }));

module.exports = router;
