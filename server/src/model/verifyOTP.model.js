const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OTPVerify = new Schema(
  {
    _id: Schema.Types.ObjectId,
    OTP: String,
    User: { type: Schema.Types.ObjectId, ref: "users" },
    createdAt: { type: Date, default: Date.now(), index: { expires: "1m" } },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const verifyOTPModel = mongoose.model("verifyOTP", OTPVerify);

module.exports = verifyOTPModel;
