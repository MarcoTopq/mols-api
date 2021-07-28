'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Nilai = db.define('m_nilai', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nilai: {
    type: Sequelize.INTEGER,
  },
  id_post: {
    type: Sequelize.INTEGER,
  },
  id_mahasiswa: {
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

Nilai.sync();

module.exports = Nilai;