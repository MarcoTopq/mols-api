'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index')
const Grup_participants = db.define('group_participants', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id  : {
        type: Sequelize.INTEGER,
    },
    group_id  : {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.ENUM('active','unactive','pending','rejected'),
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
}, {
    paranoid: false,
    timestamps: false,
});

Grup_participants.sync();

module.exports = Grup_participants;