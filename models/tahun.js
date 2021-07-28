'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Tahun = db.define('tahun', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tahun: {
        type: Sequelize.STRING,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    //   isDeleted: Sequelize.BOOLEAN,
}, {
    paranoid: false,
    timestamps: false,
});

Tahun.sync();

module.exports = Tahun;