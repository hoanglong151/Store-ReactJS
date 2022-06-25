const express = require("express");
const router = express.Router();

const { getTypeProducts } = require("../controllers/typeProducts.controller");

router.get("/", getTypeProducts);

module.exports = router;
