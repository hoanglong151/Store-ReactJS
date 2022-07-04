const mongoose = require("mongoose");
const productsModel = require("../model/Schema/products.schema");
const categoriesModel = require("../model/Schema/categories.schema");
const firmsModel = require("../model/Schema/firms.schema");
const typeProductsModel = require("../model/Schema/typeProducts.schema");
const { storage } = require("../configs/connectFirebase.config");
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
        .skip(skipProduct)
        .limit(PAGE_SIZE);
    } else {
      products = await productsModel
        .find()
        .populate("Category_ID")
        .populate("Firm_ID");
    }

    const newProducts = Promise.all(
      products.map(async (product) => {
        const typeOfProduct = await typeProductsModel.find({
          Product: product._id,
        });
        return {
          ...product._doc,
          TypesProduct: typeOfProduct,
        };
      })
    );

    newProducts
      .then((products) => {
        productsModel.countDocuments((err, total) => {
          if (err) {
            console.log("Err: ", err);
            return err;
          }
          if (total) {
            const totalPage = Math.ceil(total / PAGE_SIZE);
            res.json({ products: products, totalPage: totalPage });
          }
        });
      })
      .catch((err) => {
        res.status(404);
      });
  } catch (Error) {
    res.json("Toang", Error);
  }
};

const addProduct = async (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const typesProduct = JSON.parse(req.body.typesProduct);

  const product = {
    _id: id,
    Image: [],
    Name: req.body.name,
    Description: req.body.description,
    Category_ID: req.body.category_Id.split(","),
    Firm_ID: req.body.firm_Id,
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

    typesProduct.map(async (type) => {
      const idType = new mongoose.Types.ObjectId().toString();
      const newType = {
        _id: idType,
        ...type,
        Product: id,
      };
      return await typeProductsModel.create(newType);
    });

    const newProduct = await productsModel.create(product);

    res.json(newProduct);
  } catch (err) {
    console.log("Err: ", err);
    res.json(err);
  }
};

const editProduct = async (req, res) => {
  const typesProduct = JSON.parse(req.body.typesProduct);
  const editProduct = {
    _id: req.body.id,
    Image: req.files.length === 0 ? req.body.images.split(",") : [],
    Name: req.body.name,
    Description: req.body.description,
    Category_ID: req.body.category_Id.split(","),
    Firm_ID: req.body.firm_Id,
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
    const getTypesOfProduct = await typeProductsModel.find({
      Product: req.body.id,
    });

    const convertIDType = getTypesOfProduct.map((type) => {
      return type._id.toString();
    });

    const convertTypeProduct = typesProduct.map((type) => {
      if (type._id && type.Product) {
        return type._id;
      } else {
        return "";
      }
    });
    await Promise.all(
      convertIDType.map((type) => {
        if (!convertTypeProduct.includes(type)) {
          typeProductsModel.findByIdAndRemove(type, (err, data) => {
            if (err) return err;
          });
        }
      })
    );

    await Promise.all(
      typesProduct.map(async (type, index) => {
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
          typeProductsModel.create(typePro);
        }
      })
    );
    const newProduct = await productsModel.findByIdAndUpdate(
      editProduct._id,
      editProduct
    );
    res.json(newProduct);
  } catch (err) {
    res.json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const typeByProduct = await typeProductsModel.find({
      Product: req.params.id,
    });
    typeByProduct.map((type) => {
      typeProductsModel.findByIdAndDelete(type._id, (err, data) => {
        if (err) return err;
      });
    });

    const result = await productsModel.findByIdAndDelete(
      req.params.id,
      (err, data) => {
        if (err) return err;
        data.Image.map((image, index) => {
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
      }
    );
    res.status(200).json(result);
  } catch (err) {
    return err;
  }
};

const searchProduct = async (req, res) => {
  const result = await productsModel
    .find()
    .populate("Category_ID")
    .populate("Firm_ID")
    .exec();
  const data = result.filter((value) => {
    const removeUnicodeName = replaceUnicode(value.Name.toLowerCase());
    const removeUnicodeSearch = replaceUnicode(req.query.q.toLowerCase());
    const name = removeUnicodeName.split(" ");
    const search = removeUnicodeSearch.split(" ");
    const contains = search.every((input) => {
      return name.includes(input);
    });
    if (contains) {
      return value;
    } else {
      return removeUnicodeName.toLowerCase().includes(removeUnicodeSearch);
    }
  });
  const totalPage = Math.ceil(data.length / parseInt(req.query.size));
  res.send({ data: data, totalPage: totalPage });
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
