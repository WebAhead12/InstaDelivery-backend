const db = require("../database/connection");

//id => user ID, get the cart table of specific user from db
const getUsersCart = (id) => {
  return db
    .query(
      `SELECT imgurl, name, quantity, price FROM cart WHERE user_id = ${id}`
    )
    .then((result) => result.rows);
};

//create a function that brings all the categories from the store and
const category = () => {
  return db.query(`SELECT * FROM categories`).then((results) => results.rows);
};

//get productsByCategory from db.
const productsByCategory = (id) => {
  return db
    .query(`SELECT * FROM products WHERE category_id=${id}`)
    .then((results) => results.rows);
};

//get all products from db.
const allProducts = () => {
  return db.query(`SELECT * FROM products`).then((results) => results.rows);
};

//delete all items of specific user's cart.
const emptyCart = (id) => {
  return db.query(`DELETE FROM cart WHERE user_id =${id}`);
};

//insert cart items into user's cart, ask Mario.
const updateCart = (id, items) => {
  for (let i = 0; i < items.length; i++) {
    setTimeout(() => {
      const values = [
        items[i].imgurl,
        items[i].name,
        items[i].quantity,
        items[i].price,
        id,
      ];
      return db.query(
        `INSERT INTO cart(imgurl, name, quantity, price, user_id) VALUES($1, $2, $3, $4, $5)`,
        values
      );
    }, 1000 * (i + 1));
  }
};

module.exports = {
  getUsersCart,
  category,
  productsByCategory,
  allProducts,
  emptyCart,
  updateCart,
};
