const express = require('express');
const router = express.Router();
const multer = require('multer');
const keaktifanController = require('../controllers/keaktifanController');
const upload = multer({ dest: 'uploads/' });

// Middleware dummy untuk cek token (sesuaikan dengan JWT Anda)
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send("Unauthorized");
    // decode jwt dan set req.user
    next();
};

router.post('/upload', authenticate, upload.any(), keaktifanController.uploadBukti);
module.exports = router;