const express = require("express");

const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getProvinces,
  addProvince,
  editProvince,
  deleteProvince,
  searchProvince,
} = require("../controllers/provinces.controller");

const router = express.Router();

router.get("/", getProvinces);

router.post("/addProvince", validateToken, addProvince);

router.patch("/editProvince/:id", validateToken, editProvince);

router.delete("/deleteProvince/:id", validateToken, deleteProvince);

router.get("/searchProvince", searchProvince);

module.exports = router;
