const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const areasModel = require("../model/Schema/areas.schema");

const getProvinces = (req, res) => {
  provincesModel
    .find({}, (err, data) => {
      res.send(data);
    })
    .populate("Areas");
};

const addProvince = (req, res) => {
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
};

const editProvince = (req, res) => {
  const editProvince = {
    Name: req.body.name,
    Areas: req.body.area_Id,
  };

  provincesModel.findByIdAndUpdate(req.params.id, editProvince, (err, data) => {
    if (err) return err;
    res.send(data);
  });
};

const deleteProvince = async (req, res) => {
  const getProvince = await provincesModel.findById(req.params.id).exec();
  provincesModel.findByIdAndDelete(getProvince._id, (err, data) => {
    res.send(data);
  });
};

module.exports = { getProvinces, addProvince, editProvince, deleteProvince };
