const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  jwt.verify(token[1], process.env.SECRET_KEY, (err, info) => {
    if (err) {
      return res.status(401).json({ token: "Changed Token" });
    } else {
      next();
    }
  });
};

const validateTokenNoNext = (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  if (token[1] !== "null") {
    jwt.verify(token[1], process.env.SECRET_KEY, (err, info) => {
      if (err) {
        res.status(401).json({ token: "Changed Token" });
      }
      res.status(200).json({ correct: "Correct" });
    });
  } else {
    res.status(401).json({ token: "Changed Token" });
  }
};

module.exports = { validateToken, validateTokenNoNext };
