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

//@route  GET api/match/handle/match/:handle
//@desc   Checks if match exists route
//@access Private
router.get(
  "/handle/match/:handle",
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

        Match.findOne({$or: [
          {matchOneId: profile._id},
          {matchTwoId: profile._id}
        ]}).then(thereIsMatch => {
          if (!thereIsMatch) {
            res.json([]);
          } else {
            res.json(thereIsMatch);
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
    console.log(req.body)
    const errors = {};

    Match.findOne({
      matchOneId: req.user.id,
      matchTwoId: req.body.userMatch
    }).then(existentMatchOne => {
      
      //CHECK TO SEE IF MATCH WAS ALREADY CREATED OR NOT
      if (existentMatchOne) {

        //CHECKS TO SEE IF REVERSE MATCH EXISTS
        Match.findOne({
          matchOneId: req.body.userMatch,
          matchTwoId: req.user.id
        }).then(existentMatchTwo => {
          if(existentMatchTwo){
          
          errors.existentmatch = "Match already exists";
          return res.status(404).json(errors);

          } else {
            //IF REVERSE MATCH DOES NOT EXIST
            const newMatch = new Match({
              match: req.body.match,
              matchOneId: req.user.id,
              matchTwoId: req.body.userMatch,
            });

            newMatch.save().then(() => {
              const newChat = new Chat({
                user: req.user.id,
                userMatch: req.body.userMatch,
              });

              newChat.save();
            })
          }
        })
        
      //IF MATCH ONE DOES NOT EXISTS
      } else {
        const newMatch = new Match({
          match: req.body.match,
          matchOneId: req.user.id,
          matchTwoId: req.body.userMatch,
        });
        newMatch.save();
      }
    }).catch(err => console.log(err));
  }
);

module.exports = router;

        // if (newMatch.match === "true") {
        //   Match.findOne({
        //     user: req.body.userMatch,
        //     match: true,
        //     userMatch: req.user.id
        //   }).then(matchedPar => {
        //     if (!matchedPar) {
        //       res.json({ noMatch: "Not a match yet" });
        //     } else {
        //       const newChat = new Chat({
        //         user: req.user.id,
        //         userMatch: req.body.userMatch,
        //         nameUser: req.user.name,
        //         nameUserMatch: req.body.nameUserMatch
        //       });

        //       newChat.save().catch(err => console.log(err));
        //     }
        //   });
        // }
