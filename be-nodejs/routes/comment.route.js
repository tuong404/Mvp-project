const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');

// Home, search, contract
router.get('/', commentController.createComment);
// router.post('/', commentController.createComment);

module.exports = router;