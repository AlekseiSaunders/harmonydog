const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const upload = require('../middleware/multer');

const adminController = require('../controllers/admin');

router.get('/dashboard', ensureAuth, adminController.getDashboard);

module.exports = router;
