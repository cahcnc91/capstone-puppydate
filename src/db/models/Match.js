const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const MatchSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  match: {
    type: String,
    default: "empty"
  },
  userMatched: {
    type: String,
    default: "user in profile"
  }
});

module.exports = Match = mongoose.model("match", MatchSchema);
