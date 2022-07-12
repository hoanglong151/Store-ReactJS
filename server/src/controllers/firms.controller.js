const mongoose = require("mongoose");
const firmsModel = require("../model/Schema/firms.schema");
const productsModel = require("../model/Schema/products.schema");
const jwt = require("jsonwebtoken");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

const getFirms = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let firms;
  const skipFirms = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    firms = await firmsModel.find().skip(skipFirms).limit(PAGE_SIZE);
  } else {
    firms = await firmsModel.find();
  }
  firmsModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.json({ firms: firms, totalPage: totalPage });
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
      res.json(data);
    });
  });
};

const editFirm = (req, res) => {
  const editFirm = {
    Name: req.body.name,
  };

  firmsModel.findByIdAndUpdate(req.params.id, editFirm, async (err, data) => {
    try {
      res.json(data);
    } catch (err) {
      res.status(404);
    }
  });
};

const deleteFirm = async (req, res) => {
  const getProduct = await productsModel.find({
    Firm_ID: new mongoose.Types.ObjectId(`${req.params.id}`),
  });
  if (getProduct.length === 0) {
    firmsModel.findByIdAndDelete(req.params.id, (err, data) => {
      res.json(data);
    });
  } else {
    res.json({ Exist: "Hãng Đang Được Sử Dụng. Không Thể Xóa" });
  }
};

const searchFirm = async (req, res) => {
  const result = await firmsModel.find().exec();
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

module.exports = { getFirms, addFirm, editFirm, deleteFirm, searchFirm };
