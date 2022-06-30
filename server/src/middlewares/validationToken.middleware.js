const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  jwt.verify(token[1], "hoanglong", (err, info) => {
    if (err) {
      res.status(401).json({ token: "Changed Token" });
    } else {
      next();
    }
  });
};

const validateTokenNoNext = (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  jwt.verify(token[1], "hoanglong", (err, info) => {
    if (err) {
      res.status(401).json({ token: "Changed Token" });
    }
    res.status(200).json({ correct: "Correct" });
  });
};

module.exports = { validateToken, validateTokenNoNext };
