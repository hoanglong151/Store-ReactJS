const mongoose = require("mongoose");
const billStatusModel = require("../model/billStatus.model");
const detailBillsModel = require("../model/detailBills.model");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

const getBillStatus = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let billStatus;
  const skipBillStatus = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    billStatus = await billStatusModel
      .find()
      .skip(skipBillStatus)
      .limit(PAGE_SIZE);
  } else {
    billStatus = await billStatusModel.find();
  }
  billStatusModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.json({ billStatus: billStatus, totalPage: totalPage });
    }
  });
};

const addBillStatus = async (req, res) => {
  const checkExistBillStatus = await billStatusModel.findOne({
    Name: req.body.name,
  });
  if (checkExistBillStatus) {
    res.json({ Exist: "Tình Trạng Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
    const id = new mongoose.Types.ObjectId().toString();
    const billStatus = {
      _id: id,
      Name: req.body.name,
    };
    billStatusModel.create(billStatus, (err, data) => {
      if (err) {
        console.log("LỖI: ", err);
        return err;
      }
      res.json(data);
    });
  }
};

const editBillStatus = async (req, res) => {
  const checkExistBillStatus = await billStatusModel.findOne({
    Name: req.body.name,
  });
  if (
    checkExistBillStatus &&
    checkExistBillStatus._id.toString() !== req.params.id
  ) {
    res.json({ Exist: "Tình Trạng Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
    const editBillStatus = {
      Name: req.body.name,
    };

    billStatusModel.findByIdAndUpdate(
      req.params.id,
      editBillStatus,
      (err, data) => {
        if (err) return err;
        res.json(data);
      }
    );
  }
};

const deleteBillStatus = async (req, res) => {
  const checkExistedBillStatus = await detailBillsModel.findOne({
    "BillStatus._id": req.params.id,
  });
  if (checkExistedBillStatus) {
    res.json({
      Exist: "Tình Trạng Đơn Hàng Này Đang Được Sử Dụng. Không Thể Xóa",
    });
  } else {
    billStatusModel.findByIdAndDelete(req.params.id, (err, data) => {
      res.json(data);
    });
  }
};

const searchBillStatus = async (req, res) => {
  const result = await billStatusModel.find().exec();
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
  getBillStatus,
  addBillStatus,
  editBillStatus,
  deleteBillStatus,
  searchBillStatus,
};
