const mongoose = require("mongoose");
const provincesModel = require("../model/Schema/provinces.schema");
const detailBillsModel = require("../model/Schema/detailBills.schema");
const districtsModel = require("../model/Schema/districts.schema");
const addressStoresModel = require("../model/Schema/addressStores.schema");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

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
      res.json({ provinces: provinces, totalPage: totalPage });
    }
  });
};

const addProvince = async (req, res) => {
  const checkExistProvince = await provincesModel.findOne({
    Name: req.body.name,
    Areas: new mongoose.Types.ObjectId(req.body.area_Id),
  });
  if (checkExistProvince) {
    res.json({ Exist: "Tình Thành Đã Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
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
      res.json(data);
    });
  }
};

const editProvince = async (req, res) => {
  const checkExistProvince = await provincesModel.findOne({
    Name: req.body.name,
    Areas: new mongoose.Types.ObjectId(req.body.area_Id),
  });
  if (
    checkExistProvince &&
    checkExistProvince._id.toString() !== req.params.id
  ) {
    res.json({ Exist: "Tình Thành Đã Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
    const editProvince = {
      Name: req.body.name,
      Areas: req.body.area_Id,
    };

    provincesModel.findByIdAndUpdate(
      req.params.id,
      editProvince,
      (err, data) => {
        if (err) return err;
        res.json(data);
      }
    );
  }
};

const deleteProvince = async (req, res) => {
  const checkExistedProvinceByBill = await detailBillsModel.findOne({
    Provinces: new mongoose.Types.ObjectId(req.params.id),
  });
  const checkExistedProvinceByDistrict = await districtsModel.findOne({
    Provinces: new mongoose.Types.ObjectId(req.params.id),
  });
  const checkExistedProvinceByAddressStore = await addressStoresModel.findOne({
    Provinces: new mongoose.Types.ObjectId(req.params.id),
  });
  if (
    checkExistedProvinceByBill ||
    checkExistedProvinceByDistrict ||
    checkExistedProvinceByAddressStore
  ) {
    res.json({ Exist: "Tỉnh/Thành Đang Được Sử Dụng. Không Thể Xóa" });
  } else {
    provincesModel.findByIdAndDelete(req.params.id, (err, data) => {
      res.json(data);
    });
  }
};

const searchProvince = async (req, res) => {
  const result = await provincesModel.find().populate("Areas").exec();
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
  getProvinces,
  addProvince,
  editProvince,
  deleteProvince,
  searchProvince,
};
