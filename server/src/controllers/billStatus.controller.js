const mongoose = require("mongoose");
const billStatusModel = require("../model/Schema/billStatus.schema");
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

const addBillStatus = (req, res) => {
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
};

const editBillStatus = (req, res) => {
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
};

const deleteBillStatus = (req, res) => {
  billStatusModel.findByIdAndDelete(req.params.id, (err, data) => {
    res.json(data);
  });
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
