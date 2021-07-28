'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Matkul = db.define('m_matkul', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: Sequelize.STRING,
  },
  kode: {
    type: Sequelize.STRING,
  },
  sks: {
    type: Sequelize.STRING,
  },
  semester: {
    type: Sequelize.STRING,
  },
  tahun: {
    type: Sequelize.STRING,
  },
  prodi: {
    type: Sequelize.STRING,
  },
  id_dosen: {
    type: Sequelize.INTEGER,
  },
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
  isDeleted: Sequelize.TINYINT,
  //   isDeleted: Sequelize.BOOLEAN,
}, {
  paranoid: false,
  timestamps: false,
});

Matkul.sync();

module.exports = Matkul;