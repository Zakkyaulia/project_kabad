const { User } = require('../models');
const bcrypt = require('bcrypt');

// Fungsi Update Profil (PUT)
exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params; // ID diambil dari parameter URL
        const { nama, NIP, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        // Siapkan data yang akan diupdate
        const updatedData = { 
            nama: nama || user.nama, 
            NIP: NIP || user.NIP // Menyimpan NIP ke database
        };

        // Jika user juga ingin mengganti password
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updatedData);
        
        res.status(200).json({ 
            message: "Profil berhasil diperbarui", 
            data: { 
                id: user.id, 
                nama: user.nama, 
                NIP: user.NIP 
            } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fungsi Hapus Akun (DELETE)
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        await user.destroy(); // Menghapus user dari database
        res.status(200).json({ message: "Akun berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};