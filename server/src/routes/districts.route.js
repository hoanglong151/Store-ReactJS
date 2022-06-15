const express = require("express");
const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getDistricts,
  addDistrict,
  editDistrict,
  deleteDistrict,
} = require("../controllers/districts.controller");

const router = express.Router();

router.get("/", getDistricts);

router.post("/addDistrict", validateToken, addDistrict);

router.patch("/editDistrict/:id", validateToken, editDistrict);

router.delete("/deleteDistrict/:id", validateToken, deleteDistrict);

module.exports = router;
