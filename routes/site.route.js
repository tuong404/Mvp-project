const express = require('express');
const router = express.Router();

const siteController = require('../controllers/site.controller');

// Home, search, contract
router.get('/', siteController.index);

module.exports = router;