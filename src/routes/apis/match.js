const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Chat = require("../../db/models/Chat");
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
      nameUser: req.user.name,
      match: req.body.match,
      userMatch: req.body.userMatch,
      nameUserMatch: req.body.nameUserMatch
    });

    newMatch.save();

    Match.findOne({
      user: req.body.userMatch,
      match: true,
      userMatch: req.user.id
    }).then(matchedPar => {
      if (!matchedPar) {
        console.log("no match");
      } else {
        console.log("match!");

        const newChat = new Chat({
          user: req.user.id,
          userMatch: req.body.userMatch,
          nameUser: req.user.name,
          nameUserMatch: req.body.nameUserMatch
        });

        newChat.save().then(chat => res.json(chat));
      }
    });
  }
);

module.exports = router;
