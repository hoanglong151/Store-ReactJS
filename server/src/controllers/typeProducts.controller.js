const typeProductsModel = require("../model/Schema/typeProducts.schema");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

const getTypeProducts = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let typeProducts;
  const skipProduct = page * PAGE_SIZE - PAGE_SIZE;
  try {
    if (page) {
      typeProducts = await typeProductsModel
        .find()
        .populate("Product")
        .populate({
          path: "Product",
          populate: {
            path: "TypesProduct",
            model: "typeProducts",
          },
        })
        .skip(skipProduct)
        .limit(PAGE_SIZE);
    } else {
      typeProducts = await typeProductsModel
        .find()
        .populate("Product")
        .populate({
          path: "Product",
          populate: {
            path: "TypesProduct",
            model: "typeProducts",
          },
        });
    }
    typeProductsModel.countDocuments((err, total) => {
      if (err) {
        console.log("Err: ", err);
        return err;
      }
      if (total) {
        const totalPage = Math.ceil(total / PAGE_SIZE);
        res.send({ typeProducts: typeProducts, totalPage: totalPage });
      }
    });
  } catch (Error) {
    res.send("Toang", Error);
  }
};

const searchTypeProducts = async (req, res) => {
  const result = await typeProductsModel
    .find()
    .populate("Product")
    .populate({
      path: "Product",
      populate: {
        path: "TypesProduct",
        model: "typeProducts",
      },
    });
  const data = result.filter((value) => {
    const removeUnicodeName = replaceUnicode(value.Product.Name.toLowerCase());
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

module.exports = { getTypeProducts, searchTypeProducts };
