const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const MatchSchema = new Schema({
  matchOne: {
    type: Number,
    required: true
  },
  matchOneId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  matchTwo: {
    type: Number,
    default: 1
  },
  matchTwoId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Match = mongoose.model("match", MatchSchema);
//1: not set yet
//2: true
//3 false
