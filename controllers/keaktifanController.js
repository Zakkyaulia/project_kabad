const { BuktiKeaktifan } = require('../models');

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
            status_sertif: 'disetujui'
        }));

        await BuktiKeaktifan.bulkCreate(uploads);
        res.status(201).json({ message: "Semua bukti berhasil disimpan" });
    } catch (error) {
        console.error("Error Upload:", error); 
        res.status(500).json({ error: error.message });
    }
};