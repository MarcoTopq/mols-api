'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Prodi = db.define('prodis', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    prodi: {
        type: Sequelize.STRING,
    },
    kode: {
        type: Sequelize.STRING,
    },
    fak_id: {
        type: Sequelize.INTEGER,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    //   isDeleted: Sequelize.BOOLEAN,
}, {
    paranoid: false,
    timestamps: false,
});

Prodi.sync();

module.exports = Prodi;