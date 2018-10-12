const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 30
  },
  breed: {
    type: String
  },
  location: {
    type: String
  },
  age: {
    type: Number
  },
  sex: {
    type: String
  },
  description: {
    type: String
  },
  qualities: {
    type: [String]
  },
  owner: {
    type: String
  },
  instagram: {
    type: String
  },
  youtube: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
