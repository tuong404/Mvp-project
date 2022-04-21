const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
// [GET] api/v1/projects
router.post('/search', productController.search);
router.get('/:slug', productController.detail);
// router.get('/:id/chart', projectController.chart);

router.get('/page/:p', productController.paginate);
// router.get('/', productController.showCategories);
router.get('/', productController.show);

module.exports = router;