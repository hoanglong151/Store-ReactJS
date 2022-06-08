const express = require("express");
const mongoose = require("mongoose");
const billsModel = require("../model/Schema/bills.schema");

const router = express.Router();

router.post("/paymentBill", (req, res) => {
  billsModel.findOne(
    { Name: req.body.name, Phone: req.body.phone },
    async (err, data) => {
      if (data === null) {
        const id = new mongoose.Types.ObjectId().toString();
        const bill = {
          _id: id,
          Name: req.body.name,
          Phone: req.body.phone,
          Email: req.body.email,
          Bill: [
            {
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
          ShipPayment: req.body.shipPayment,
          Areas: req.body.area,
          Provinces: req.body.province,
          Districts: req.body.district,
          Other: req.body.other,
          Cart: req.body.cart,
          BillStatus: req.body.billStatus,
          CreateDate: new Date(),
        };

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
});

router.get("/", (req, res) => {
  billsModel
    .find({}, (err, data) => {
      console.log(data);
      res.send(data);
    })
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
});

module.exports = router;
