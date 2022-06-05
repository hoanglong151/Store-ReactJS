const express = require("express");
const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const areasModel = require("../model/Schema/areas.schema");
const districtsModel = require("../model/Schema/districts.schema");
const addressStoresModel = require("../model/Schema/addressStores.schema");

const router = express.Router();

router.get("/", (req, res) => {
  addressStoresModel
    .find({}, (err, data) => {
      res.send(data);
    })
    .populate("Areas")
    .populate("Provinces")
    .populate("Districts");
});

router.post("/addAddressStore", (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const addressStore = {
    _id: id,
    Name: req.body.name,
    Areas: req.body.area_Id,
    Provinces: req.body.province_Id,
    Districts: req.body.district_Id,
  };
  addressStoresModel.create(addressStore, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    req.body.district_Id.map((value) => {
      districtsModel.findByIdAndUpdate(
        value,
        { $push: { AddressStore: id } },
        (err, data) => {
          if (err) return err;
        }
      );
    });
    res.send(data);
  });
});

router.patch("/editAddressStore/:id", (req, res) => {
  const editAddressStore = {
    Name: req.body.name,
    Areas: req.body.area_Id,
    Provinces: req.body.province_Id,
    Districts: req.body.district_Id,
  };

  addressStoresModel.findByIdAndUpdate(
    req.params.id,
    editAddressStore,
    (err, data) => {
      if (err) return err;
      res.send(data);
    }
  );
});

router.delete("/deleteAddressStore/:id", async (req, res) => {
  // const getDistrict = await districtsModel.findById(req.params.id).exec();
  // console.log(getDistrict);
  // if (getDistrict.AddressStore.length === 0) {
  addressStoresModel.findByIdAndDelete(req.params.id, (err, data) => {
    res.send(data);
  });
  // } else {
  //   res.send({ exist: "Existed" });
  // }
});

module.exports = router;
