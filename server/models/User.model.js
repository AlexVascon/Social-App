const { Schema, model } = require("mongoose");


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    min: 3
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  profilePicture: {
    type: String,
    default: ''
  },
  coverPicture: {
    type: String,
    default: ''
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  city: {
    type: String,
    default: ''
  },
  from: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
},
{timestamps: true}
);

const User = model("User", userSchema);

module.exports = User;


