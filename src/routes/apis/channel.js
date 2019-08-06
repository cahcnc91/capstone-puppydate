const express = require("express");
const passport = require("passport");

const validateChatInput = require("../../validation/chat");

module.exports = routerInfo => {
  const { model, io, userIdToSocket } = routerInfo;

  const router = express.Router();

  //@route  POST api/channels/add
  //@desc  Add member to forum
  //@access Private
  router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      let newChannel = new Channel({
        channelName: req.body.channelName,
        users: [],
        messages: []
      });
      newChannel.save((err, channel) => {
        if (err) {
          console.log(err);
        }
        res.json(channel);
      });
    }
  );

  return router;
};
