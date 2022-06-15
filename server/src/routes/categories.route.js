const express = require("express");
const multer = require("multer");
const upload = multer();

const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/categories.controller");

const router = express.Router();

router.get("/", getCategories);

router.post("/addCategory", validateToken, upload.single("image"), addCategory);

router.delete("/deleteCategory/:id", validateToken, deleteCategory);

router.patch(
  "/editCategory/:id",
  validateToken,
  upload.single("image"),
  editCategory
);

module.exports = router;
