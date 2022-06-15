const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  jwt.verify(token[1], "hoanglong", (err, info) => {
    if (err) {
      res.send({ token: "Changed Token" });
    } else {
      next();
    }
  });
};

const validateTokenNoNext = (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  jwt.verify(token[1], "hoanglong", (err, info) => {
    if (err) {
      res.send({ token: "Changed Token" });
    }
  });
};

module.exports = { validateToken, validateTokenNoNext };
