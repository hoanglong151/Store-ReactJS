const mongoose = require("mongoose");
const billStatusModel = require("../model/Schema/billStatus.schema");

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
      res.send({ billStatus: billStatus, totalPage: totalPage });
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
