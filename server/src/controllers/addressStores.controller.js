const mongoose = require("mongoose");
const districtsModel = require("../model/Schema/districts.schema");
const addressStoresModel = require("../model/Schema/addressStores.schema");

const getAddressStores = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let addressStores;
  const skipAddressStores = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    addressStores = await addressStoresModel
      .find()
      .populate("Areas")
      .populate("Provinces")
      .populate("Districts")
      .skip(skipAddressStores)
      .limit(PAGE_SIZE);
  } else {
    addressStores = await addressStoresModel
      .find()
      .populate("Areas")
      .populate("Provinces")
      .populate("Districts");
  }

  addressStoresModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.send({ addressStores: addressStores, totalPage: totalPage });
    }
  });
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
