const express = require("express");

const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getProvinces,
  addProvince,
  editProvince,
  deleteProvince,
} = require("../controllers/provinces.controller");

const router = express.Router();

router.get("/", getProvinces);

router.post("/addProvince", validateToken, addProvince);

router.patch("/editProvince/:id", validateToken, editProvince);

router.delete("/deleteProvince/:id", validateToken, deleteProvince);

module.exports = router;
