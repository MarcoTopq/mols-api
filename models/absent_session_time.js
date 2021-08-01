'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Absent_session_time = db.define('absent_session_time', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    start_time: {
        type: Sequelize.DATE,
    },
    end_time: {
        type: Sequelize.DATE,
    },
    post_id: {
        type: Sequelize.INTEGER,
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    //   isDeleted: Sequelize.BOOLEAN,
}, {
    paranoid: false,
    timestamps: false,
});

Absent_session_time.sync();

module.exports = Absent_session_time;