const express = require("express");

const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  findBill,
  updateBill,
  paymentBill,
  getBills,
  searchBill,
} = require("../controllers/bills.controller");

const router = express.Router();

router.post("/findBill", findBill);

router.patch("/updateBill", validateToken, updateBill);

router.post("/paymentBill", paymentBill);

router.get("/", validateToken, getBills);

router.get("/searchBill", searchBill);

module.exports = router;
