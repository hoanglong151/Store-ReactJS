const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeProducts = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Color: String,
    Price: Number,
    Sale: Number,
    Amount: Number,
    Sold: Number,
    Images: [String],
    Product: { type: Schema.Types.ObjectId, ref: "products", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

const typeProductsModel = mongoose.model("typeProducts", TypeProducts);

module.exports = typeProductsModel;
