const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route untuk manajemen user
router.put('/update/:id', userController.updateProfile);
router.delete('/delete/:id', userController.deleteAccount);

module.exports = router;