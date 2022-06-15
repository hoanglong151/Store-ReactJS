const mongoose = require("mongoose");
const billStatusModel = require("../model/Schema/billStatus.schema");

const getBillStatus = (req, res) => {
  billStatusModel.find({}, (err, data) => {
    res.send(data);
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
    res.send(data);
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
      res.send(data);
    }
  );
};

const deleteBillStatus = (req, res) => {
  billStatusModel.findByIdAndDelete(req.params.id, (err, data) => {
    res.send(data);
  });
};

module.exports = {
  getBillStatus,
  addBillStatus,
  editBillStatus,
  deleteBillStatus,
};
