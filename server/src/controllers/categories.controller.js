const mongoose = require("mongoose");
const categoriesModel = require("../model/Schema/categories.schema");
const productsModel = require("../model/Schema/products.schema");
const { storage } = require("../configs/connectFirebase.config");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const uuid = require("uuid");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

const getCategories = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let categories;
  const skipCategories = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    categories = await categoriesModel
      .find()
      .skip(skipCategories)
      .limit(PAGE_SIZE);
  } else {
    categories = await categoriesModel.find();
  }

  categoriesModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.json({ categories: categories, totalPage: totalPage });
    }
  });
};

const addCategory = async (req, res) => {
  const checkExistCategory = await categoriesModel.findOne({
    Name: req.body.name,
  });
  if (checkExistCategory) {
    res.json({ Exist: "Danh Mục Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
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

    categoriesModel.create(category, (err, cate) => {
      if (err) {
        console.log("LỖI: ", err);
        return err;
      }
      res.json(cate);
    });
  }
};

const deleteCategory = async (req, res) => {
  const result = await productsModel.find().exec();
  const filterCategoryExistInProduct = result
    .map((product) => {
      const cateExistInProduct = product.Category_ID.find((cate) => {
        return cate.toString() === req.params.id;
      });
      return cateExistInProduct;
    })
    .filter((item) => item !== undefined);
  if (filterCategoryExistInProduct.length === 0) {
    categoriesModel.findByIdAndDelete(req.params.id, (err, cate) => {
      res.json(cate);
    });
  } else {
    res.json({ Exist: "Danh Mục Đang Được Sử Dụng. Không Thể Xóa" });
  }
};

const editCategory = async (req, res) => {
  const checkExistCategory = await categoriesModel.findOne({
    Name: req.body.name,
  });
  if (
    checkExistCategory &&
    checkExistCategory._id.toString() !== req.params.id
  ) {
    res.json({ Exist: "Danh Mục Tồn Tại. Vui Lòng Kiểm Tra Lại" });
  } else {
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
      res.json(cate);
    });
  }
};

const searchCategory = async (req, res) => {
  const result = await categoriesModel.find().exec();
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
  res.json({ data: data, totalPage: totalPage });
};

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
  searchCategory,
};
