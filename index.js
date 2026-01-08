const express = require('express');
const app = express();
const db = require('./models'); // Mengimpor koneksi database
const port = 3000;

// Import Routes
const authRoute = require('./routes/authroute'); // Mengarah ke routes/authroute.js
// const userRoute = require('./routes/userroute'); // Pastikan file ini sudah dibuat jika ingin diaktifkan

// Middleware untuk memproses JSON dan URL-encoded body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk melayani file statis (HTML, CSS, JS frontend) dari folder 'public'
app.use(express.static('public'));

// Endpoint untuk Autentikasi (Register & Login)
// Prefix disesuaikan menjadi /api/auth agar konsisten dengan file login.html sebelumnya
app.use('/api/auth', authRoute);

// Endpoint untuk Manajemen User (Jika file routes/userroute.js sudah ada)
// app.use('/user', userRoute);

// Routing Utama (Opsional, jika ingin ada respon di root '/')
app.get('/status', (req, res) => {
    res.send('API Project Kabad Running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Terjadi kesalahan pada server',
        error: err.message
    });
});

// Menjalankan Server setelah sinkronisasi database
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server berjalan di http://localhost:${port}`);
        console.log(`Buka tampilan login di: http://localhost:${port}/login.html`);
    });
}).catch(err => {
    console.error('Gagal sinkronisasi database:', err);
});