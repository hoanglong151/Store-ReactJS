const mongoose = require("mongoose");
const detailBillsModel = require("../model/detailBills.model");
const districtsModel = require("../model/districts.model");
const addressStoresModel = require("../model/addressStores.model");
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
      res.json({ districts: districts, totalPage: totalPage });
    }
  });
};

const addDistrict = async (req, res) => {
  const checkExistDistrict = await districtsModel.findOne({
    Name: req.body.name,
    Areas: new mongoose.Types.ObjectId(req.body.area_Id),
    Provinces: new mongoose.Types.ObjectId(req.body.province_Id),
  });
  if (checkExistDistrict) {
    res.json({ Exist: "Quận/Huyện Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
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
      res.json(data);
    });
  }
};

const editDistrict = async (req, res) => {
  const checkExistDistrict = await districtsModel.findOne({
    Name: req.body.name,
    Areas: new mongoose.Types.ObjectId(req.body.area_Id),
    Provinces: new mongoose.Types.ObjectId(req.body.province_Id),
  });
  if (
    checkExistDistrict &&
    checkExistDistrict._id.toString() !== req.params.id
  ) {
    res.json({ Exist: "Quận/Huyện Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
    const editDistrict = {
      Name: req.body.name,
      Areas: req.body.area_Id,
      Provinces: req.body.province_Id,
    };

    districtsModel.findByIdAndUpdate(
      req.params.id,
      editDistrict,
      (err, data) => {
        if (err) return err;
        res.json(data);
      }
    );
  }
};

const deleteDistrict = async (req, res) => {
  const checkExistedDistrictByBill = await detailBillsModel.findOne({
    Districts: new mongoose.Types.ObjectId(req.params.id),
  });
  const checkExistedDistrictByAddressStore = await addressStoresModel.findOne({
    Districts: new mongoose.Types.ObjectId(req.params.id),
  });

  if (checkExistedDistrictByBill || checkExistedDistrictByAddressStore) {
    res.json({ Exist: "Quận/Huyện Đang Được Sử Dụng. Không Thể Xóa" });
  } else {
    districtsModel.findByIdAndDelete(req.params.id, (err, data) => {
      res.json(data);
    });
  }
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
  res.json({ data: data, totalPage: totalPage });
};

module.exports = {
  getDistricts,
  addDistrict,
  editDistrict,
  deleteDistrict,
  searchDistrict,
};
