const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // Mengambil token dari header Authorization (format: "Bearer <token>")
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Akses ditolak, token tidak ditemukan" });
    }

    try {
        // 'RAHASIA' harus sama dengan secret key yang ada di authController.js
        const decoded = jwt.verify(token, 'RAHASIA'); 
        req.user = decoded; // Menyimpan data id dan role user ke req.user
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token tidak valid atau kadaluwarsa" });
    }
};

module.exports = authenticate;