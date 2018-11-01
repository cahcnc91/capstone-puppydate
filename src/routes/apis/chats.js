const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Chat = require("../../db/models/Chat");
const Profile = require("../../db/models/Profile");

const validateChatInput = require("../../validation/chat");

//@route  GET api/chats/test
//@desc   Tests chats route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Chats works" }));

//@route  POST api/chats
//@desc   Create chat
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newChat = new Chat({
      user: req.user.id,
      userMatch: req.body.userMatch
    });

    newChat.save().then(chat => res.json(chat));
  }
);

//@route  GET api/chats
//@desc   Find chats
//@access Public
router.get("/", (req, res) => {
  Chat.find()
    .then(chats => res.json(chats))
    .catch(err => res.status(404).json({ nochatfound: "No chats found" }));
});

//@route  GET api/chats/:id
//@desc   Get chat by id
//@access Public
router.get("/:id", (req, res) => {
  Chat.findById(req.body.id)
    .then(chat => res.json(chat))
    .catch(err =>
      res.status(404).json({ nochatfound: "No chat found with that id" })
    );
  console.log("done");
});

//@route  DELETE api/chats/:id
//@desc  Delete chat by id
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Chat.findById(req.params.id)
        .then(chat => {
          //check for chat owners
          if (chat.user.toString() !== req.user.id) {
            return resizeBy
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          //Delete
          chat.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ chatnotfound: "No chat found" }));
    });
  }
);

//@route  POST api/chats/message/:id
//@desc  Add message to chat by id
//@access Private
router.post(
  "/message/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChatInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Chat.findById(req.body.chatId)
      .then(chat => {
        const newMessage = {
          chatId: req.body.chatId,
          text: req.body.text,
          name: req.body.name
        };

        //Add message to array
        chat.messages.unshift(newMessage);

        //Save
        chat.save().then(chat => res.json(chat));
      })
      .catch(err => res.status(404).json({ chatnotfound: "Chat not found" }));
  }
);

//@route  DELETE api/chats/message/:id/:message_id
//@desc  dELETE message to chat by id
//@access Private
router.delete(
  "/message/:id/:message_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.findById(req.params.id)
      .then(chat => {
        //Check to see if message exists
        if (
          chat.messages.filter(
            message => message._id.toString() === req.params.message_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ messagedoesnotexist: "Message does not exist" });
        }

        //Get remove index
        const removeIndex = chat.messages
          .map(item => item._id.toString())
          .indexOf(req.params.message_id);

        //Splice message out of array
        chat.messages.splice(removeIndex, 1);

        chat.save().then(chat => res.json(chat));
      })
      .catch(err => res.status(404).json({ chatnotfound: "Chat not found" }));
  }
);

module.exports = router;
