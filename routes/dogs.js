const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const dogController = require('../controllers/dog');
const userController = require('../controllers/user');

// @desc Show Register Dog page
// @route GET /dog/registerDog
router.get('/registerDog', ensureAuth, dogController.getRegister);

// @desc Submit Register Dog page
// @route POST /dog/registerDog
// upload allows for multer and cloudinary to upload image file
router.post('/registerDog', upload.single('file'), dogController.createDog);

// @desc Show Dog Profile page
// @route GET /dog/:id
router.get('/:id', ensureAuth, dogController.getDog);

// @desc Show Edit Dog page
// @route GET /dog/edit/:id
router.get('/edit/:id', ensureAuth, dogController.editDog);

// @desc Submit Edit Dog page
// @route PUT /dog/:id
// upload allows for multer and cloudinary to upload image file (not currently enabled for edit route)
router.put('/:id', ensureAuth, upload.single('file'), dogController.updateDog);

// @desc Delete individual Dog record
// @route DELETE /dog/delete/:id
router.delete('/delete/:id', ensureAuth, dogController.deleteDog);
// router.get('/register', ensureGuest, authController.getRegister);
// router.post('/register', authController.postRegister);

module.exports = router;
