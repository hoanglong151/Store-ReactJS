const mongoose = require("mongoose");
const firmsModel = require("../model/Schema/firms.schema");
const jwt = require("jsonwebtoken");

const getFirms = (req, res) => {
  firmsModel.find({}, (err, firms) => {
    res.send(firms);
  });
};

const addFirm = (req, res) => {
  const token = req.headers.authorization.split(" ");
  jwt.verify(token[1], "hoanglong", (err, info) => {
    if (err) {
      res.status(401);
    }
    const id = new mongoose.Types.ObjectId().toString();
    const firm = {
      _id: id,
      Name: req.body.name,
    };
    firmsModel.create(firm, (err, data) => {
      if (err) {
        return res.status(404);
      }
      res.send(data);
    });
  });
};

const editFirm = (req, res) => {
  const editFirm = {
    Name: req.body.name,
  };

  firmsModel.findByIdAndUpdate(req.params.id, editFirm, async (err, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.status(404);
    }
  });
};

const deleteFirm = async (req, res) => {
  const getFirm = await firmsModel.findById(req.params.id).exec();
  if (getFirm.Products.length === 0) {
    firmsModel.findByIdAndDelete(getFirm._id, (err, data) => {
      res.send(data);
    });
  } else {
    res.send({ exist: "Existed" });
  }
};

module.exports = { getFirms, addFirm, editFirm, deleteFirm };
