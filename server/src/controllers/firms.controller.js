const mongoose = require("mongoose");
const firmsModel = require("../model/Schema/firms.schema");
const jwt = require("jsonwebtoken");

const getFirms = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let firms;
  const skipFirms = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    firms = await firmsModel
      .find()
      .populate("Products")
      .populate({
        path: "Products",
        populate: {
          path: "TypesProduct",
          model: "typeProducts",
        },
      })
      .skip(skipFirms)
      .limit(PAGE_SIZE);
  } else {
    firms = await firmsModel
      .find()
      .populate("Products")
      .populate({
        path: "Products",
        populate: {
          path: "TypesProduct",
          model: "typeProducts",
        },
      });
  }
  firmsModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.send({ firms: firms, totalPage: totalPage });
    }
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
