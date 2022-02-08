const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login.controller');

// [GET] api/v1/login
router.post('/', loginController.login);

module.exports = router;