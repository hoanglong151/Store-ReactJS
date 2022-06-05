const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Districts = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Areas: [
      {
        type: Schema.Types.ObjectId,
        ref: "areas",
      },
    ],
    Provinces: [
      {
        type: Schema.Types.ObjectId,
        ref: "provinces",
      },
    ],
    AddressStore: [
      {
        type: Schema.Types.ObjectId,
        ref: "addressStores",
      },
    ],
  },
  {
    versionKey: false,
    _id: false,
  }
);

const districtsModel = mongoose.model("districts", Districts);

module.exports = districtsModel;
