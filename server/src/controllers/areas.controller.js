const mongoose = require("mongoose");
const areasModel = require("../model/Schema/areas.schema");

const getAreas = (req, res) => {
  areasModel.find({}, (err, data) => {
    res.send(data);
  });
};

const addArea = (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const area = {
    _id: id,
    Name: req.body.name,
  };
  areasModel.create(area, (err, data) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    res.send(data);
  });
};

const editArea = (req, res) => {
  const editArea = {
    Name: req.body.name,
  };

  areasModel.findByIdAndUpdate(req.params.id, editArea, (err, data) => {
    if (err) return err;
    res.send(data);
  });
};

const deleteArea = async (req, res) => {
  const getArea = await areasModel.findById(req.params.id).exec();
  if (getArea.Provinces.length === 0) {
    areasModel.findByIdAndDelete(getArea._id, (err, data) => {
      res.send(data);
    });
  } else {
    res.send({ exist: "Existed" });
  }
};
module.exports = { getAreas, addArea, editArea, deleteArea };
