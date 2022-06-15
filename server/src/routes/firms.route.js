const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getFirms,
  addFirm,
  editFirm,
  deleteFirm,
} = require("../controllers/firms.controller");

router.get("/", getFirms);

router.post("/addFirm", validateToken, addFirm);

router.patch("/editFirm/:id", validateToken, editFirm);

router.delete("/deleteFirm/:id", validateToken, deleteFirm);

module.exports = router;
