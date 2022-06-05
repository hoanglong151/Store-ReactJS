const express = require("express");
const mongoose = require("mongoose");
const saleCodesModel = require("../model/Schema/saleCodes.schema");

const router = express.Router();

router.get("/", (req, res) => {
  saleCodesModel.find({}, (err, data) => {
    res.send(data);
  });
  // .populate("Provinces");
});

router.post("/addSaleCode", (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const area = {
    _id: id,
    Name: req.body.name,
  };
  saleCodesModel.create(area, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    res.send(data);
  });
});

router.patch("/editSaleCode/:id", (req, res) => {
  const editSaleCode = {
    Name: req.body.name,
  };

  saleCodesModel.findByIdAndUpdate(req.params.id, editSaleCode, (err, data) => {
    if (err) return err;
    res.send(data);
  });
});

router.delete("/deleteSaleCode/:id", async (req, res) => {
  // const getArea = await saleCodesModel.findById(req.params.id).exec();
  // if (getArea.Provinces.length === 0) {
  saleCodesModel.findByIdAndDelete(req.params.id, (err, data) => {
    res.send(data);
  });
  // } else {
  //   res.send({ exist: "Existed" });
  // }
});

module.exports = router;
