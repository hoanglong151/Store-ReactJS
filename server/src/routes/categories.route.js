const express = require("express");
const multer = require("multer");
const upload = multer();
const mongoose = require("mongoose");
const categoriesModel = require("../model/Schema/categories.schema");
const { storage } = require("../model/connectFirebase.model");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const uuid = require("uuid");

const router = express.Router();

router.get("/", (req, res) => {
  categoriesModel.find({}, (err, categories) => {
    res.send(categories);
  });
});

router.post("/addCategory", upload.single("image"), async (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const category = {
    _id: id,
    Name: req.body.name,
    Image: "",
  };
  const metadata = {
    contentType: req.file.mimetype,
  };
  const storageRef = ref(storage, `/categories/${id}-${uuid.v1()}`);
  await uploadBytes(storageRef, req.file.buffer, metadata).then((snapshot) => {
    console.log("Uploaded a blob or file! ", snapshot);
  });
  await getDownloadURL(storageRef)
    .then((url) => {
      return (category.Image = url);
    })
    .catch((error) => console.log("Error: ", error));

  categoriesModel.create(category, (err, cate) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    res.send(cate);
  });
});

router.delete("/deleteCategory/:id", (req, res) => {
  categoriesModel.findById(req.params.id, (err, cate) => {
    if (cate.Products.length === 0) {
      categoriesModel.findByIdAndDelete(req.params.id, (err, cate) => {
        console.log(cate);
      });
    }
    res.send(cate);
  });
});

router.patch("/editCategory/:id", upload.single("image"), async (req, res) => {
  const category = {
    Name: req.body.name,
    Image: req.body.image,
  };
  if (req.file) {
    const getCategory = await categoriesModel.findById(req.params.id).exec();

    const fileRef = ref(storage, getCategory.Image);
    const desertRef = ref(storage, fileRef.fullPath);
    deleteObject(desertRef)
      .then(() => {
        console.log("Deteled Old Image");
      })
      .catch((error) => {
        console.log("Oh No");
      });

    const metadata = {
      contentType: req.file.mimetype,
    };
    const storageRef = ref(
      storage,
      `/categories/${req.params.id}-${uuid.v1()}`
    );
    await uploadBytes(storageRef, req.file.buffer, metadata).then(
      (snapshot) => {
        console.log("Uploaded a blob or file! ", snapshot);
      }
    );
    await getDownloadURL(storageRef)
      .then((url) => {
        return (category.Image = url);
      })
      .catch((error) => console.log("Error: ", error));
  }
  categoriesModel.findByIdAndUpdate(req.params.id, category, (err, cate) => {
    if (err) {
      console.log("LỖI: ", err);
      return err;
    }
    res.send(cate);
  });
});

module.exports = router;