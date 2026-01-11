'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BuktiKeaktifans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
          model: 'Users', // nama tabel, BUKAN model
          key: 'id'
        },
      },
      nama_sertif: {
        type: Sequelize.STRING
      },
      JP: {
        type: Sequelize.INTEGER
      },
      file_sertif: {
        type: Sequelize.STRING
      },
      bulan: {
        type: Sequelize.STRING
      },
      status_sertif: {
        type: Sequelize.ENUM('disetujui', 'ditolak', 'pending'),
        allowNull: false,
        defaultValue: 'pending'
      },
      catatan: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tanggal_mulai: {
        type: Sequelize.DATEONLY
      },
      tanggal_selesai: {
        type: Sequelize.DATEONLY
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BuktiKeaktifans');
  }
};