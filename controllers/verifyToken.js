const doVerify = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).send({ error: "no token, no access" });
  }
};
module.exports = { doVerify };
