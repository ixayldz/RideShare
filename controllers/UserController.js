const User = require("../models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid username or password" });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("jwt", token, { httpOnly: true });
        return res.redirect("/users/dashboard");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const getDashboard = (req, res) => {
  res.render("dashboard", {
    title: "dashboard",
  });
};

module.exports = {
  createUser,
  loginUser,
  getDashboard,
};
