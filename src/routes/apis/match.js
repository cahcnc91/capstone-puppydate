const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Chat = require("../../db/models/Chat");
const Match = require("../../db/models/Match");
const Profile = require("../../db/models/Profile");

//@route  GET api/match/test
//@desc   Tests match route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Match works" }));

//@route  GET api/match/
//@desc   Checks if match route
//@access Private
router.get(
  "/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({
      handle: req.params.handle
    }).then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      } else {
        Match.findOne({
          user: req.user.id,
          match: true,
          userMatch: profile.user._id
        }).then(matchDone => {
          if (!matchDone) {
            res.json(null);
          } else {
            res.json(matchDone);
          }
        });
      }
    });
  }
);

//@route  POST api/match
//@desc   Create match
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Match.findOne({
      user: req.user.id,
      match: true,
      userMatch: req.body.userMatch
    }).then(existentMatchOrNot => {
      if (existentMatchOrNot) {

        errors.existentmatch = "There is a match with this user already!";
        return res.status(404).json(errors);
      } else {

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
            res.json({ noMatch: 'Not a match yet'})
          } else {

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
    });
  }
);

module.exports = router;
