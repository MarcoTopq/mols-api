'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Post_content = db.define('post_contents', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    post_id: {
        type: Sequelize.INTEGER,
    },
    soal_id: {
        type: Sequelize.INTEGER,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    paranoid: false,
    timestamps: false,
});

Post_content.sync();

module.exports = Post_content;