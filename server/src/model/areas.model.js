const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Areas = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

const areasModel = mongoose.model("areas", Areas);

module.exports = areasModel;
