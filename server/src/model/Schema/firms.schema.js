const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Firms = new Schema(
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

const firmsModel = mongoose.model("firms", Firms);

module.exports = firmsModel;
