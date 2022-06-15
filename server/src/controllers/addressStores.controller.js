const mongoose = require("mongoose");
const districtsModel = require("../model/Schema/districts.schema");
const addressStoresModel = require("../model/Schema/addressStores.schema");

const getAddressStores = (req, res) => {
  addressStoresModel
    .find({}, (err, data) => {
      res.send(data);
    })
    .populate("Areas")
    .populate("Provinces")
    .populate("Districts");
};

const addAddressStore = (req, res) => {
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
};

const editAddressStore = (req, res) => {
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
};

const deleteAddressStore = (req, res) => {
  addressStoresModel.findByIdAndDelete(req.params.id, (err, data) => {
    res.send(data);
  });
};

module.exports = {
  getAddressStores,
  addAddressStore,
  editAddressStore,
  deleteAddressStore,
};
