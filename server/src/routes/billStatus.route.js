const express = require("express");

const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getBillStatus,
  addBillStatus,
  editBillStatus,
  deleteBillStatus,
  searchBillStatus,
} = require("../controllers/billStatus.controller");

const router = express.Router();

router.get("/", validateToken, getBillStatus);

router.post("/addBillStatus", validateToken, addBillStatus);

router.patch("/editBillStatus/:id", validateToken, editBillStatus);

router.delete("/deleteBillStatus/:id", validateToken, deleteBillStatus);

router.get("/searchBillStatus", searchBillStatus);

module.exports = router;
