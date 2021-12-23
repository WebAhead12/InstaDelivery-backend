const express = require("express");
const verifyToken = require("./controllers/verifyToken");
const authController = require("./controllers/auth");
const storeController = require("./controllers/store");

const router = express.Router();

router.get("/user/cart", verifyToken.doVerify, storeController.getCart);
router.post("/user/cart", verifyToken.doVerify, storeController.setCart);
router.get("/store/category", storeController.fetchCategory);
router.get("/store/products", storeController.fetchProducts);
router.get("/user/thisUser", verifyToken.doVerify, authController.userInfo);
router.post("/users/login", authController.login);
router.post("/users/register", authController.register);

module.exports = router;
