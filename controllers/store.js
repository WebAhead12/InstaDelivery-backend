const model = require("../model/shopping");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

//after checking that the user is logged in, send the cart data to frontend.
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

//get the categries and send it to frontend.
const fetchCategory = (req, res) => {
  model
    .category()
    .then((allCategories) => {
      res.status(200).send({ categories: allCategories, error: "" });
      return;
    })
    .catch((error) => {
      console.error(error);
      res.send({
        error: "Something went wrong with the categories | " + error.message,
      });
    });
};

//get all the categories and the products, filter them to match and send all the store data to frontend.
const fetchProducts = (req, res) => {
  let store = [];
  model
    .category()
    .then((categories) => {
      model
        .allProducts()
        .then((products) => {
          for (let category of categories) {
            store.push({
              category: category.name,
              products: products.filter(
                (items) => items.category_id === category.id
              ),
            });
          }
          res.status(200).send({ store: store, error: "" });
        })
        .catch((err) => {
          console.error(err);
          res.send({
            error: "Couldn't get products from the database| " + err.message,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.send({
        error: "something wrong with the categories | " + err.message,
      });
    });
};

module.exports = {
  fetchProducts,
  fetchCart,
  fetchCategory,
};
