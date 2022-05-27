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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
