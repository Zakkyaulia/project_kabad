const { BuktiKeaktifan, User } = require('../models');
const path = require('path');

// Ambil semua data bukti milik user login
exports.getKeaktifan = async (req, res) => {
    try {
        const id_user = req.user.id;
        const data = await BuktiKeaktifan.findAll({
            where: { id_user },
            order: [['createdAt', 'DESC']]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.uploadBukti = async (req, res) => {
    try {
        const id_user = req.user.id;
        const { jp, tanggal_mulai, tanggal_selesai } = req.body; 
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Tidak ada file yang diunggah" });
        }

        const uploads = req.files.map(file => ({
            id_user,
            nama_sertif: file.originalname,
            JP: jp,
            file_sertif: file.filename,
            tanggal_mulai: tanggal_mulai,
            tanggal_selesai: tanggal_selesai,
            bulan: new Date().getMonth() + 1, 
            status_sertif: 'pending',
            catatan: 'Menunggu verifikasi'
        }));

        await BuktiKeaktifan.bulkCreate(uploads);
        res.status(201).json({ message: "Semua bukti berhasil disimpan" });
    } catch (error) {
        console.error("Error Upload:", error); 
        res.status(500).json({ error: error.message });
    }
};

// Tambahkan juga fungsi delete agar button hapus berfungsi
exports.deleteKeaktifan = async (req, res) => {
    try {
        const { id } = req.params;
        await BuktiKeaktifan.destroy({ where: { id, id_user: req.user.id } });
        res.json({ message: "Data berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllKeaktifan = async (req, res) => {
    try {
        // Cek jika role bukan admin, tolak akses
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Hanya admin yang boleh mengakses" });
        }

        const data = await BuktiKeaktifan.findAll({
            include: [{ model: User, attributes: ['nama', 'NIP'] }], // Sertakan data user
            order: [['createdAt', 'DESC']]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};