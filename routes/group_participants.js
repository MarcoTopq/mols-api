var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
var GrupParticipants = require('../models/group_participants');
var Grup = require('../models/group');

var Joi = require('joi');
var multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({
    storage: storage
})

var bodySchema = {
    body: {
        fundraiser: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        current_donation: Joi.string().required(),
        total_donation: Joi.string().required(),
        time_limit: Joi.string().required(),
    }
};

var updateSchema = {
    body: {
        fundraiser: Joi.string().allow(""),
        title: Joi.string().allow(""),
        description: Joi.string().allow(""),
        current_donation: Joi.string().allow(""),
        total_donation: Joi.string().allow(""),
        time_limit: Joi.string().allow(""),
    }
};

router.post('/create', async (req, res) => {
    return new Promise(async (resolve, reject) => {
        console.log(req.file)
        var body = req.body;
        console.log(req.body);
        console.log(req.file)
        try {
            var data = await GrupParticipants.create({
                user_id: body.user_id,
                group_id: body.group_id,
                status: body.status,
                created_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"),
            })
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    })
});

router.get('/', async (req, res) => {
    await GrupParticipants.findAll()
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
});

router.get('/all/:id', async (req, res) => {
    var Id = req.params.id;
    await GrupParticipants.findAll({
            where: {
                user_id: Id
            }
        })
        .then(data => {
            if (!data) {
                return res.json("Grup Participants not found");
            } else {
                var datas = await Promise.all(data.map(async fc => {
                    const objFc = JSON.parse(JSON.stringify(fc));
                    let query = {
                        where: {
                            id: fc.group_id,
                            status: 'active'
                        },
                    };
                    objFc.group = await Grup.findOne(query);

                    return objFc;
                }))
                return res.json(datas);
            }
        })
        .catch(err => res.status(400).json(err))
});

router.get('/:id', async (req, res) => {
    var Id = req.params.id;
    await GrupParticipants.findOne({
            where: {
                id: Id
            }
        })
        .then(data => {
            if (!data) {
                return res.json("Grup Participants not found");
            } else {
                return res.json(data);
            }
        })
        .catch(err => res.status(400).json(err))
});

router.post('/:id', async (req, res) => {
    var Id = req.params.id;
    var body = req.body;
    await GrupParticipants.findOne({
            where: {
                id: Id
            }
        })
        .then(data => {
            if (!data) {
                return res.json("Grup Participants not found");
            } else {
                GrupParticipants.update({
                    user_id: body.user_id,
                    group_id: body.group_id,
                    status: body.status,
                    update_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")
                }, {
                    where: {
                        id: Id
                    }
                })
            }
        })
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
})

router.delete('/:id', async (req, res) => {
    var Id = req.params.id;
    await GrupParticipants.update({
        isDelete: true
    }, {
        where: {
            id: Id
        }
    })
    await GrupParticipants.destroy({
            where: {
                id: Id
            }
        })
        .then(res.json("Grup Participants was remove"))
        .catch(err => res.status(400).json(err))
});

module.exports = router;