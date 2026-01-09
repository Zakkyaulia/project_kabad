const express = require('express');
const router = express.Router();
const multer = require('multer');
const keaktifanController = require('../controllers/keaktifanController');
const authenticate = require('../middleware/authMiddleware');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticate, upload.array('files'), keaktifanController.uploadBukti);
module.exports = router;