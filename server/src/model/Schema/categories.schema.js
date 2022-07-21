const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categories = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Image: String,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

const categoriesModel = mongoose.model("categories", Categories);

module.exports = categoriesModel;
