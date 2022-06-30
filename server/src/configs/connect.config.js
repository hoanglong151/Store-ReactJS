const mongoose = require("mongoose");

async function connectDB() {
  try {
    var connect = await mongoose.connect(process.env.CONNECT_MONGODB);
  } catch (Error) {
    console.log(Error);
  }
  return connect;
}

module.exports = connectDB;
