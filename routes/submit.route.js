const express = require('express');
const router = express.Router();

const submitController = require('../controllers/submit.controller');

// Home, search, contract
router.get('/', submitController.createSubmit);
router.post('/', submitController.createSubmit);

module.exports = router;