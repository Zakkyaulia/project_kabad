const express = require('express');
const router = express.Router();
const multer = require('multer');
const keaktifanController = require('../controllers/keaktifanController');
const authenticate = require('../middleware/authMiddleware');
const upload = multer({ dest: 'uploads/' });

// Menampilkan data
router.get('/', authenticate, keaktifanController.getKeaktifan);
// Upload data
router.post('/upload', authenticate, upload.array('files'), keaktifanController.uploadBukti);
// Hapus data
router.delete('/:id', authenticate, keaktifanController.deleteKeaktifan);

module.exports = router;