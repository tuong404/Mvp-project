const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const middlewareController = require('../middleware/middleware.controller');
const { body, validationResult } = require('express-validator');

// [GET] api/v1/admin-page

// login
router.get('/',middlewareController.author, adminController.showDashboard);

// Manager User
router.get('/users',middlewareController.author,  adminController.listUser);
router.get('/users/page/:p', middlewareController.author, adminController.paginateUser);
// router.get('/user/:id', adminController.showUserInfo);
router.delete('/user/:id', middlewareController.author, adminController.deleteUser);
router.get('/user/:id/update', middlewareController.author, adminController.showUpdateUser);
router.put('/user/:id', middlewareController.author, adminController.updateUser);
router.get('/user/create',middlewareController.author, adminController.createFormUser);
router.post('/user/create', middlewareController.author,
// body('name', 'Name is must have value').not().isEmpty(),
body('color', 'Color is must have value').notEmpty(),
// body('version', 'Version is must have value').not().isEmpty(),
// body('price', 'Price is must have value').not().isEmpty(),
// body('amount', 'Amount is must have value').not().isEmpty(),
// body('discount', 'discount is must have value').not().isEmpty(),
// body('system', 'System is must have value').not().isEmpty(),
// body('content', 'Content is must have value').not().isEmpty(), 
adminController.createUser);

// Manager Product
router.get('/products', middlewareController.author,  adminController.showProduct);
router.get('/products/page/:p', middlewareController.author, adminController.paginateProduct);
router.delete('/product/:id', middlewareController.author, adminController.deleteProduct);
router.get('/product/:id/update', middlewareController.author, adminController.showUpdateProduct);
router.put('/product/:id', middlewareController.author, adminController.updateProduct);
router.get('/product/create',middlewareController.author, adminController.createFormProduct);
router.post('/product/create', middlewareController.author, adminController.createProduct);


module.exports = router;