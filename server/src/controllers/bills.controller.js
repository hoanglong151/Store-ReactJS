const billsModel = require("../model/Schema/bills.schema");
const typeProductsModel = require("../model/Schema/typeProducts.schema");
const mongoose = require("mongoose");

const findBill = (req, res) => {
  if (req.body.phone !== "" && req.body.billID !== "") {
    billsModel.findOne({ Phone: req.body.phone }, (err, result) => {
      const getBill = result.Bill.find(
        (bill) => bill.BillID.toString() === req.body.billID
      );
      if (getBill === undefined) {
        res.send({
          Invalid:
            "Quý khách cung cấp thông tin chưa chính xác, vui lòng kiểm tra lại!",
        });
      } else {
        res.send({
          Name: result.Name,
          Phone: result.Phone,
          Email: result.Email,
          Bill: getBill,
        });
      }
    });
  } else {
    res.send({
      Invalid: "Quý khách vui lòng cung cấp đầy đủ thông tin",
    });
  }
};

const updateBill = (req, res) => {
  billsModel.findOne({ _id: req.body.customerID }, (err, result) => {
    const getBill = result.Bill.find(
      (value) => value.BillID.toString() === req.body.billID
    );
    getBill.BillStatus._id = req.body.statusBill.value;
    getBill.BillStatus.Name = req.body.statusBill.label;

    billsModel.findByIdAndUpdate(req.body.customerID, result, (err, data) => {
      if (err) {
        console.log("LỖI: ", err);
        return err;
      }
      res.send(data);
    });
  });
};

const paymentBill = (req, res) => {
  req.body.cart.cartProducts.map((product) => {
    typeProductsModel.findById(product.TypeProductID, (err, type) => {
      const amount = type.Amount;
      type.Amount -= product.NumberProduct;
      if (type.Amount < 0) {
        res.status(200).send({
          Product: `${product.Name}`,
          Amount: `Hiện tại chỉ còn ${amount} sản phẩm. Bạn có thể đặt ${amount} sản phẩm. Mong bạn thông cảm vì sự bất tiện này!`,
        });
      } else {
        type.Sold += product.NumberProduct;
        typeProductsModel.findByIdAndUpdate(type._id, type, (err, result) => {
          if (err) {
            console.log("Update Type Product: ", err);
          }
        });

        billsModel.findOne(
          { Name: req.body.name, Phone: req.body.phone },
          async (err, data) => {
            const BillID = new mongoose.Types.ObjectId().toString();
            if (data === null) {
              const id = new mongoose.Types.ObjectId().toString();
              const bill = {
                _id: id,
                Name: req.body.name,
                Phone: req.body.phone,
                Email: req.body.email,
                Bill: [
                  {
                    BillID: BillID,
                    ShipPayment: req.body.shipPayment,
                    Areas: req.body.area,
                    Provinces: req.body.province,
                    Districts: req.body.district,
                    Other: req.body.other,
                    Cart: req.body.cart,
                    BillStatus: req.body.billStatus,
                    CreateDate: new Date(),
                  },
                ],
              };

              if (req.body.address !== "") {
                bill.Bill[0].Address = req.body.address;
              } else {
                bill.Bill[0].AddressStores = req.body.addressStore;
              }

              await billsModel.create(bill, (err, data) => {
                if (err) {
                  console.log("LỖI: ", err);
                  return err;
                }
                res.send(data);
              });
            } else {
              const bill = {
                BillID: BillID,
                ShipPayment: req.body.shipPayment,
                Areas: req.body.area,
                Provinces: req.body.province,
                Districts: req.body.district,
                Other: req.body.other,
                Cart: req.body.cart,
                BillStatus: req.body.billStatus,
                CreateDate: new Date(),
              };

              if (req.body.address !== "") {
                bill.Address = req.body.address;
              } else {
                bill.AddressStores = req.body.addressStore;
              }

              billsModel.findByIdAndUpdate(
                data._id,
                { $push: { Bill: bill } },
                (err, data) => {
                  if (err) {
                    console.log("LỖI: ", err);
                    return err;
                  }
                  res.send(data);
                }
              );
            }
          }
        );
      }
    });
  });
};

const getBills = async (req, res) => {
  const PAGE_SIZE = 10;
  const page = parseInt(req.query.page);
  let bills;
  const skipBills = page * PAGE_SIZE - PAGE_SIZE;
  if (page) {
    bills = await billsModel
      .find()
      .populate({
        path: "Bill",
        populate: {
          path: "Areas",
        },
      })
      .populate({
        path: "Bill",
        populate: {
          path: "Districts",
        },
      })
      .populate({
        path: "Bill",
        populate: {
          path: "Provinces",
        },
      })
      .populate({
        path: "Bill",
        populate: {
          path: "AddressStores",
        },
      })
      .skip(skipBills)
      .limit(PAGE_SIZE);
  } else {
    bills = await billsModel
      .find()
      .populate({
        path: "Bill",
        populate: {
          path: "Areas",
        },
      })
      .populate({
        path: "Bill",
        populate: {
          path: "Districts",
        },
      })
      .populate({
        path: "Bill",
        populate: {
          path: "Provinces",
        },
      })
      .populate({
        path: "Bill",
        populate: {
          path: "AddressStores",
        },
      });
  }

  billsModel.countDocuments((err, total) => {
    if (err) {
      console.log("Err: ", err);
      return err;
    }
    if (total) {
      const totalPage = Math.ceil(total / PAGE_SIZE);
      res.send({ bills: bills, totalPage: totalPage });
    }
  });
};

module.exports = { findBill, updateBill, paymentBill, getBills };
