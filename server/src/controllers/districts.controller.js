const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const districtsModel = require("../model/Schema/districts.schema");

const getDistricts = (req, res) => {
  districtsModel
    .find({}, (err, data) => {
      res.send(data);
    })
    .populate("Areas")
    .populate("Provinces");
};

const addDistrict = (req, res) => {
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
};

const editDistrict = (req, res) => {
  const editDistrict = {
    Name: req.body.name,
    Areas: req.body.area_Id,
    Provinces: req.body.province_Id,
  };

  districtsModel.findByIdAndUpdate(req.params.id, editDistrict, (err, data) => {
    if (err) return err;
    res.send(data);
  });
};

const deleteDistrict = async (req, res) => {
  const getDistrict = await districtsModel.findById(req.params.id).exec();
  districtsModel.findByIdAndDelete(getDistrict._id, (err, data) => {
    res.send(data);
  });
};

module.exports = { getDistricts, addDistrict, editDistrict, deleteDistrict };
