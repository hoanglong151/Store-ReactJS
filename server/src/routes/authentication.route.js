const express = require("express");

const {
  validateTokenNoNext,
} = require("../middlewares/validationToken.middleware");
const { login } = require("../controllers/authentication.controller");

const router = express.Router();

router.post("/login", login);

router.get("/validateToken", validateTokenNoNext);

module.exports = router;
