const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bills = new Schema(
  {
    _id: Schema.Types.ObjectId,
    Name: String,
    Phone: String,
    Email: String,
    Bill: [
      {
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
        CreateDate: Date,
        UpdateDate: Date,
      },
    ],
  },
  {
    versionKey: false,
    _id: false,
  }
);

const billsModel = mongoose.model("bills", Bills);

module.exports = billsModel;
