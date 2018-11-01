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
    required: true
  },
  nameUser: {
    type: String,
    required: true
  },
  userMatch: {
    type: String,
    required: true
  },
  nameUserMatch: {
    type: String,
    required: true
  }
});

module.exports = Match = mongoose.model("match", MatchSchema);
