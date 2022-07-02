const express = require("express");

const {
  billByStatus,
  updateBillStatus,
} = require("../controllers/detailBills.controller");
const { validateToken } = require("../middlewares/validationToken.middleware");

const router = express.Router();

router.get("/getBillByStatusCount", billByStatus);

router.patch("/updateBillStatus", validateToken, updateBillStatus);

module.exports = router;
