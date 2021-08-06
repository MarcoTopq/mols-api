'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Soal = db.define('soals', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: Sequelize.STRING,
    },
    bobot: {
        type: Sequelize.INTEGER,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    prodi_id: {
        type: Sequelize.INTEGER,
    },
    kunci: {
        type: Sequelize.STRING,
    },
    soal_type: {
        type: Sequelize.ENUM('undefine', 'essay', 'ganda'),
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    paranoid: false,
    timestamps: false,
});

Soal.sync();

module.exports = Soal;