const mongoose = require("mongoose");
const saleCodesModel = require("../model/Schema/saleCodes.schema");
const detailBillsModel = require("../model/Schema/detailBills.schema");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

const getSaleCodes = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let saleCodes;
  const skipSaleCodes = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    saleCodes = await saleCodesModel
      .find()
      .skip(skipSaleCodes)
      .limit(PAGE_SIZE);
  } else {
    saleCodes = await saleCodesModel.find();
  }
  saleCodesModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.json({ saleCodes: saleCodes, totalPage: totalPage });
    }
  });
};

const addSaleCode = (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const area = {
    _id: id,
    Name: req.body.name,
    Sale: req.body.sale,
  };
  saleCodesModel.create(area, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    res.json(data);
  });
};

const editSaleCode = (req, res) => {
  const editSaleCode = {
    Name: req.body.name,
    Sale: req.body.sale,
  };

  saleCodesModel.findByIdAndUpdate(req.params.id, editSaleCode, (err, data) => {
    if (err) return err;
    res.json(data);
  });
};

const deleteSaleCode = async (req, res) => {
  const checkExistedSaleCode = await detailBillsModel
    .findOne({ "Cart.saleCode._id": req.params.id })
    .exec();
  if (checkExistedSaleCode) {
    res.json({ Exist: "Mã Khuyến Mãi Này Đang Được Sử Dụng. Không Thể Xóa" });
  } else {
    saleCodesModel.findByIdAndDelete(req.params.id, (err, data) => {
      res.json(data);
    });
  }
};

const applySaleCode = (req, res) => {
  saleCodesModel.findOne({ Name: req.body.code }, (err, data) => {
    res.json(data);
  });
};

const searchSaleCode = async (req, res) => {
  const result = await saleCodesModel.find().exec();
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
  getSaleCodes,
  addSaleCode,
  editSaleCode,
  deleteSaleCode,
  applySaleCode,
  searchSaleCode,
};
