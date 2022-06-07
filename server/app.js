const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const app = express();
const port = 3001;
const morgan = require("morgan");
require("./src/model/connectFirebase.model");
require("dotenv").config({ path: __dirname + "/./.env" });

app.use(helmet());
app.use(cors());
morgan("tiny");
// Import Database
const connect = require("./src/model/connect.model");
// Import Routes
const categories = require("./src/routes/categories.route");
const products = require("./src/routes/products.route");
const firms = require("./src/routes/firms.route");
const areas = require("./src/routes/areas.route");
const billStatus = require("./src/routes/billStatus.route");
const provinces = require("./src/routes/provinces.route");
const districts = require("./src/routes/districts.route");
const saleCodes = require("./src/routes/saleCodes.route");
const addressStores = require("./src/routes/addressStores.route");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Connect Database
connect();

// Routes
app.use("/categories", categories);
app.use("/products", products);
app.use("/firms", firms);
app.use("/areas", areas);
app.use("/billStatus", billStatus);
app.use("/provinces", provinces);
app.use("/districts", districts);
app.use("/saleCodes", saleCodes);
app.use("/addressStores", addressStores);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
