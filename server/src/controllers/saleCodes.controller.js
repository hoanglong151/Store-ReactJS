const mongoose = require("mongoose");
const saleCodesModel = require("../model/Schema/saleCodes.schema");

const getSaleCodes = (req, res) => {
  saleCodesModel.find({}, (err, data) => {
    res.send(data);
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
