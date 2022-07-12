const mongoose = require("mongoose");
const areasModel = require("../model/Schema/areas.schema");
const detailBillsModel = require("../model/Schema/detailBills.schema");
const provincesModel = require("../model/Schema/provinces.schema");
const districtsModel = require("../model/Schema/districts.schema");
const addressStoresModel = require("../model/Schema/addressStores.schema");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

const getAreas = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let areas;
  const skipAreas = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    areas = await areasModel.find().skip(skipAreas).limit(PAGE_SIZE);
  } else {
    areas = await areasModel.find();
  }

  areasModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.send({ areas: areas, totalPage: totalPage });
    }
  });
};

const addArea = (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const area = {
    _id: id,
    Name: req.body.name,
  };
  areasModel.create(area, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    res.send(data);
  });
};

const editArea = (req, res) => {
  const editArea = {
    Name: req.body.name,
  };

  areasModel.findByIdAndUpdate(req.params.id, editArea, (err, data) => {
    if (err) return err;
    res.send(data);
  });
};

const deleteArea = async (req, res) => {
  const checkExistedAreaByBill = await detailBillsModel.findOne({
    Areas: new mongoose.Types.ObjectId(req.params.id),
  });
  const checkExistedAreaByProvince = await provincesModel.findOne({
    Areas: new mongoose.Types.ObjectId(req.params.id),
  });
  const checkExistedAreaByDistrict = await districtsModel.findOne({
    Areas: new mongoose.Types.ObjectId(req.params.id),
  });
  const checkExistedAreaByAddressStore = await addressStoresModel.findOne({
    Areas: new mongoose.Types.ObjectId(req.params.id),
  });
  if (
    checkExistedAreaByBill ||
    checkExistedAreaByProvince ||
    checkExistedAreaByDistrict ||
    checkExistedAreaByAddressStore
  ) {
    res.json({ Exist: "Vùng Miền Đang Được Sử Dụng. Không Thể Xóa" });
  } else {
    areasModel.findByIdAndDelete(req.params.id, (err, data) => {
      res.send(data);
    });
  }
};

const searchArea = async (req, res) => {
  const result = await areasModel.find().exec();
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
module.exports = { getAreas, addArea, editArea, deleteArea, searchArea };
