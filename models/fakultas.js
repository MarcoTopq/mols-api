'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Fakultas = db.define('fakultas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_fakultas: {
        type: Sequelize.STRING,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    //   isDeleted: Sequelize.BOOLEAN,
}, {
    paranoid: false,
    timestamps: false,
});

Fakultas.sync();

module.exports = Fakultas;