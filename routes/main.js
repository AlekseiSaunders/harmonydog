const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

// @desc Main landing page
// @route GET /

router.get('/', mainController.getIndex);

module.exports = router;
