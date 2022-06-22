const express = require("express");

const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getSaleCodes,
  addSaleCode,
  editSaleCode,
  deleteSaleCode,
  applySaleCode,
  searchSaleCode,
} = require("../controllers/saleCodes.controller");

const router = express.Router();

router.get("/", validateToken, getSaleCodes);

router.post("/addSaleCode", validateToken, addSaleCode);

router.patch("/editSaleCode/:id", validateToken, editSaleCode);

router.delete("/deleteSaleCode/:id", validateToken, deleteSaleCode);

router.post("/applySaleCode", applySaleCode);

router.get("/searchSaleCode", searchSaleCode);

module.exports = router;
