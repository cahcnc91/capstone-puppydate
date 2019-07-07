const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  userMatch: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  messages: [
    {
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
