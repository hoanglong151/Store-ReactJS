const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Image: [String],
    Name: String,
    Description: String,
    Category_ID: [
      { type: Schema.Types.ObjectId, ref: "categories", required: true },
    ],
    Firm_ID: { type: Schema.Types.ObjectId, ref: "firms", required: true },
    Amount: { type: Number, default: 0 },
    Sale: Number,
    Price: Number,
    Sold: { type: Number, default: 0 },
    UpdateDate: Date,
    CreateDate: Date,
  },
  {
    versionKey: false,
    _id: false,
  }
);

const productsModel = mongoose.model("products", Products);

module.exports = productsModel;