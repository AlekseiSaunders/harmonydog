const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const mainController = require('../controllers/main');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

// @desc Show Main landing page
// @route GET /
router.get('/', mainController.getIndex);

// @desc Show User profile page
// @route GET /profile
router.get('/profile', ensureAuth, userController.getProfile);

// @desc Show User Login page
// @route GET /login
router.get('/login', ensureGuest, authController.getLogin);

// @desc Submit Login user
// @route POST /login
router.post('/login', authController.postLogin);

// @desc Sumbit logout request
// @route GET /logout
router.get('/logout', authController.logout);

// @desc Show User Registration page
// @route GET /register
router.get('/register', ensureGuest, authController.getRegister);

// @desc Submit User Registration
// @route POST /register
router.post('/register', authController.postRegister);

// @desc Show About page
// @route GET /about
router.get('/about', mainController.getAbout);

// @desc Show Services page
// @route GET /services
router.get('/services', mainController.getServices);

module.exports = router;
