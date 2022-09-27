const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const adminController = require('../controllers/admin');

// @desc Show Administration Dashboard page
// @route GET /admin/dashboard
router.get('/dashboard', ensureAuth, adminController.getDashboard);

module.exports = router;
