const billsModel = require("../model/bills.model");
const detailBillsModel = require("../model/detailBills.model");
const typeProductsModel = require("../model/typeProducts.model");
const mongoose = require("mongoose");
const replaceUnicode = require("../middlewares/replaceUnicode.middleware");

const findBill = (req, res) => {
  if (req.body.phone !== "" && req.body.billID !== "") {
    billsModel.findOne({ Phone: req.body.phone }, async (err, result) => {
      const getBill = await detailBillsModel.findById(req.body.billID);
      if (getBill === undefined) {
        res.json({
          Invalid:
            "Quý khách cung cấp thông tin chưa chính xác, vui lòng kiểm tra lại!",
        });
      } else {
        res.json({
          Name: result.Name,
          Phone: result.Phone,
          Email: result.Email,
          Bill: getBill,
        });
      }
    });
  } else {
    res.json({
      Invalid: "Quý khách vui lòng cung cấp đầy đủ thông tin",
    });
  }
};

const paymentBill = async (req, res) => {
  const id = new mongoose.Types.ObjectId().toString();
  const bill = {
    _id: id,
    Name: req.body.name,
    Phone: req.body.phone,
    Email: req.body.email,
  };

  const BillID = new mongoose.Types.ObjectId().toString();
  const detailBill = {
    _id: BillID,
    ShipPayment: req.body.shipPayment,
    Areas: req.body.area,
    Provinces: req.body.province,
    Districts: req.body.district,
    Other: req.body.other,
    Cart: req.body.cart,
    BillStatus: req.body.billStatus,
  };

  if (req.body.address !== "") {
    detailBill.Address = req.body.address;
  } else {
    detailBill.AddressStores = req.body.addressStore;
  }

  const checkAmountProduct = await Promise.all(
    req.body.cart.cartProducts.map(async (product) => {
      const getTypeProduct = await typeProductsModel.findById(
        product.TypeProductID
      );
      const amount = getTypeProduct.Amount;
      getTypeProduct.Amount -= product.NumberProduct;
      if (getTypeProduct.Amount < 0) {
        return {
          result: -1,
          product: product.Name,
          amount: amount,
        };
      } else {
        return {
          result: 1,
        };
      }
    })
  );

  const result = checkAmountProduct.find((sold) => sold.result === -1);
  if (result) {
    res.json({
      Product: `${result.product}`,
      Amount: `Hiện tại chỉ còn ${result.amount} sản phẩm. Bạn có thể đặt ${result.amount} sản phẩm. Mong bạn thông cảm vì sự bất tiện này!`,
    });
  } else {
    req.body.cart.cartProducts.map(async (product) => {
      const getTypeProduct = await typeProductsModel.findById(
        product.TypeProductID
      );
      getTypeProduct.Sold += product.NumberProduct;
      typeProductsModel.findByIdAndUpdate(
        getTypeProduct._id,
        getTypeProduct,
        (err, data) => {
          if (err) {
            console.log("Update Type Product: ", err);
          }
        }
      );
    });

    const checkCustomer = await billsModel.findOne({
      Name: req.body.name,
      Phone: req.body.phone,
    });

    if (checkCustomer) {
      detailBill.BillID = checkCustomer._id;
      detailBillsModel.create(detailBill, (err, data) => {
        if (err) return err;
        return res.json(data);
      });
    } else {
      detailBill.BillID = id;
      await detailBillsModel.create(detailBill);
      billsModel.create(bill, (err, data) => {
        if (err) return err;
        return res.json(data);
      });
    }
  }
};

const getBills = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req?.query.page);
  let bills;
  const skipBills = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    bills = await billsModel.find().skip(skipBills).limit(PAGE_SIZE);
  } else {
    bills = await billsModel.find();
  }

  const detailBills = await detailBillsModel
    .find()
    .populate("Areas")
    .populate("Provinces")
    .populate("Districts")
    .populate("AddressStores")
    .lean();

  const getAllDetailByBills = bills.map((bill) => {
    const getDetailBill = detailBills.filter((item) => {
      return item.BillID.toString() === bill._id.toString();
    });
    return {
      _id: bill._id,
      Name: bill.Name,
      Phone: bill.Phone,
      Email: bill.Email,
      CreateAt: bill.createdAt,
      DetailBills: getDetailBill,
    };
  });

  billsModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.json({ bills: getAllDetailByBills, totalPage: totalPage });
    }
  });
};

const searchBill = async (req, res) => {
  const result = await billsModel.find().exec();
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

  const detailBills = await detailBillsModel.find();

  const getAllDetailByBills = data.map((bill) => {
    const getDetailBill = detailBills.filter((item) => {
      return item.BillID.toString() === bill._id.toString();
    });
    return {
      _id: bill._id,
      Name: bill.Name,
      Phone: bill.Phone,
      Email: bill.Email,
      CreateAt: bill.CreateAt,
      DetailBills: getDetailBill,
    };
  });

  const totalPage = Math.ceil(data.length / parseInt(req.query.size));
  res.json({ data: getAllDetailByBills, totalPage: totalPage });
};

module.exports = {
  findBill,
  paymentBill,
  getBills,
  searchBill,
};
