var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
var Soal = require('../models/soal');
var Joi = require('joi');
var Post_content = require('../models/post_content');
var Opsi_ganda = require('../models/opsi_ganda');
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
            var data = await Soal.create({
                text: body.text,
                bobot: body.bobot,
                user_id: body.user_id,
                prodi_id: body.prodi_id,
                kunci: body.kunci,
                soal_type: body.soal_type,
                created_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"),
                updated_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")
            })
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    })
});

router.get('/', async (req, res) => {
    await Soal.findAll()
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
});

router.get('/soalid/:id', async (req, res) => {
    var Id = req.params.id;
    await Soal.findOne({
            where: {
                id: Id
            }
        })
        .then(data => {
            if (!data) {
                return res.json("Soal not found");
            } else {
                return res.json(data);
            }
        })
        .catch(err => res.status(400).json(err))
});

//get soal sesuai post 
router.get('/:id', async (req, res) => {
    return new Promise(async (resolve, reject) => {
            var Id = req.params.id;
            await Post_content.findAll({
                where: {
                    post_id: Id
                }
            }).then(async data => {
                if (!data) {
                    return res.json({
                        data: "Post not found"
                    });
                } else {
                    var soal = await Promise.all(data.map(async fc => {
                        const objFc = JSON.parse(JSON.stringify(fc));
                        objFc.soal = await Soal.findAll({
                            where: {
                                id: fc.soal_id
                            }
                        });
                        objFc.pilihan = await Promise.all(objFc.soal.map(async fc => {
                            const obj = JSON.parse(JSON.stringify(fc));
                            obj.post = await Opsi_ganda.findAll({
                                where: {
                                    soal_id: fc.id
                                }
                            });
                            return obj;
                        }))
                        return objFc;
                    }))
                    return res.json(soal);
                }
            })
        })
        .catch(err => res.status(400).json(err))
});


router.post('/:id', async (req, res) => {
    var Id = req.params.id;
    var body = req.body;
    await Soal.findOne({
            where: {
                id: Id
            }
        })
        .then(data => {
            if (!data) {
                return res.json("Soal not found");
            } else {
                Soal.update({
                    text: body.text,
                    bobot: body.bobot,
                    user_id: body.user_id,
                    prodi_id: body.prodi_id,
                    kunci: body.kunci,
                    soal_type: body.soal_type,
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
    await Soal.update({
        isDelete: true
    }, {
        where: {
            id: Id
        }
    })
    await Soal.destroy({
            where: {
                id: Id
            }
        })
        .then(res.json("Soal was remove"))
        .catch(err => res.status(400).json(err))
});

module.exports = router;