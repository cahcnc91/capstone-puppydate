const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const MatchSchema = new Schema({
  match: {
    type: Boolean,
    required: true
  },
  matchOneId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  matchTwoId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Match = mongoose.model("match", MatchSchema);

