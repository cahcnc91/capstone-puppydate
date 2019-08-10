const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ChatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      chatId: {
        type: String
      },
      message_id: {
        type: String
      },
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
