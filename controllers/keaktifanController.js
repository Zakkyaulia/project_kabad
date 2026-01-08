const { BuktiKeaktifan } = require('../models');

exports.uploadBukti = async (req, res) => {
    try {
        const id_user = req.user.id; // Diambil dari middleware auth
        const { jp, bulan } = req.body;
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Tidak ada file yang diunggah" });
        }

        const uploads = req.files.map(file => ({
            id_user,
            nama_sertif: file.originalname,
            JP: jp,
            file_sertif: file.filename,
            bulan: file.fieldname.split('_')[1], // Mengambil angka bulan dari nama input
            status_sertif: 'disetujui'
        }));

        await BuktiKeaktifan.bulkCreate(uploads);
        res.status(201).json({ message: "Semua bukti berhasil disimpan" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};