const express = require("express");
const mongoose = require("mongoose");
const billStatusModel = require("../model/Schema/billStatus.schema");

const router = express.Router();

router.get("/", (req, res) => {
  billStatusModel.find({}, (err, data) => {
    res.send(data);
  });
});

router.post("/addBillStatus", (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const billStatus = {
    _id: id,
    Name: req.body.name,
  };
  billStatusModel.create(billStatus, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    res.send(data);
  });
});

router.patch("/editBillStatus/:id", (req, res) => {
  const editBillStatus = {
    Name: req.body.name,
  };

  billStatusModel.findByIdAndUpdate(
    req.params.id,
    editBillStatus,
    (err, data) => {
      if (err) return err;
      res.send(data);
    }
  );
});

router.delete("/deleteBillStatus/:id", async (req, res) => {
  console.log(req.params.id);
  // const getBillStatus = await billStatusModel.findById(req.params.id).exec();
  // if (getBillStatus.Provinces.length === 0) {
  billStatusModel.findByIdAndDelete(req.params.id, (err, data) => {
    res.send(data);
  });
  // } else {
  //   res.send({ exist: "Existed" });
  // }
});

module.exports = router;
