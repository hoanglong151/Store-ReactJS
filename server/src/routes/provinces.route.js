const express = require("express");
const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const areasModel = require("../model/Schema/areas.schema");

const router = express.Router();

router.get("/", (req, res) => {
  provincesModel
    .find({}, (err, data) => {
      res.send(data);
    })
    .populate("Areas");
});

router.post("/addProvince", (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const province = {
    _id: id,
    Name: req.body.name,
    Areas: req.body.area_Id,
  };
  provincesModel.create(province, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    req.body.area_Id.map((value) => {
      areasModel.findByIdAndUpdate(
        value,
        { $push: { Provinces: id } },
        (err, data) => {
          if (err) return err;
        }
      );
    });
    res.send(data);
  });
});

router.patch("/editProvince/:id", (req, res) => {
  console.log(req.body);
  const editProvince = {
    Name: req.body.name,
    Areas: req.body.area_Id,
  };

  provincesModel.findByIdAndUpdate(req.params.id, editProvince, (err, data) => {
    if (err) return err;
    res.send(data);
  });
});

router.delete("/deleteProvince/:id", async (req, res) => {
  const getProvince = await provincesModel.findById(req.params.id).exec();
  //   if (getProvince.Provinces.length === 0) {
  provincesModel.findByIdAndDelete(getProvince._id, (err, data) => {
    res.send(data);
  });
  //   } else {
  //     res.send({ exist: "Existed" });
  //   }
});

module.exports = router;
