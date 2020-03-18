const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("Please enter valid email");
    },
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    trim: true
  }
});

module.exports = User;
