const express = require('express');
const router = express.Router();

const siteController = require('../controllers/site.controller');
const middlewareController = require('../middleware/middleware.controller');

// Home, search, contract
router.get('/', siteController.index);
// router.post('/',siteController.logged);

module.exports = router;