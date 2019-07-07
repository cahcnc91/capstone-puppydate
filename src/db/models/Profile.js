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
  size: {
    type: String
  },
  age: {
    type: String
  },
  breed: {
    type: String
  },
  sex: {
    type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  qualities1: {
    type: String
  },
  qualities2: {
    type: String
  },
  qualities3: {
    type: String
  },
  puppyname: {
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
