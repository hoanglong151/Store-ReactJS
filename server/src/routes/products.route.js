const express = require("express");
const multer = require("multer");
const upload = multer();
const mongoose = require("mongoose");
const productsModel = require("../model/Schema/products.schema");
const categoriesModel = require("../model/Schema/categories.schema");
const firmsModel = require("../model/Schema/firms.schema");
const router = express.Router();
const { storage } = require("../model/connectFirebase.model");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const uuid = require("uuid");

router.get("/", async (req, res) => {
  try {
    const listProducts = await productsModel
      .find()
      .populate("Category_ID")
      .populate("Firm_ID");
    res.send(listProducts);
  } catch (Error) {
    res.send("Toang", Error);
  }
});

router.post("/addProduct", upload.array("images", 6), async (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();

  const product = {
    _id: id,
    Image: [],
    Name: req.body.name,
    Description: req.body.description,
    Category_ID: req.body.category_Id.split(","),
    Firm_ID: req.body.firm_Id,
    TypesProduct: JSON.parse(req.body.typesProduct),
    CreateDate: new Date(req.body.createDate),
    UpdateDate: "",
  };

  await Promise.all(
    req.files.map(async (image, index) => {
      const metadata = {
        contentType: image.mimetype,
      };
      const storageRef = ref(storage, `/images/${id}-${uuid.v1()}`);
      await uploadBytes(storageRef, image.buffer, metadata).then((snapshot) => {
        console.log("Uploaded a blob or file! ", snapshot);
      });
      await getDownloadURL(storageRef)
        .then((url) => {
          return product.Image.push(url);
        })
        .catch((error) => console.log("Error: ", error));
    })
  );

  try {
    const newProduct = await productsModel.create(product);
    await Promise.all(
      product.Category_ID.map(async (category, index) => {
        categoriesModel.findByIdAndUpdate(
          category,
          { $push: { Products: product._id } },
          (err, cate) => {
            if (err) return err;
          }
        );
      })
    );
    await firmsModel.findByIdAndUpdate(
      product.Firm_ID,
      { $push: { Products: product._id } },
      (err, firm) => {
        if (err) return err;
      }
    );

    res.send(newProduct);
  } catch (err) {
    res.send(err);
  }
});

router.patch("/editProduct", upload.array("images", 6), async (req, res) => {
  const editProduct = {
    _id: req.body.id,
    Image: req.files.length === 0 ? req.body.images.split(",") : [],
    Name: req.body.name,
    Description: req.body.description,
    Category_ID: req.body.category_Id.split(","),
    Firm_ID: req.body.firm_Id,
    TypesProduct: JSON.parse(req.body.typesProduct),
    CreateDate: new Date(req.body.createDate),
    UpdateDate: new Date(req.body.updateDate),
  };

  if (req.files.length !== 0) {
    const arrrayImages = req.body.imagesOld.split(",");
    arrrayImages.map((image, index) => {
      const fileRef = ref(storage, image);
      const desertRef = ref(storage, fileRef.fullPath);
      deleteObject(desertRef)
        .then(() => {
          console.log("Deteled Old Image");
        })
        .catch((error) => {
          console.log("Oh No");
        });
    });

    await Promise.all(
      req.files.map(async (image, index) => {
        const metadata = {
          contentType: image.mimetype,
        };
        const storageRef = ref(storage, `/images/${req.body.id}-${uuid.v1()}`);
        await uploadBytes(storageRef, image.buffer, metadata).then(
          (snapshot) => {
            console.log("Uploaded a blob or file! ", snapshot);
          }
        );
        await getDownloadURL(storageRef)
          .then((url) => {
            return editProduct.Image.push(url);
          })
          .catch((error) => console.log("Error: ", error));
      })
    );
  }

  try {
    const getFirmByProduct = await firmsModel.findOne({
      Products: editProduct._id,
    });

    const getCategoriesByProduct = await categoriesModel.find({
      Products: editProduct._id,
    });

    const newCategories = getCategoriesByProduct.map((category) => {
      return category._id.toString();
    });

    const newProduct = await productsModel.findByIdAndUpdate(
      editProduct._id,
      editProduct,
      async (err, product) => {
        if (getFirmByProduct._id.toString() !== editProduct.Firm_ID) {
          firmsModel.findByIdAndUpdate(
            getFirmByProduct._id,
            { $pull: { Products: editProduct._id } },
            (err, data) => {
              if (err) return err;
            }
          );
          firmsModel.findByIdAndUpdate(
            editProduct.Firm_ID,
            { $push: { Products: editProduct._id } },
            (err, data) => {
              if (err) return err;
            }
          );
        }

        await Promise.all(
          newCategories.map((cate) => {
            if (!editProduct.Category_ID.includes(cate)) {
              categoriesModel.findByIdAndUpdate(
                cate,
                {
                  $pull: { Products: editProduct._id },
                },
                (err, data) => {
                  if (err) return err;
                }
              );
            }
          })
        );

        await Promise.all(
          editProduct.Category_ID.map(async (category, index) => {
            const findCategory = await categoriesModel.findOne({
              _id: category,
            });
            if (!findCategory.Products.includes(editProduct._id)) {
              categoriesModel.findByIdAndUpdate(
                category,
                { $push: { Products: editProduct._id } },
                (err, data) => {
                  if (err) return err;
                }
              );
            }
          })
        );
        if (err) return err;
      }
    );
    res.send(newProduct);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const getProduct = await productsModel.findById(req.params.id);

    getProduct.Image.map((image, index) => {
      const fileRef = ref(storage, image);
      const desertRef = ref(storage, fileRef.fullPath);
      deleteObject(desertRef)
        .then(() => {
          console.log("Deteled Old Image");
        })
        .catch((error) => {
          console.log("Oh No");
        });
    });

    if (getProduct.Products !== null) {
      firmsModel.findByIdAndUpdate(
        getProduct.Firm_ID,
        { $pull: { Products: getProduct._id } },
        (err, data) => {
          if (err) {
            console.log("Toang");
            return err;
          }
        }
      );

      await Promise.all(
        getProduct.Category_ID.map((cate) => {
          categoriesModel.findByIdAndUpdate(
            cate,
            {
              $pull: { Products: getProduct._id },
            },
            (err, data) => {
              if (err) return err;
            }
          );
        })
      );
    }

    const result = await productsModel.deleteOne(getProduct);
    res.status(200).send(result);
  } catch (err) {
    return err;
  }
});

router.get("/searchProduct/", async (req, res) => {
  const result = await productsModel
    .find({ Name: { $regex: req.query.q, $options: "i" } })
    .exec();
  res.send(result);
});

module.exports = router;
