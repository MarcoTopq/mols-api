'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Opsi_ganda = db.define('opsi_ganda', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    opsi: {
        type: Sequelize.STRING,
    },
    huruf: {
        type: Sequelize.STRING,
    },
    soal_id: {
        type: Sequelize.BIGINT,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    paranoid: false,
    timestamps: false,
});

Opsi_ganda.sync();

module.exports = Opsi_ganda;