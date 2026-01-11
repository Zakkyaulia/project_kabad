const express = require('express');
const app = express();
const db = require('./models');
const path = require('path');
const port = 3000;

// Import Routes API
const authRoute = require('./routes/authroute');
const userRoute = require('./routes/userroute');
const keaktifanRoute = require('./routes/keaktifanRoute');

// Middleware untuk memproses JSON dan Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- KONFIGURASI VIEW ENGINE (EJS) ---
// Karena letak folder 'views' Anda ada di dalam 'public'
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'ejs');

// Menyajikan file statis (CSS, JS Client-side seperti auth.js)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTE UNTUK TAMPILAN (UI) ---
app.get('/login', (req, res) => {
    res.render('login'); // Menampilkan public/views/login.ejs
});

app.get('/register', (req, res) => {
    res.render('register'); // Menampilkan public/views/register.ejs
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Menampilkan public/views/dashboard.ejs
});

// Redirect halaman utama ke login
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/admin', (req, res) => {
    res.render('admin'); // Menampilkan public/views/admin.ejs
});

// --- ROUTE UNTUK API (LOGIKA BACKEND) ---
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/keaktifan', keaktifanRoute);

// Menjalankan Database dan Server
db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server Berhasil Dijalankan!`);
        console.log(`Akses Login di: http://localhost:${port}/login`);
    });
}).catch((err) => {
    console.error('Gagal koneksi database:', err);
});