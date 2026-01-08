const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Pastikan authController.register dan authController.login ADA dan BERBENTUK FUNGSI
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;