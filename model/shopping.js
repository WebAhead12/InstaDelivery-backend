const db = require("../database/connection");

//id => user ID, get the cart table of specific user from db
const addToCart = (id) => {
  return db
    .query(
      `SELECT imgurl, name, quantity, price FROM cart WHERE user_id = ${id}`
    )
    .then((result) => {
      const cartItems = result.rows;
      console.log(result);
      return cartItems;
    });
};

//create a function that brings all the categories from the store and
const category = () => {
  return db.query(`SELECT * FROM store`).then((results) => {
    const categoryItems = results.rows;
    return categoryItems;
  });
};

module.exports = { addToCart, category };
