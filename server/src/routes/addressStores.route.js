const express = require("express");
const { validateToken } = require("../middlewares/validationToken.middleware");
const {
  getAddressStores,
  addAddressStore,
  editAddressStore,
  deleteAddressStore,
  searchAddressStore,
} = require("../controllers/addressStores.controller");

const router = express.Router();

router.get("/", getAddressStores);

router.post("/addAddressStore", validateToken, addAddressStore);

router.patch("/editAddressStore/:id", validateToken, editAddressStore);

router.delete("/deleteAddressStore/:id", validateToken, deleteAddressStore);

router.get("/searchAddressStore", searchAddressStore);

module.exports = router;
