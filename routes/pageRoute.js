const express = require("express");
const pageController = require("../controllers/pageController");

const router = require("express").Router();

router.route("/").get(pageController.getIndex);
router.route("/register").get(pageController.getRegister);
router.route("/login").get(pageController.getLogin);
router.route("/logout").get(pageController.getLogout);

module.exports = router;
