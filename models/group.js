'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Grup = db.define('group', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    user_id  : {
        type: Sequelize.INTEGER,
    },
    kode: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    slug: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.ENUM('active', 'unactive', "archived"),
    },
    access: {
        type: Sequelize.ENUM('public', 'private'),
    },
    year: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.ENUM('ganjil', 'genap'),
    },
    prodi_id  : {
        type: Sequelize.INTEGER,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    paranoid: false,
    timestamps: false,
});

Grup.sync();

module.exports = Grup;