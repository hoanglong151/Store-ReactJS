const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const districtsModel = require("../model/Schema/districts.schema");

const getDistricts = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let districts;
  const skipDistricts = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    districts = await districtsModel
      .find()
      .populate("Areas")
      .populate("Provinces")
      .skip(skipDistricts)
      .limit(PAGE_SIZE);
  } else {
    districts = await districtsModel
      .find()
      .populate("Areas")
      .populate("Provinces");
  }

  districtsModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.send({ districts: districts, totalPage: totalPage });
    }
  });
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
