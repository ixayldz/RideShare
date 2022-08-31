const User = require("../models/UserModels");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createUser,
};
