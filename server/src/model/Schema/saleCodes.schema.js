const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleCodes = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Sale: Number,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

const saleCodesModel = mongoose.model("saleCodes", SaleCodes);

module.exports = saleCodesModel;
