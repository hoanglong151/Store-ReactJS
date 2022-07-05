const express = require("express");

const {
  validateTokenNoNext,
} = require("../middlewares/validationToken.middleware");
const {
  login,
  verifyOTP,
} = require("../controllers/authentication.controller");

const router = express.Router();

router.post("/login", login);

router.post("/verifyOTP", verifyOTP);

router.get("/validateToken", validateTokenNoNext);

module.exports = router;
