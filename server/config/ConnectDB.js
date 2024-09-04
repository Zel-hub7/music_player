const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const connectToDb = asyncHandler(async () => {
  const connection = await mongoose.connect(process.env.DB_URI);
  console.log("DB connected");
  return connection;
});

module.exports = connectToDb;
