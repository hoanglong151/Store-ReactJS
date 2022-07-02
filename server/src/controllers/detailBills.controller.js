const detailBillsModel = require("../model/Schema/detailBills.schema");
const billStatusModel = require("../model/Schema/billStatus.schema");
const billByStatus = async (req, res) => {
  const detailBills = await detailBillsModel.find();
  const billStatus = await billStatusModel.find();
  const billByStatus = billStatus.map((status) => {
    const filterBillByStatus = detailBills.filter((bill) => {
      return bill.BillStatus._id.toString() === status._id.toString();
    });
    return {
      _id: status._id,
      status: status.Name,
      billByStatus: filterBillByStatus,
    };
  });
  res.status(200).json({ billByStatus: billByStatus });
};

const updateBillStatus = async (req, res) => {
  const getDetailBill = await detailBillsModel.findById(req.body.billID).lean();
  const updateDetailBill = {
    ...getDetailBill,
    BillStatus: {
      _id: req.body.statusBill.value,
      Name: req.body.statusBill.label,
    },
  };
  detailBillsModel.findByIdAndUpdate(
    req.body.billID,
    updateDetailBill,
    (err, data) => {
      if (err) return err;
      res.json(data);
    }
  );
};

module.exports = { billByStatus, updateBillStatus };
