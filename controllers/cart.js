const model = require("../model/shopping");
const jwt = require("jsonwebtoken");
const { decode } = require("iconv-lite");

const SECRET = process.env.JWT_SECRET;

const fetchCart = (req, res) => {
  const token = req.token;

  const id = jwt.verify(token, SECRET, (error, decoded) => {
    if (!error) {
      return decoded.user;
    } else {
      res.send({ error: "Expired Token" });
      return;
    }
  }); //decrypt token to get the id
  model
    .addToCart(id)
    .then((cartItems) => {
      res.status(200).send({ items: cartItems, error: "" });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        error: "Something went wrong with the cart items | " + error.message,
      });
    });
};

module.exports = {
  fetchCart,
};
