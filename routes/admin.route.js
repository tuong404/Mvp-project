const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');

// [GET] api/v1/admin-page
// Manager User
router.get('/users', adminController.authentication, adminController.showUser);
router.get('/users/:id', adminController.authentication, adminController.showUserInfo);
router.post('/users/create', adminController.authentication, adminController.createUser);
router.put('/users/:id', adminController.authentication, adminController.updateUser);
router.delete('/users/:id', adminController.authentication, adminController.deleteUser);

// Manager Project
router.get('/projects', adminController.authentication, adminController.showProject);
router.post('/project/create', adminController.authentication, adminController.createProject);
router.put('/project/:id', adminController.authentication, adminController.updateProject);
router.delete('/project/:id', adminController.authentication, adminController.deleteProject);

// Manager Submit
router.get('/submissions', adminController.authentication, adminController.showSubmit);
router.get('/submissions/:id', adminController.authentication, adminController.showSubmitInfo);
router.post('/submissions/create', adminController.authentication, adminController.createSubmit);
router.put('/submissions/:id', adminController.authentication, adminController.updateSubmit);
router.delete('/submissions/:id', adminController.authentication, adminController.deleteSubmit);

module.exports = router;