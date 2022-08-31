const User = require("../models/UserModels");
const jwt = require("jsonwebtoken");

const authenicateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.log(err);
          res.redirect("/users/login");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/users/login");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  authenicateToken,
};
