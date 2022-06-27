const express = require("express");
const router = express.Router();

const {
  getTypeProducts,
  searchTypeProducts,
} = require("../controllers/typeProducts.controller");

router.get("/", getTypeProducts);

router.get("/searchTypeProduct", searchTypeProducts);

module.exports = router;
