const express = require("express");
const dotenv = require("dotenv");
const conn = require("./db.js");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const router = require("./routes/pageRoute.js");
const pageRoute = require("./routes/pageRoute.js");
const userRoute = require("./routes/userRoute.js");
const bodyParser = require("body-parser");
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

// static middleware files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route to index page
app.use("/", pageRoute);
app.use("/register", pageRoute);
app.use("/login", pageRoute);
app.use("/logout", pageRoute);
app.use("/users", userRoute);

// Template engine
app.set("view engine", "ejs");
