const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.mongodbUrl);
    console.log("connected");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;
