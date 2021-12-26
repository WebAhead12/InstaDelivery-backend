const model = require("../model/shopping");
const utils = require("../utils/utilities");

//after checking that the user is logged in, send the cart items to frontend.
const getCart = (req, res) => {
  const id = req.id;
  model
    .getUsersCart(id)
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

//check use is logged in, then update the user's cart.
const setCart = (req, res) => {
  const id = req.id;
  const items = req.body;
  model
    .emptyCart(id)
    .then(() => model.updateCart(id, items))
    .then(() => res.status(200).send({ response: "Successful", error: "" }))
    .catch((err) => {
      console.error(err);
      res.status(501).send({
        error:
          "DB server lacks the ability to fulfill the request. | " +
          err.message,
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

const setOrder = (req, res) => {
  const id = req.id;
  const checkOutData = req.body;
  //utils.totalPrice(items);
  model //trick prettier
    .insertAddress(id, checkOutData)
    .then((res) => (req.addressID = res.id))
    .then(() => model.getUsersCart(id))
    .then((items) => (req.items = items))
    .then(() => model.insertOrderSummary(req.addressID, req.items))
    .then(() =>
      res.status(200).send({
        response: "Successful",
        error: "",
      })
    )
    .catch((err) => {
      console.error(err);
      res.send({ error: "Failed to insert data into db | " + err.message });
    });
};

module.exports = {
  fetchProducts,
  getCart,
  setCart,
  fetchCategory,
  setOrder,
};
