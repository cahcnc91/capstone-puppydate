const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  userMatched: {
    type: String
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
