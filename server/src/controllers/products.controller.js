const mongoose = require("mongoose");
const productsModel = require("../model/Schema/products.schema");
const categoriesModel = require("../model/Schema/categories.schema");
const firmsModel = require("../model/Schema/firms.schema");
const typeProducts = require("../model/Schema/typeProducts.schema");
const { storage } = require("../model/connectFirebase.model");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const uuid = require("uuid");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

const getProducts = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let products;
  const skipProduct = page * PAGE_SIZE - PAGE_SIZE;
  try {
    if (page) {
      products = await productsModel
        .find()
        .populate("Category_ID")
        .populate("Firm_ID")
        .populate("TypesProduct")
        .skip(skipProduct)
        .limit(PAGE_SIZE);
    } else {
      products = await productsModel
        .find()
        .populate("Category_ID")
        .populate("Firm_ID")
        .populate("TypesProduct");
    }
    productsModel.countDocuments((err, total) => {
      if (err) {
        console.log("Err: ", err);
        return err;
      }
      if (total) {
        const totalPage = Math.ceil(total / PAGE_SIZE);
        res.send({ products: products, totalPage: totalPage });
      }
    });
  } catch (Error) {
    res.send("Toang", Error);
  }
};

const addProduct = async (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();

  const product = {
    _id: id,
    Image: [],
    Name: req.body.name,
    Description: req.body.description,
    Category_ID: req.body.category_Id.split(","),
    Firm_ID: req.body.firm_Id,
    TypesProduct: [],
    CreateDate: new Date(req.body.createDate),
    UpdateDate: "",
  };

  const types = JSON.parse(req.body.typesProduct);

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

    firmsModel.findByIdAndUpdate(
      product.Firm_ID,
      { $push: { Products: product._id } },
      (err, firm) => {
        if (err) return err;
      }
    );

    await Promise.all(
      types.map(async (type) => {
        const idType = new mongoose.Types.ObjectId().toString();
        const typePro = {
          _id: idType,
          Name: type.Name,
          Color: type.Color,
          Price: type.Price,
          Sale: type.Sale,
          Amount: type.Amount,
          Sold: type.Sold,
          Product: id,
        };
        product.TypesProduct.push(idType);
        typeProducts.create(typePro);
      })
    );

    const newProduct = await productsModel.create(product);

    res.send(newProduct);
  } catch (err) {
    console.log("Err: ", err);
    res.send(err);
  }
};

const editProduct = async (req, res) => {
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

    const getProduct = await typeProducts.find({
      Product: mongoose.Types.ObjectId(req.body.id),
    });

    const convertIDType = getProduct.map((product) => {
      return product._id.toString();
    });

    const convertTypeProduct = editProduct.TypesProduct.map((type) => {
      if (type._id && type.Product) {
        return type._id;
      } else {
        return "";
      }
    });
    await Promise.all(
      convertIDType.map((type) => {
        if (!convertTypeProduct.includes(type)) {
          typeProducts.findByIdAndRemove(type, (err, data) => {
            if (err) return err;
          });
        }
      })
    );

    await Promise.all(
      editProduct.TypesProduct.map(async (type, index) => {
        if (!type._id && !type.Product) {
          const idType = new mongoose.Types.ObjectId().toString();
          const typePro = {
            _id: idType,
            Name: type.Name,
            Color: type.Color,
            Price: type.Price,
            Sale: type.Sale,
            Amount: type.Amount,
            Sold: type.Sold,
            Product: req.body.id,
          };
          editProduct.TypesProduct.splice(index, 1, typePro);
          typeProducts.create(typePro);
        }
      })
    );

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
};

const deleteProduct = async (req, res) => {
  try {
    const getProduct = await productsModel.findById(req.params.id);

    const typeByProduct = await typeProducts.find({ Product: req.params.id });
    typeByProduct.map((type) => {
      typeProducts.findByIdAndDelete(type._id, (err, data) => {
        if (err) return err;
      });
    });

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
};

const searchProduct = async (req, res) => {
  const result = await productsModel
    .find()
    .populate("Category_ID")
    .populate("Firm_ID")
    .populate("TypesProduct")
    .exec();
  const data = result.filter((value) => {
    const removeUnicodeNameProduct = replaceUnicode(value.Name.toLowerCase());
    const removeUnicodeSearch = replaceUnicode(req.query.q.toLowerCase());
    const nameProduct = removeUnicodeNameProduct.split(" ");
    const searchProduct = removeUnicodeSearch.split(" ");
    const containsProduct = searchProduct.every((input) => {
      return nameProduct.includes(input);
    });
    if (containsProduct) {
      return value;
    }
  });
  res.send(data);
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
