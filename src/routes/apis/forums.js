const express = require("express");
const passport = require("passport");

const validateChatInput = require("../../validation/chat");

module.exports = routerInfo => {
  const { model, io, userIdToSocket } = routerInfo;

  const router = express.Router();

  //@route  POST api/forums/add
  //@desc  Add member to forum
  //@access Private
  router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      let newSubscriber = new Forum({
        users: [],
        messages: []
      });
      newSubscriber
        .save()
        .then(newSubscriber => res.json(newSubscriber))
        .catch(err => console.log(err));
    }
  );

  return router;
};
