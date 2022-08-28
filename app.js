const express = require("express");
const dotenv = require("dotenv");
const conn = require("./db.js");
const ejs = require("ejs");
const router = require("./routes/pageRoute.js");
const pageRoute = require("./routes/pageRoute.js");

dotenv.config();

// Connect to MongoDB
conn();

// Create express app
const app = express();

// create port
const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });

// Route to index page
app.use("/", pageRoute);
app.use("/register", pageRoute);
app.use("/login", pageRoute);
app.use("/logout", pageRoute);

// Template engine
app.set("view engine", "ejs");
