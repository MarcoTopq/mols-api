'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const File = db.define('m_file', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: Sequelize.STRING,
  },
  file: {
    type: Sequelize.STRING,
  },
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE,
//   isDeleted: Sequelize.BOOLEAN,
}, {
  paranoid: false,
  timestamps: false,
});

File.sync();

module.exports = File;