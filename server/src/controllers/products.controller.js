const mongoose = require("mongoose");
const productsModel = require("../model/products.model");
const typeProductsModel = require("../model/typeProducts.model");
const detailBillsModel = require("../model/detailBills.model");
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
  const checkExistProduct = await productsModel.findOne({
    Name: req.body.name,
    Firm_ID: new mongoose.Types.ObjectId(req.body.firm_Id),
  });
  if (checkExistProduct) {
    res.json({ Exist: "Sản Phẩm Này Đã Tồn Tại Trong Danh Sách Sản Phẩm" });
  } else {
    const id = new mongoose.Types.ObjectId().toString();
    const typesProduct = JSON.parse(req.body.typesProduct);
    const newTypesProduct = typesProduct.map((type, index) => {
      const data = req.files.filter((file) => {
        return file.fieldname === `typeImage${index}`;
      });
      type.Images = data;
      return type;
    });

    const product = {
      _id: id,
      Name: req.body.name,
      Description: req.body.description,
      Category_ID: req.body.category_Id.split(","),
      Firm_ID: req.body.firm_Id,
    };
    try {
      await Promise.all(
        newTypesProduct.map(async (type) => {
          const idType = new mongoose.Types.ObjectId().toString();
          const images = [];
          await Promise.all(
            type.Images.map(async (image) => {
              const metadata = {
                contentType: image.mimetype,
              };
              const storageRef = ref(storage, `/images/${id}-${uuid.v1()}`);
              await uploadBytes(storageRef, image.buffer, metadata).then(
                (snapshot) => {
                  console.log("Uploaded a blob or file! ", snapshot);
                }
              );
              await getDownloadURL(storageRef)
                .then((url) => {
                  return images.push(url);
                })
                .catch((error) => console.log("Error: ", error));
            })
          );
          const newType = {
            _id: idType,
            Color: type.Color,
            Name: type.Name,
            Price: type.Price,
            Sale: type.Sale,
            Amount: type.Amount,
            Images: images,
            Sold: type.Sold,
            Product: id,
          };
          return await typeProductsModel.create(newType);
        })
      );
      const newProduct = await productsModel.create(product);
      res.json(newProduct);
    } catch (err) {
      console.log("Err: ", err);
      res.json(err);
    }
  }
};

const editProduct = async (req, res) => {
  const checkExistProduct = await productsModel.findOne({
    Name: req.body.name,
    Firm_ID: new mongoose.Types.ObjectId(req.body.firm_Id),
  });
  if (checkExistProduct && checkExistProduct._id.toString() !== req.body.id) {
    res.json({
      Exist: "Sản Phẩm Đã Tồn Tại Trong Hệ Thống. Vui Lòng Kiểm Tra Lại",
    });
  } else {
    const typesProduct = JSON.parse(req.body.typesProduct);
    const newTypesProduct = typesProduct.map((type, index) => {
      const data = req.files.filter((file) => {
        return file.fieldname === `typeImage${index}`;
      });
      type.Images = data;
      return type;
    });

    const editProduct = {
      _id: req.body.id,
      Name: req.body.name,
      Description: req.body.description,
      Category_ID: req.body.category_Id.split(","),
      Firm_ID: req.body.firm_Id,
    };

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

      if (req.body.imagesOld) {
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
      }

      await Promise.all(
        newTypesProduct.map(async (type, index) => {
          const images = [];
          if (!type._id && !type.Product) {
            const idType = new mongoose.Types.ObjectId().toString();
            if (req.files.length !== 0) {
              await Promise.all(
                type.Images.map(async (image, index) => {
                  const metadata = {
                    contentType: image.mimetype,
                  };
                  const storageRef = ref(
                    storage,
                    `/images/${req.body.id}-${uuid.v1()}`
                  );
                  await uploadBytes(storageRef, image.buffer, metadata).then(
                    (snapshot) => {
                      console.log("Uploaded a blob or file! ", snapshot);
                    }
                  );
                  await getDownloadURL(storageRef)
                    .then((url) => {
                      return images.push(url);
                    })
                    .catch((error) => console.log("Error: ", error));
                })
              );
            }

            const typePro = {
              _id: idType,
              Name: type.Name,
              Color: type.Color,
              Price: type.Price,
              Sale: type.Sale,
              Amount: type.Amount,
              Sold: type.Sold,
              Images: images,
              Product: req.body.id,
            };
            typeProductsModel.create(typePro);
          } else if (
            type._id &&
            type.Product &&
            typeof type.Images[0] === "object"
          ) {
            if (req.files.length !== 0) {
              await Promise.all(
                type.Images.map(async (image, index) => {
                  const metadata = {
                    contentType: image.mimetype,
                  };
                  const storageRef = ref(
                    storage,
                    `/images/${req.body.id}-${uuid.v1()}`
                  );
                  await uploadBytes(storageRef, image.buffer, metadata).then(
                    (snapshot) => {
                      console.log("Uploaded a blob or file! ", snapshot);
                    }
                  );
                  await getDownloadURL(storageRef)
                    .then((url) => {
                      return images.push(url);
                    })
                    .catch((error) => console.log("Error: ", error));
                })
              );
            }
            const updateTypePro = {
              Name: type.Name,
              Color: type.Color,
              Price: type.Price,
              Sale: type.Sale,
              Amount: type.Amount,
              Sold: type.Sold,
              Images: images,
              Product: req.body.id,
            };
            typeProductsModel.findByIdAndUpdate(
              type._id,
              updateTypePro,
              (err, data) => {
                if (err) {
                  console.log("ERR: ", err);
                  return err;
                }
              }
            );
          } else {
            const updateTypePro = {
              Name: type.Name,
              Color: type.Color,
              Price: type.Price,
              Sale: type.Sale,
              Amount: type.Amount,
              Sold: type.Sold,
              Product: req.body.id,
            };
            typeProductsModel.findByIdAndUpdate(
              type._id,
              updateTypePro,
              (err, data) => {
                if (err) {
                  console.log("ERR: ", err);
                  return err;
                }
              }
            );
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
  }
};

const deleteProduct = async (req, res) => {
  const detailBills = await detailBillsModel.find().exec();
  const productExistInBill = detailBills
    .map((detailBill) => {
      const result = detailBill.Cart.cartProducts.find((product) => {
        return product._id.toString() === req.params.id;
      });
      if (result) {
        return result;
      }
    })
    .filter((item) => item !== undefined);
  if (productExistInBill.length === 0) {
    try {
      const typeByProduct = await typeProductsModel.find({
        Product: req.params.id,
      });
      typeByProduct.map((type) => {
        type.Images.map((image, index) => {
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
        typeProductsModel.findByIdAndDelete(type._id, (err, data) => {
          if (err) return err;
        });
      });

      await productsModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) return err;
        res.status(200).json(data);
      });
    } catch (err) {
      return err;
    }
  } else {
    res.json({ Exist: "Sản Phẩm Được Tạo Trong Hóa Đơn Không Thể Xóa" });
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

  const newProducts = Promise.all(
    data.map(async (product) => {
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
          const totalPage = Math.ceil(data.length / parseInt(req.query.size));
          res.json({ data: products, totalPage: totalPage });
        }
      });
    })
    .catch((err) => {
      res.status(404);
    });
};

const uploadImage = async (req, res) => {
  const metadata = {
    contentType: req.file.mimetype,
  };
  const storageRef = ref(storage, `/description/${uuid.v1()}`);
  await uploadBytes(storageRef, req.file.buffer, metadata).then((snapshot) => {
    console.log("Uploaded a blob or file! ", snapshot);
  });
  await getDownloadURL(storageRef)
    .then((url) => {
      res.json(url);
    })
    .catch((error) => console.log("Error: ", error));
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct,
  uploadImage,
};
