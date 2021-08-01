var express = require('express');
var router = express.Router();
var Absent = require('../models/absent');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/index');
var auth = require('../middleware/auth');
var expressJoi = require('express-joi-validator');
var Joi = require('joi');

var bodySchema = {
    body: {
        nip: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
    }
};

var updateSchema = {
    body: {
        nip: Joi.string().allow(""),
        email: Joi.string().allow(""),
        phone: Joi.string().allow(""),
        password: Joi.string().allow(""),
    }
};

router.post('/create', async (req, res) => {
    return new Promise(async (resolve, reject) => {
        console.log(req.file)
        var body = req.body;
        console.log(req.body);
        console.log(req.file)
        try {
            var absent = await Absent.create({
                absent_session_id: body.absent_session_id,
                user_id: body.user_id,
                created_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"),
                updated_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")
            })
            res.json(absent)
        } catch (error) {
            res.json(error)
        }
    })
});


router.post('/edit/:id', async (req, res) => {
    var Id = req.params.id;
    var body = req.body;
    try {
        var absent = await Absent.findOne({
            where: {
                id: Id
            }
        })
        if (!Absent) {
            return res.status(300).json("Absent not found");
        } else {
            var update = await Absent.update({
                absent_session_id: body.absent_session_id,
                user_id: body.user_id,
                updated_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")
            }, {
                where: {
                    id: Id
                }
            })
        }
        var finish = await Absent.findOne({
            where: {
                id: Id
            }
        })
        res.json(finish)
    } catch (error) {
        res.status(400).json(err)
    }
})

router.get('/', async (req, res) => {
    await Absent.findAll()
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
});

router.get('/:id', async (req, res) => {
    var Id = req.params.id;
    await Absent.findOne({
            where: {
                id: Id
            }
        })
        .then(data => {
            if (!data) {
                return res.json("Absent not found");
            } else {
                return res.json(data);
            }
        })
        .catch(err => res.status(400).json(err))
});


router.delete('/:id', async (req, res) => {
    var Id = req.params.id;
    await Absent.update({
        isDelete: true
    }, {
        where: {
            id: Id
        }
    })
    await Absent.destroy({
            where: {
                id: Id
            }
        })
        .then(res.json("Absent was remove"))
        .catch(err => res.status(400).json(err))
});

module.exports = router;