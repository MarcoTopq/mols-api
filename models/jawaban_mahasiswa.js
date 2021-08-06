'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Grup = db.define('jawaban_mahasiswas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jawaban: {
        type: Sequelize.STRING,
    },
    bobot  : {
        type: Sequelize.INTEGER,
    },
    user_id : {
        type: Sequelize.BIGINT,
    },
    post_content_id : {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.ENUM('confirmed', 'open', 'close'),
    },
    access: {
        type: Sequelize.ENUM('public', 'private'),
    },
    type: {
        type: Sequelize.STRING,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    paranoid: false,
    timestamps: false,
});

Grup.sync();

module.exports = Grup;