const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const areasModel = require("../model/Schema/areas.schema");

const getProvinces = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let provinces;
  const skipProvinces = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    provinces = await provincesModel
      .find()
      .populate("Areas")
      .skip(skipProvinces)
      .limit(PAGE_SIZE);
  } else {
    provinces = await provincesModel.find().populate("Areas");
  }

  provincesModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.send({ provinces: provinces, totalPage: totalPage });
    }
  });
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
