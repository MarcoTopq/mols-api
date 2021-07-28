'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Kelas = db.define('kelas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    kelas: {
        type: Sequelize.STRING,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    //   isDeleted: Sequelize.BOOLEAN,
}, {
    paranoid: false,
    timestamps: false,
});

Kelas.sync();

module.exports = Kelas;