const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ChannelSchema = new Schema({
  channelName: {
    type: String
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
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

module.exports = Channel = mongoose.model("channel", ChannelSchema);
