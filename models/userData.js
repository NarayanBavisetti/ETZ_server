const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});


const User = mongoose.model("user", userSchema);

module.exports = User;
