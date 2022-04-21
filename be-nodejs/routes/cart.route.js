const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

// Cart

router.get('/add/:slug',  cartController.addToCart);
router.get('/update/:slug',  cartController.update);
router.get('/clear',  cartController.clear);
router.get('/buynow',  cartController.buyNow);
router.get('/', cartController.index);

module.exports = router;