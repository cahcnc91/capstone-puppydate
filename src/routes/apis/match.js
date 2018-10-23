const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Match = require("../../db/models/Match");
const Profile = require("../../db/models/Profile");

//@route  GET api/match/test
//@desc   Tests chats route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Match works" }));

//@route  POST api/match
//@desc   Create match
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMatch = new Match({
      user: req.user.id,
      match: req.body.match,
      userMatched: req.body.userMatched
    });

    newMatch.save().then(match => res.json(match));
  }
);

module.exports = router;
