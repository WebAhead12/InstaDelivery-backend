const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.JWT_SECRET;

const doVerify = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      const id = jwt.verify(req.token, SECRET).user;
      req.id = id;
      next();
    } catch (err) {
      const error = new Error("Invalid Token");
      res.status(401);
      next(error);
    }
  } else {
    res.status(401).send({ error: "no token, no access" });
  }
};
module.exports = { doVerify };
