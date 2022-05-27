const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const firmsModel = require("../model/Schema/firms.schema");

router.get("/", (req, res) => {
  firmsModel.find({}, (err, firms) => {
    res.send(firms);
  });
});

router.post("/addFirm", (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const firm = {
    _id: id,
    Name: req.body.name,
  };
  firmsModel.create(firm, (err, data) => {
    if (err) {
      return res.status(404);
    }
    res.send(data);
  });
});

router.patch("/editFirm/:id", (req, res) => {
  const editFirm = {
    Name: req.body.name,
  };

  firmsModel.findByIdAndUpdate(req.params.id, editFirm, async (err, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.status(404);
    }
  });
});

router.delete("/deleteFirm/:id", async (req, res) => {
  const getFirm = await firmsModel.findById(req.params.id).exec();
  if (getFirm.Products.length === 0) {
    firmsModel.findByIdAndDelete(getFirm._id, (err, data) => {
      res.send(data);
    });
  } else {
    res.send({ exist: "Existed" });
  }
});

module.exports = router;
