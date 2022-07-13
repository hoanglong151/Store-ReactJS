const mongoose = require("mongoose");
const detailBillsModel = require("../model/Schema/detailBills.schema");
const addressStoresModel = require("../model/Schema/addressStores.schema");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

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
      res.json({ addressStores: addressStores, totalPage: totalPage });
    }
  });
};

const addAddressStore = async (req, res) => {
  const checkExistAddressStore = await addressStoresModel.findOne({
    Name: req.body.name,
    Areas: new mongoose.Types.ObjectId(req.body.area_Id),
    Provinces: new mongoose.Types.ObjectId(req.body.province_Id),
    Districts: new mongoose.Types.ObjectId(req.body.district_Id),
  });
  if (checkExistAddressStore) {
    res.json({ Exist: "Địa Chỉ Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
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
      res.json(data);
    });
  }
};

const editAddressStore = async (req, res) => {
  const checkExistAddressStore = await addressStoresModel.findOne({
    Name: req.body.name,
    Areas: new mongoose.Types.ObjectId(req.body.area_Id),
    Provinces: new mongoose.Types.ObjectId(req.body.province_Id),
    Districts: new mongoose.Types.ObjectId(req.body.district_Id),
  });
  if (
    checkExistAddressStore &&
    checkExistAddressStore._id.toString() !== req.params.id
  ) {
    res.json({ Exist: "Địa Chỉ Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
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
        res.json(data);
      }
    );
  }
};

const deleteAddressStore = async (req, res) => {
  const checkExistedAddressStoresByBill = await detailBillsModel.findOne({
    AddressStores: new mongoose.Types.ObjectId(req.params.id),
  });

  if (checkExistedAddressStoresByBill) {
    res.json({ Exist: "Cửa Hàng Đang Được Sử Dụng. Không Thể Xóa" });
  } else {
    addressStoresModel.findByIdAndDelete(req.params.id, (err, data) => {
      res.json(data);
    });
  }
};

const searchAddressStore = async (req, res) => {
  const result = await addressStoresModel
    .find()
    .populate("Areas")
    .populate("Provinces")
    .populate("Districts")
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
  getAddressStores,
  addAddressStore,
  editAddressStore,
  deleteAddressStore,
  searchAddressStore,
};
