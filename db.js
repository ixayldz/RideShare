const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: "carpool",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = conn;
