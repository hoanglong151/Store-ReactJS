const jwt = require("jsonwebtoken");
const usersModel = require("../model/authentication.model");
const verifyOTPModel = require("../model/verifyOTP.model");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const login = (req, res) => {
  usersModel.findOne({ Email: req.body.email }, (err, user) => {
    if (user !== null) {
      const bytes = CryptoJS.AES.decrypt(user.Password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (originalPassword === req.body.password) {
        sendOTP(user);
        res.send({ user });
      } else {
        res.send({ Invalid: "Sai mật khẩu hoặc email" });
      }
    } else {
      res.send({ Invalid: "Sai mật khẩu hoặc email" });
    }
  });
};

const verifyOTP = async (req, res) => {
  const user = await verifyOTPModel.findOne({ User: req.body.id });
  if (user?.OTP === req.body.otp) {
    verifyOTPModel.findByIdAndRemove(user._id, (err, data) => {
      if (err) return err;
      const token = jwt.sign({ ...user }, process.env.SECRET_KEY);
      res.json({ token: token });
    });
  } else {
    res.json({ Incorrect: "Mã xác minh không đúng" });
  }
};

const sendOTP = (user) => {
  const id = new mongoose.Types.ObjectId().toString();
  const otp = `${Math.trunc(1000 + Math.random() * 9000)}`;
  const message = {
    from: "Xác Thực OTP",
    to: user.Email,
    subject: "Verify Your Email",
    html: `<p>Mã xác thực của bạn là: <strong>${otp}</strong></p>`,
  };

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.ACCOUNT_GMAIL,
      pass: process.env.ACCOUNT_PASSWORD,
    },
  });
  transporter
    .sendMail(message)
    .then((info) => {
      const userOTP = {
        _id: id,
        OTP: otp,
        User: user._id,
      };
      verifyOTPModel.create(userOTP, (err, data) => {
        console.log("Create");
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

module.exports = { login, verifyOTP };
