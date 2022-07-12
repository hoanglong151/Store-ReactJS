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
  uploadImage,
} = require("../controllers/products.controller");

router.get("/", getProducts);

router.post("/addProduct", validateToken, upload.any(), addProduct);

router.post(
  "/uploadImg",
  validateToken,
  upload.single("uploadImg"),
  uploadImage
);

router.patch("/editProduct", validateToken, upload.any(), editProduct);

router.delete("/deleteProduct/:id", validateToken, deleteProduct);

router.get("/searchProduct/", searchProduct);

module.exports = router;
