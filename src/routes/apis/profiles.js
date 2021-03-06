const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validadeProfileInput = require("../../validation/profile");
const Profile = require("../../db/models/Profile");
const User = require("../../db/models/User");

//@route  GET api/profile/test
//@desc   Tests profiles route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["_id", "owner_name", "avatar", "puppyname"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route  GET api/profile/all
//@desc   Get all profiles
//@access Public
router.get("/all", (req, res) => {
  const errors = {};
  let userMap = {};

  Profile.find()
    .populate("user", ["_id", "owner_name", "avatar", "puppyname"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles";
        return res.status(404).json(errors);
      }

      profiles.forEach(user => {
        userMap[user.user._id] = user;
      });

      res.json(userMap);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

//@route  GET api/profile/handle/:handle
//@desc   Get profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["_id", "owner_name", "avatar", "puppyname"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route  GET api/profile/user/:user_id
//@desc   Get profile by user id
//@access Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["_id", "owner_name", "avatar", "puppyname"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//@route  POST api/profile
//@desc   Create or update user profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validadeProfileInput(req.body);

    //Check validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.size) profileFields.size = req.body.size;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.breed) profileFields.breed = req.body.breed;
    if (req.body.sex) profileFields.sex = req.body.sex;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.description) profileFields.description = req.body.description;
    // if (typeof req.body.qualities !== "undefined") {
    //profileFields.qualitties = req.body.qualities.split(",");
    //}
    if (req.body.qualities1) profileFields.qualities1 = req.body.qualities1;
    if (req.body.qualities2) profileFields.qualities2 = req.body.qualities2;
    if (req.body.qualities3) profileFields.qualities3 = req.body.qualities3;
    if (req.body.instagram) profileFields.instagram = req.body.instagram;
    if (req.body.youtube) profileFields.youtube = req.body.youtube;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create

        //Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
