'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuktiKeaktifan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BuktiKeaktifan.belongsTo(models.User, {
        foreignKey: 'id_user'
      });
    }
  }
  BuktiKeaktifan.init({
    id_user: DataTypes.INTEGER,
    nama_sertif: DataTypes.STRING,
    JP: DataTypes.INTEGER,
    file_sertif: DataTypes.STRING,
    bulan: DataTypes.STRING,
    status_sertif: DataTypes.STRING,
    catatan: DataTypes.TEXT,
    tanggal_mulai: DataTypes.DATEONLY,
    tanggal_selesai: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'BuktiKeaktifan',
  });
  return BuktiKeaktifan;
};