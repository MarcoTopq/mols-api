'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Post = db.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
    },
    text: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.ENUM('active', 'unactive'),
    },
    publish: {
        type: Sequelize.ENUM('true', 'false'),
    },
    date_limit: {
        type: Sequelize.DATE,
    },
    minutes: {
        type: Sequelize.INTEGER,
    },
    group_id : {
        type: Sequelize.INTEGER,
    },
    user_id  : {
        type: Sequelize.INTEGER,
    },
    post_type : {
        type: Sequelize.ENUM('pesan', 'tugas', 'kuis'),
    },
    schema_poin_id  : {
        type: Sequelize.INTEGER,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    paranoid: false,
    timestamps: false,
});

Post.sync();

module.exports = Post;