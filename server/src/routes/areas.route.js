const express = require("express");
const mongoose = require("mongoose");
const areasModel = require("../model/Schema/areas.schema");

const router = express.Router();

router.get("/", (req, res) => {
  areasModel.find({}, (err, data) => {
    console.log(data);
    res.send(data);
  });
  // .populate("Provinces");
});

router.post("/addArea", (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const area = {
    _id: id,
    Name: req.body.name,
  };
  areasModel.create(area, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    res.send(data);
  });
});

router.patch("/editArea/:id", (req, res) => {
  const editArea = {
    Name: req.body.name,
  };

  areasModel.findByIdAndUpdate(req.params.id, editArea, (err, data) => {
    if (err) return err;
    res.send(data);
  });
});

router.delete("/deleteArea/:id", async (req, res) => {
  const getArea = await areasModel.findById(req.params.id).exec();
  if (getArea.Provinces.length === 0) {
    areasModel.findByIdAndDelete(getArea._id, (err, data) => {
      res.send(data);
    });
  } else {
    res.send({ exist: "Existed" });
  }
});

module.exports = router;
