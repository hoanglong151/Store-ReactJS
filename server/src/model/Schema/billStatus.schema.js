const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillStatus = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
  },
  {
    versionKey: false,
    _id: false,
  }
);

const billStatusModel = mongoose.model("billStatus", BillStatus);

module.exports = billStatusModel;
