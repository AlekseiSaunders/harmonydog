const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const mainController = require('../controllers/main');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

// @desc Main landing page
// @route GET /

router.get('/', mainController.getIndex);
router.get('/profile', ensureAuth, userController.getProfile);
router.get('/login', ensureGuest, authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/register', ensureGuest, authController.getRegister);
router.post('/register', authController.postRegister);


module.exports = router;
