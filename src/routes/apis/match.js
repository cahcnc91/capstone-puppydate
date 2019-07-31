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
          {matchOneId: profile.user._id},
          {matchTwoId: profile.user._id}
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
    const errors = {};

    Match.findOne({
      $or: [
        { $and: [ { matchOneId : req.user.id }, { matchTwoId : req.body.userMatch } ]},
        { $and: [ { matchOneId : req.body.userMatch }, { matchTwoId : req.user.id} ]}
      ]
    }).then(existsMatchOne => {
      
      //CHECK TO SEE IF MATCH WAS ALREADY CREATED OR NOT
      if (existsMatchOne) {

        //IF REVERSE MATCH DOES NOT EXIST
        Match.findOneAndUpdate(
          { matchOneId : req.body.userMatch , matchTwoId : req.user.id},
          {matchTwo: req.body.match}).then(updated => console.log(updated))

        Match.find({
          $and : [ { matchOneId : req.body.userMatch }, { matchTwoId : req.user.id } ]
        }).then(found => console.log(found))


        if(existsMatchOne.matchOne === 2 && req.body.match === 2){
          const newChat = new Chat({
            userMatch1: req.user.id, 
            userMatch2: req.body.userMatch
          });
  
          newChat.save().catch(err => console.log(err));
        }

        let newMatch = existsMatchOne;
        newMatch.matchTwo = req.body.match;
        res.json(newMatch)
        
      //IF MATCH ONE DOES NOT EXISTS
      } else {

        let newMatch = new Match({
          matchOne: req.body.match,
          matchOneId: req.user.id,
          matchTwoId: req.body.userMatch,
        });
        newMatch.save();
        res.json(newMatch)
      }


    }).catch(err => console.log(err));
  }
);

module.exports = router;
