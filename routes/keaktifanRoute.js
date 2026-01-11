const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');  
const keaktifanController = require('../controllers/keaktifanController');
const authenticate = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage }); 

router.get('/', authenticate, keaktifanController.getKeaktifan);
router.post('/upload', authenticate, upload.array('files'), keaktifanController.uploadBukti);
router.delete('/:id', authenticate, keaktifanController.deleteKeaktifan);
router.get('/all', authenticate, keaktifanController.getAllKeaktifan);
router.put('/status/:id', authenticate, keaktifanController.updateStatus);

module.exports = router;