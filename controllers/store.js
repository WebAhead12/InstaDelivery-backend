const db = require("../database/connection");

const fetchProducts = (req, res) => {
  res.send([{ test: 1 }]);
};

module.exports = {
  fetchProducts,
};
