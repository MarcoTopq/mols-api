'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index');
var bcrypt = require('bcrypt');
const Dosen = db.define('dosen', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nip: {
    type: Sequelize.STRING,
    // unique: true,
  },
  fakultas: {
    type: Sequelize.STRING,
  },
  user_id: {
    type: Sequelize.BIGINT,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  isDeleted: Sequelize.TINYINT,
});

Dosen.sync();


module.exports = Dosen;