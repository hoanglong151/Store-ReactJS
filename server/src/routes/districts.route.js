const express = require("express");
const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const areasModel = require("../model/Schema/areas.schema");
const districtsModel = require("../model/Schema/districts.schema");

const router = express.Router();

router.get("/", (req, res) => {
  districtsModel
    .find({}, (err, data) => {
      res.send(data);
    })
    .populate("Areas")
    .populate("Provinces");
});

router.post("/addDistrict", (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const district = {
    _id: id,
    Name: req.body.name,
    Areas: req.body.area_Id,
    Provinces: req.body.province_Id,
  };
  districtsModel.create(district, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    req.body.province_Id.map((value) => {
      provincesModel.findByIdAndUpdate(
        value,
        { $push: { Districts: id } },
        (err, data) => {
          if (err) return err;
        }
      );
    });
    res.send(data);
  });
});

router.patch("/editDistrict/:id", (req, res) => {
  const editDistrict = {
    Name: req.body.name,
    Areas: req.body.area_Id,
    Provinces: req.body.province_Id,
  };

  districtsModel.findByIdAndUpdate(req.params.id, editDistrict, (err, data) => {
    if (err) return err;
    res.send(data);
  });
});

router.delete("/deleteDistrict/:id", async (req, res) => {
  const getDistrict = await districtsModel.findById(req.params.id).exec();
  //   if (getProvince.Provinces.length === 0) {
  districtsModel.findByIdAndDelete(getDistrict._id, (err, data) => {
    res.send(data);
  });
  //   } else {
  //     res.send({ exist: "Existed" });
  //   }
});

module.exports = router;
