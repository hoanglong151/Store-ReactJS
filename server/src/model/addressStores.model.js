const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressStores = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Areas: {
      type: Schema.Types.ObjectId,
      ref: "areas",
    },
    Provinces: {
      type: Schema.Types.ObjectId,
      ref: "provinces",
    },
    Districts: {
      type: Schema.Types.ObjectId,
      ref: "districts",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);
const addressStoresModel = mongoose.model("addressStores", AddressStores);

module.exports = addressStoresModel;
