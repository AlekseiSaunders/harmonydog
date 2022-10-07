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

// @desc Show User edit profile page
// @route GET /profile/edit/:id
router.get('/edit/:id', ensureAuth, userController.getUserEdit);

// @desc Submit User edit profile page
// @route PUT /profile
router.put('/:id', ensureAuth, userController.updateUser);

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

// @desc Show Dogwalking page
// @route GET /dogwalking
router.get('/dogwalking', mainController.getDogwalking);

// @desc Show AlaCarte page
// @route GET /alacarte
router.get('/alacarte', mainController.getAlaCarte);

module.exports = router;
