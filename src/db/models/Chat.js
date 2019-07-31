const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ChatSchema = new Schema({
  userMatch1: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  userMatch2: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  messages: [
    {
      chatId: {
        type: String
      },
      name: {
        type: String
      },
      text: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Chat = mongoose.model("chat", ChatSchema);
