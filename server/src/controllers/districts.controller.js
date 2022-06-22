const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const districtsModel = require("../model/Schema/districts.schema");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

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

const searchDistrict = async (req, res) => {
  const result = await districtsModel
    .find()
    .populate("Areas")
    .populate("Provinces")
    .exec();
  const data = result.filter((value) => {
    const removeUnicodeName = replaceUnicode(value.Name.toLowerCase());
    const removeUnicodeSearch = replaceUnicode(req.query.q.toLowerCase());
    const name = removeUnicodeName.split(" ");
    const search = removeUnicodeSearch.split(" ");
    const contains = search.every((input) => {
      return name.includes(input);
    });
    if (contains) {
      return value;
    } else {
      return removeUnicodeName.toLowerCase().includes(removeUnicodeSearch);
    }
  });
  const totalPage = Math.ceil(data.length / parseInt(req.query.size));
  res.send({ data: data, totalPage: totalPage });
};

module.exports = {
  getDistricts,
  addDistrict,
  editDistrict,
  deleteDistrict,
  searchDistrict,
};
