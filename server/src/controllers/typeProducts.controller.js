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
        .skip(skipProduct)
        .limit(PAGE_SIZE);
    } else {
      typeProducts = await typeProductsModel.find().populate("Product");
    }

    const allProductByTypes = typeProducts.map((type) => {
      const getTypesOfProduct = typeProducts.filter(
        (item) => item.Product._id === type.Product._id
      );
      return {
        _id: type._id,
        Type: type.Name,
        Color: type.Color,
        Price: type.Price,
        Sale: type.Sale,
        Amount: type.Amount,
        Sold: type.Sold,
        ID_Product: type.Product._id,
        Name: type.Product.Name,
        Images: type.Images,
        Description: type.Product.Description,
        Category_ID: type.Product.Category_ID,
        Firm_ID: type.Product.Firm_ID,
        CreateAt: type.createdAt,
        TypesProduct: getTypesOfProduct,
      };
    });
    typeProductsModel.countDocuments((err, total) => {
      if (err) {
        console.log("Err: ", err);
        return err;
      }
      if (total) {
        const totalPage = Math.ceil(total / PAGE_SIZE);
        res.json({ typeProducts: allProductByTypes, totalPage: totalPage });
      }
    });
  } catch (Error) {
    res.json("Toang", Error);
  }
};

const searchTypeProducts = async (req, res) => {
  const result = await typeProductsModel.find().populate("Product");
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
