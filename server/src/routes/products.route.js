const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const { validateToken } = require("../middlewares/validationToken.middleware");

const {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct,
} = require("../controllers/products.controller");

router.get("/", getProducts);

router.post(
  "/addProduct",
  validateToken,
  upload.array("images", 6),
  addProduct
);

router.patch(
  "/editProduct",
  validateToken,
  upload.array("images", 6),
  editProduct
);

router.delete("/deleteProduct/:id", validateToken, deleteProduct);

router.get("/searchProduct/", searchProduct);

module.exports = router;
