var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
var Post = require('../models/post');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/index');
var auth = require('../middleware/auth');
var expressJoi = require('express-joi-validator');
var Joi = require('joi');
var Grup = require('../models/group');
var Post = require('../models/post');
var PostContent = require('../models/post_content');
var GrupParticipants = require('../models/group_participants');

var multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/id_dosens');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if (file.mimetype === 'id_dosen/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'id_dosen/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'id_dosen/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'id_dosen-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({
    storage: storage
})

var bodySchema = {
    body: {
        nama: Joi.string().required(),
        jenis: Joi.string().required(),
        id_matkul: Joi.string().required(),
        id_file: Joi.string().required(),
        total_donation: Joi.string().required(),
        time_limit: Joi.string().required(),
    }
};

var updateSchema = {
    body: {
        nama: Joi.string().allow(""),
        jenis: Joi.string().allow(""),
        id_matkul: Joi.string().allow(""),
        id_file: Joi.string().allow(""),
        total_donation: Joi.string().allow(""),
        time_limit: Joi.string().allow(""),
    }
};

router.post('/image', upload.single('photos'), async (req, res) => {
    return new Promise(async (resolve, reject) => {
        console.log(req.file)
        var file = req.file
        var body = req.body;
        console.log(req.body);
        console.log(req.file)
        try {

            res.json({
                image: file.filename
            })
        } catch (error) {
            res.json(error)
        }
    })
});

router.post('/create', async (req, res) => {
    return new Promise(async (resolve, reject) => {
        console.log(req.file)
        // var Id = req.params.id;
        // var file = req.file
        var body = req.body;
        console.log(req.body);
        console.log(req.file)
        try {
            var post = await Post.create({
                title: body.title,
                text: body.text,
                status: 'active',
                publish: 'true',
                date_limit: body.date_limit,
                minutes: body.minutes,
                group_id: body.group_id,
                user_id: body.user_id,
                post_type: body.post_type,
                schema_poin_id: body.schema_poin_id,
                created_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"),
                updated_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")
            })
            res.json(post)
        } catch (error) {
            res.json(error)
        }
    })
});


router.get('/', async (req, res) => {
    await Post.findAll()
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
});

//get semua post sesuai nim
router.get('/alltugas/:id', async (req, res) => {
    return new Promise(async (resolve, reject) => {
            var Id = req.params.id;

            await GrupParticipants.findAll({
                    where: {
                        user_id: Id
                    }
                })
                .then(async data => {
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

                        var post = await Promise.all(datas.map(async fc => {
                            const obj = JSON.parse(JSON.stringify(fc));
                            obj.post = await Post.findAll({
                                where: {
                                    group_id: fc.group.id
                                }
                            });
                            return obj;
                        }))
                        return res.json(post);
                    }
                })
            // await Grup.findAll({
            //     where: {
            //         id: Id
            //     }
            // }).then(async data => {
            //     if (!data) {
            //         return res.json({
            //             data: "Post not found"
            //         });
            //     } else {
            //         var datas = await Promise.all(data.map(async fc => {
            //             const objFc = JSON.parse(JSON.stringify(fc));
            //             objFc.post = await Post.findAll({
            //                 where: {
            //                     group_id: fc.id
            //                 }
            //             });
            //             return objFc;
            //         }))
            //         return res.json(datas);
            //     }
            // })
        })
        .catch(err => res.status(400).json(err))
});

router.get('/alltugasbyuser/:id', async (req, res) => {
    return new Promise(async (resolve, reject) => {
            var Id = req.params.id;

            await Post.findAll({
                    where: {
                        user_id: Id
                    }
                })
                .then(async data => {
                    if (!data) {
                        return res.json("Grup Participants not found");
                    } else {
                        var datas = await Promise.all(data.map(async fc => {
                            const objFc = JSON.parse(JSON.stringify(fc));
                            let query = {
                                where: {
                                    post_id: fc.id,
                                },
                            };
                            objFc.postcontent = await PostContent.findOne(query);
                            return objFc;
                        }))
                        return res.json(datas);
                    }
                })
            // await Grup.findAll({
            //     where: {
            //         id: Id
            //     }
            // }).then(async data => {
            //     if (!data) {
            //         return res.json({
            //             data: "Post not found"
            //         });
            //     } else {
            //         var datas = await Promise.all(data.map(async fc => {
            //             const objFc = JSON.parse(JSON.stringify(fc));
            //             objFc.post = await Post.findAll({
            //                 where: {
            //                     group_id: fc.id
            //                 }
            //             });
            //             return objFc;
            //         }))
            //         return res.json(datas);
            //     }
            // })
        })
        .catch(err => res.status(400).json(err))
});

//get semua tugas sesuai kelas
router.get('/tugaskelas/:id', async (req, res) => {
    return new Promise(async (resolve, reject) => {
            var Id = req.params.id;
            await Grup.findAll({
                where: {
                    id: Id
                }
            }).then(async data => {
                if (!data) {
                    return res.json({
                        data: "Post not found"
                    });
                } else {
                    var datas = await Promise.all(data.map(async fc => {
                        const objFc = JSON.parse(JSON.stringify(fc));
                        objFc.post = await Post.findAll({
                            where: {
                                group_id: fc.id
                            }
                        });
                        return objFc;
                    }))
                    return res.json(datas);
                }
            })
        })
        .catch(err => res.status(400).json(err))
});

router.get('/:id', async (req, res) => {
    var Id = req.params.id;
    await Post.findOne({
            where: {
                id: Id
            }
        })
        .then(data => {
            if (!data) {
                return res.json("Post not found");
            } else {
                return res.json(data);
            }
        })
        .catch(err => res.status(400).json(err))
});

router.post('/:id', async (req, res) => {
    var Id = req.params.id;
    var body = req.body;
    await Post.findOne({
            where: {
                id: Id
            }
        })
        .then(data => {
            if (!data) {
                return res.json("Post not found");
            } else {
                Post.update({
                    title: body.title,
                    text: body.text,
                    status: 'active',
                    publish: 'true',
                    date_limit: body.date_limit,
                    minutes: body.minutes,
                    group_id: body.group_id,
                    user_id: body.user_id,
                    post_type: body.post_type,
                    schema_poin_id: body.schema_poin_id,
                    updated_at: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")
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
    await Post.update({
        isDelete: true
    }, {
        where: {
            id: Id
        }
    })
    await Post.destroy({
            where: {
                id: Id
            }
        })
        .then(res.json("Post was remove"))
        .catch(err => res.status(400).json(err))
});

module.exports = router;