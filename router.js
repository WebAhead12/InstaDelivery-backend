const express = require("express");
const verifyToken = require("./controllers/verifyToken");
const authController = require("./controllers/auth");
const storeController = require("./controllers/store");
const cartController = require("./controllers/cart");
const categoryController = require("./controllers/category")
const router = express.Router();

router.get("/products", storeController.fetchProducts);
router.get("/user/cart", verifyToken.doVerify, cartController.fetchCart);
router.get("/user/thisUser", verifyToken.doVerify, authController.userInfo);
router.get("/store/category", categoryController.fetchCategory);

router.post("/users/login", authController.login);
router.post("/users/register", authController.register);

module.exports = router;
