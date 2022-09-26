const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const upload = require('../middleware/multer');
const dogController = require('../controllers/dog');
const userController = require('../controllers/user');

// @desc Main landing page
// @route GET /

router.get('/registerDog', ensureAuth, dogController.getRegister);
router.post('/registerDog', upload.single('file'), dogController.createDog);
router.get('/:id', ensureAuth, dogController.getDog);
// router.get('/login', ensureGuest, authController.getLogin);
// router.post('/login', authController.postLogin);
// router.get('/logout', authController.logout);
// router.get('/register', ensureGuest, authController.getRegister);
// router.post('/register', authController.postRegister);

module.exports = router;
