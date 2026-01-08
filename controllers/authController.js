const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fungsi Register
exports.register = async (req, res) => {
    try {
        // Tangkap 'nip' (huruf kecil) dari frontend
        const { nama, nip, password } = req.body; 
        
        if (!nama || !password) {
            return res.status(400).json({ message: "Nama dan password harus diisi" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            nama,
            NIP: nip, // Masukkan variabel 'nip' ke kolom 'NIP' database
            password: hashedPassword,
            role: 'user'
        });
        
        res.status(201).json({ message: "Registrasi Berhasil", data: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fungsi Login (Sudah diubah ke nama dan password)
exports.login = async (req, res) => {
    try {
        const { nama, password } = req.body;
        const user = await User.findOne({ where: { nama } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, 'RAHASIA', { expiresIn: '1d' });
        // Kirim NIP dan Nama agar bisa digunakan di dashboard
        res.json({ 
            message: "Login Berhasil", 
            token, 
            role: user.role, 
            nama: user.nama, 
            nip: user.NIP 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};