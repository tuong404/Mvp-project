const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories.controller');

// [GET] api/v1/categories
// router.get('/', categoriesController.show);
router.get('/:slug', categoriesController.filter);

module.exports = router;