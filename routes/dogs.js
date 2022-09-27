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
router.get('/edit/:id', ensureAuth, dogController.editDog);
router.put('/:id', ensureAuth, upload.single('file'), dogController.updateDog);
router.delete('/delete/:id', ensureAuth, dogController.deleteDog);
// router.get('/register', ensureGuest, authController.getRegister);
// router.post('/register', authController.postRegister);

module.exports = router;
