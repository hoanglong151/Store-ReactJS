const typeProductsModel = require("../model/Schema/typeProducts.schema");

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

module.exports = { getTypeProducts };
