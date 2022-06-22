const express = require("express");

const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getAreas,
  addArea,
  editArea,
  deleteArea,
  searchArea,
} = require("../controllers/areas.controller");

const router = express.Router();

router.get("/", getAreas);

router.post("/addArea", validateToken, addArea);

router.patch("/editArea/:id", validateToken, editArea);

router.delete("/deleteArea/:id", validateToken, deleteArea);

router.get("/searchArea", searchArea);

module.exports = router;
