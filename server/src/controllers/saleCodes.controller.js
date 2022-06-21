const mongoose = require("mongoose");
const saleCodesModel = require("../model/Schema/saleCodes.schema");

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
      res.send({ saleCodes: saleCodes, totalPage: totalPage });
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
    res.send(data);
  });
};

const editSaleCode = (req, res) => {
  const editSaleCode = {
    Name: req.body.name,
    Sale: req.body.sale,
  };

  saleCodesModel.findByIdAndUpdate(req.params.id, editSaleCode, (err, data) => {
    if (err) return err;
    res.send(data);
  });
};

const deleteSaleCode = (req, res) => {
  saleCodesModel.findByIdAndDelete(req.params.id, (err, data) => {
    res.send(data);
  });
};

const applySaleCode = (req, res) => {
  saleCodesModel.findOne({ Name: req.body.code }, (err, data) => {
    res.send(data);
  });
};
module.exports = {
  getSaleCodes,
  addSaleCode,
  editSaleCode,
  deleteSaleCode,
  applySaleCode,
};
