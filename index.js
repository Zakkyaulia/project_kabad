const express = require('express');
const app = express();
const port = 3000;

// Import Routes
const authRoute = require('./routes/authroute');
const userRoute = require('./routes/userroute'); // Import route user yang baru

// Middleware untuk memproses JSON dan URL-encoded body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing Utama
app.get('/', (req, res) => {
    res.send('API Project Kabad Running...');
});

// Endpoint untuk Autentikasi (Register & Login)
app.use('/auth', authRoute);

// Endpoint untuk Manajemen User (Update Profil & Hapus Akun)
app.use('/user', userRoute);

// Error Handling Middleware (Opsional tapi disarankan)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Terjadi kesalahan pada server',
        error: err.message
    });
});

// Menjalankan Server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});