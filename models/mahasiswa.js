'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index');
var bcrypt = require('bcrypt');
const Mahasiswa = db.define('mahasiswa', {
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
    type: Sequelize.INTEGER,
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
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  // isDeleted: Sequelize.TINYINT,
});

Mahasiswa.sync();


module.exports = Mahasiswa;