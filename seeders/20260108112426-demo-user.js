'use strict';
const bcrypt = require('bcrypt'); // Tambahkan ini

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash password sebelum dimasukkan ke database
    const hashedPassword = await bcrypt.hash('biroorganisasi', 10);

    await queryInterface.bulkInsert('Users', [
      {
        nama: 'kabad',
        NIP: null,
        password: hashedPassword, // Gunakan hasil hash
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      nama: 'kabad'
    }, {});
  }
};