const db = require("../database/connection");

// cart (imgurl, name, quantity, price, user_id)
//id => user ID
const addToCart = (id) => {
  return db
    .query(
      `SELECT imgurl, name, quantity, price FROM cart WHERE user_id = ${id}`
    )
    .then((result) => {
      const cartItems = result.rows;
      return cartItems;
    });
};
module.exports = { addToCart };
