const express = require("express");
const passport = require("passport");
const Profile = require("../../db/models/Profile");
const User = require("../../db/models/User");
const mongoose = require("mongoose");

const validateChatInput = require("../../validation/chat");

module.exports = routerInfo => {
  const { model, io, userIdToSocket } = routerInfo;

  const router = express.Router();
  //@route  GET api/chats/test
  //@desc   Tests chats route
  //@access Public
  router.get("/test", (req, res) => res.json({ msg: "Chats works" }));

  //@route  GET api/chats/userallchats
  //@desc   Find chats
  //@access Private
  router.get(
    "/userallchats",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      model
        .find({ users: { $in: [mongoose.Types.ObjectId(req.user.id)] } })
        .then(chats => {
          if (chats.length === 0) {
            res.json(null);
          } else {
            res.json(chats);
          }
        })
        .catch(err => console.log(err));
    }
  );

  //@route  GET api/chats/:id
  //@desc   Get chat by id
  //@access Public
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    model
      .findById(id)
      .then(chat => {
        res.json(chat);
      })
      .catch(err =>
        res.status(404).json({ nochatfound: "No chat found with that id" })
      );
  });

  //@route  DELETE api/chats/:id
  //@desc  Delete chat by id
  //@access Private
  router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
        model
          .findById(req.params.id)
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
          .catch(err =>
            res.status(404).json({ chatnotfound: "No chat found" })
          );
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
      model
        .findById(req.body.chatId)
        .then(chat => {
          const newMessage = {
            chatId: req.body.chatId,
            message_id: new mongoose.Types.ObjectId(),
            user_id: req.user.id,
            text: req.body.text,
            name: req.body.name
          };

          //Add message to array
          chat.messages.push(newMessage);

          //Save
          chat.save().then(chat => res.json(newMessage));

          //Send message via socket

          io.emit("message", {
            chatId: req.body.chatId,
            _id: req.user.id,
            text: req.body.text,
            name: req.body.name,
            date: Date.now()
          });
        })
        .catch(err => res.status(404).json(console.log(err)));
    }
  );

  //@route  DELETE api/chats/message/:id/:message_id
  //@desc  dELETE message to chat by id
  //@access Private
  router.delete(
    "/message/:id/:message_id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      model
        .findById(req.params.id)
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

  return router;
};
