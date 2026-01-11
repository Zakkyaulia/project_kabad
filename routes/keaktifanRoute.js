const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');  
const keaktifanController = require('../controllers/keaktifanController');
const authenticate = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Pastikan folder 'uploads' sudah ada
    },
    filename: function (req, file, cb) {
        // Mengambil ekstensi file asli (misal: .jpg atau .pdf)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ dest: 'uploads/' });

router.get('/', authenticate, keaktifanController.getKeaktifan);
router.post('/upload', authenticate, upload.array('files'), keaktifanController.uploadBukti);
router.delete('/:id', authenticate, keaktifanController.deleteKeaktifan);
router.get('/all', authenticate, keaktifanController.getAllKeaktifan);

module.exports = router;