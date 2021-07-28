'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index');
var bcrypt = require('bcrypt');
const Dosen = db.define('m_dosen', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nip: {
    type: Sequelize.STRING,
    // unique: true,
  },
  nama: {
    type: Sequelize.STRING,
  },
  telepon: {
    type: Sequelize.STRING,
  },
  alamat: {
    type: Sequelize.STRING,
  },
  foto: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    // unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  isDeleted: Sequelize.TINYINT,
});

Dosen.sync();


module.exports = Dosen;