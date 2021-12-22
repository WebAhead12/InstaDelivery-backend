const model = require("../model/shopping");
const jwt = require("jsonwebtoken");

// model.addToCart(id)

const fetchCart = (req, res) => {
  const token = req.token;
  const id = jwt.verify(token, SECRET).user; //decrypt token to get the id
  model
    .addToCart(id)
    .then((cartItems) => {
      if (!items.length) {
        res.status(200).send({ items: [] }); //0 items.
      } else {
        res.status(200).send({ items: cartItems });
      }
      return;
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
