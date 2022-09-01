const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      validate: [validator.isAlphanumeric, "Username must be alphanumeric"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Email is invalid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
