const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Email: String,
    Password: String,
  },
  {
    versionKey: false,
    _id: false,
  }
);

const usersModel = mongoose.model("users", Users);

module.exports = usersModel;
