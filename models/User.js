const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Enter a username"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Enter a password"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Enter a Phone"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Enter a email"],
  },
});

module.exports = mongoose.model("User", UserSchema);
