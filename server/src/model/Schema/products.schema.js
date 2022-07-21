const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Description: String,
    Category_ID: [
      { type: Schema.Types.ObjectId, ref: "categories", required: true },
    ],
    Firm_ID: { type: Schema.Types.ObjectId, ref: "firms", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

const productsModel = mongoose.model("products", Products);

module.exports = productsModel;
