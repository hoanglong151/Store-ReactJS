const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailBills = new Schema(
  {
    _id: Schema.Types.ObjectId,
    ShipPayment: String,
    Areas: {
      type: Schema.Types.ObjectId,
      ref: "areas",
    },
    Provinces: { type: Schema.Types.ObjectId, ref: "provinces" },
    Districts: { type: Schema.Types.ObjectId, ref: "districts" },
    AddressStores: {
      type: Schema.Types.ObjectId,
      ref: "addressStores",
    },
    Address: String,
    Other: String,
    Cart: Object,
    BillStatus: Object,
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

const detailBillsModel = mongoose.model("detailBills", DetailBills);

module.exports = detailBillsModel;
