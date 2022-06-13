const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const usersModel = require("../model/Schema/authentication.schema");
const CryptoJS = require("crypto-js");

const router = express.Router();

router.post("/login", (req, res) => {
  usersModel.findOne({ Email: req.body.email }, (err, user) => {
    if (user !== null) {
      const bytes = CryptoJS.AES.decrypt(user.Password, "hoanglong");
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (originalPassword === req.body.password) {
        const token = jwt.sign({ ...user }, "hoanglong");
        res.send({ user, token });
      } else {
        res.send({ Invalid: "Sai mật khẩu hoặc email" });
      }
    } else {
      res.send({ Invalid: "Sai mật khẩu hoặc email" });
    }
  });
});

module.exports = router;
