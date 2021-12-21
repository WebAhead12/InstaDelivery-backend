const express = require("express");
const verifyToken = require("./controllers/verifyToken");
const authController = require("./controllers/auth");
const storeController = require("./controllers/store");
const router = express.Router();

router.get("/products", storeController.fetchProducts);
router.get("/users/thisUser", verifyToken.doVerify, users.userInfo);
router.post("/users/login", users.login);
router.post("/users/register", users.register);

module.exports = router;
