'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index');
var bcrypt = require('bcrypt');
const Mahasiswa = db.define('mahasiswas', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nim: {
    type: Sequelize.STRING,
    // unique: true,
  },
  user_id: {
    type: Sequelize.BIGINT,
    // primaryKey: true,
    // autoIncrement: true,
  },
  prodi: {
    type: Sequelize.STRING,
  },
  angkatan: {
    type: Sequelize.STRING,
  },
  kelas: {
    type: Sequelize.STRING,
  },
  fakultas: {
    type: Sequelize.STRING,
  },
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
  // isDeleted: Sequelize.TINYINT,
});

Mahasiswa.sync();


module.exports = Mahasiswa;