'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index');
var bcrypt = require('bcrypt');
const Dosen = db.define('dosens', {
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
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
}, {
  timestamps: false
});

Dosen.sync();


module.exports = Dosen;