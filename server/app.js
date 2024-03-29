const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { createServer } = require("http");
require("dotenv").config({ path: __dirname + "\\.env" });
const app = express();
const port = process.env.PORT || 3001;
const morgan = require("morgan");
app.use(helmet());
app.use(cors());
const httpServer = createServer(app);
morgan("tiny");

// Import Database
const connect = require("./src/configs/connect.config");
require("./src/configs/connectFirebase.config");
const connectSocket = require("./src/configs/socketIO.config");
// Import Routes
const categories = require("./src/routes/categories.route");
const products = require("./src/routes/products.route");
const typeProducts = require("./src/routes/typeProducts.route");
const firms = require("./src/routes/firms.route");
const areas = require("./src/routes/areas.route");
const billStatus = require("./src/routes/billStatus.route");
const provinces = require("./src/routes/provinces.route");
const districts = require("./src/routes/districts.route");
const saleCodes = require("./src/routes/saleCodes.route");
const addressStores = require("./src/routes/addressStores.route");
const bills = require("./src/routes/bills.route");
const detailBills = require("./src/routes/detailBills.route");
const authentication = require("./src/routes/authentication.route");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Connect Database
connect();
connectSocket(httpServer);

// Routes
app.use("/categories", categories);
app.use("/products", products);
app.use("/typeProducts", typeProducts);
app.use("/firms", firms);
app.use("/areas", areas);
app.use("/billStatus", billStatus);
app.use("/provinces", provinces);
app.use("/districts", districts);
app.use("/saleCodes", saleCodes);
app.use("/addressStores", addressStores);
app.use("/bills", bills);
app.use("/detailBills", detailBills);
app.use("/auth", authentication);

app.get("/", (req, res) => {
  res.send("Hello World");
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
