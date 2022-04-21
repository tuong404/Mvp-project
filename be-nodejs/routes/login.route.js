const express = require('express');
const router = express.Router();
const passport = require('passport');

const loginController = require('../controllers/login.controller');

// [GET] api/v1/login
router.get('/register', loginController.registerForm);
router.post('/register', loginController.store);
router.get('/login', loginController.showLogin);
router.post('/login',  loginController.login);
// passport.authenticate('local.signin', { failureRedirect: '/api/v1/login' }) ,
router.get('/logout', loginController.logout);

module.exports = router;