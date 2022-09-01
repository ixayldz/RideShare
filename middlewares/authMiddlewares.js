const User = require("../models/UserModels");
const jwt = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decoded.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

async function authenicateToken(req, res, next) {
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
}

module.exports = {
  authenicateToken,
  checkUser,
};
