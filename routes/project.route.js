const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project.controller');

// [GET] api/v1/projects
router.get('/hot-projects', projectController.hotProject);
router.get('/search', projectController.search);
router.get('/:id', projectController.detail);
router.get('/:id/chart', projectController.chart);
router.get('/:id/metric', projectController.metrics);
router.get('/:id/token-allocation', projectController.tokenAllow);
router.get('/:id/token-circulation', projectController.tokenCri);
router.get('/:id/news', projectController.news);
router.get('/:id/wallet', projectController.wallet);
router.get('/:id/exchange', projectController.exchange);
router.get('/', projectController.show);

module.exports = router;