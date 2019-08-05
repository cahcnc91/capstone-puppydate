const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ForumSchema = new Schema({
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

module.exports = Forum = mongoose.model("forum", ForumSchema);
