const express = require('express');
const app = express();
const db = require('./models');
const authRoutes = require('./routes/authroute'); // Sesuaikan nama file rute Anda

// PENTING: Middleware ini harus ada agar req.body tidak undefined
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

const PORT = 3000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});