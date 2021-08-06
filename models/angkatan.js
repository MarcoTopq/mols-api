'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Angkatan = db.define('angkatans', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    kelas_id: {
        type: Sequelize.INTEGER,
    },
    tahun_id: {
        type: Sequelize.INTEGER,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    //   isDeleted: Sequelize.BOOLEAN,
}, {
    paranoid: false,
    timestamps: false,
});

Angkatan.sync();

module.exports = Angkatan;