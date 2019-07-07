const express = require("express");
const router = express.Router();
const User = require("../../db/models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretOrKeys = require("../../../config/keys").secretOrKeys;
const passport = require("passport");

//Load Imput Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route  GET api/users/test
//@desc   Tests users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//@route  POST api/users/register
//@desc   Register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //rating
        d: "mm" // Default
      });

      const newUser = new User({
        owner_name: req.body.name,
        puppyname: req.body.puppyname,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route  GET api/users/login
//@desc   Login user / Returnig JWT Token
//@access Public
router.post("/login", (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Match
        const payload = { 
          id: user.id, 
          owner_name: user.owner_name, 
          puppyname: user.puppyname, 
          avatar: user.avatar 
        }; // CREATE JWT Payload

        //Sign Token
        jwt.sign(payload, secretOrKeys, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route  GET api/users/current
//@desc   Return current user
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      _id: req.user._id,
      owner: req.user.name,
      puppyname: req.user.puppyname,
      email: req.user.email
    });
  }
);

module.exports = router;
