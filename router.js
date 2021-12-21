const express = require('express')

const router = express.Router()

const authController = require('./controllers/auth')
const storeController = require('./controllers/store')

router.get('/products', storeController.fetchProducts)

module.exports = router