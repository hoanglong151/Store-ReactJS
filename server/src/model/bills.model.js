const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bills = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Phone: String,
    Email: String,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

const billsModel = mongoose.model("bills", Bills);

module.exports = billsModel;
