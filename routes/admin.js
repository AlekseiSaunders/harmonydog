const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const upload = require('../middleware/multer');

const adminController = require('../controllers/admin');

// @desc Show Administration Dashboard page
// @route GET /admin/dashboard
router.get('/dashboard', ensureAuth, adminController.getDashboard);

// @desc Show addTip page
// @route GET /admin/addTip

router.get('/addTip', ensureAuth, adminController.getCreateTip);

// @desc Submit Tip page
// @route POST /admin/addTip

router.post(
  '/addTip',
  ensureAuth,
  upload.single('file'),
  adminController.postAddTip
);

module.exports = router;
