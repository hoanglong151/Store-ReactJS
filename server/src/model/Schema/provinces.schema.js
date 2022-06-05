const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Provinces = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Areas: [
      {
        type: Schema.Types.ObjectId,
        ref: "areas",
      },
    ],
    Districts: [
      {
        type: Schema.Types.ObjectId,
        ref: "districts",
      },
    ],
  },
  {
    versionKey: false,
    _id: false,
  }
);

const provincesModel = mongoose.model("provinces", Provinces);

module.exports = provincesModel;
