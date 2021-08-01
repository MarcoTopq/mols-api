var express = require('express');
var router = express.Router();
var Mahasiswa = require('../models/mahasiswa');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config/index');
var auth = require('../middleware/auth');
var expressJoi = require('express-joi-validator');
var Joi = require('joi');

var bodySchema = {
  body: {
    Mahasiswaname: Joi.string().required(),
    fakultas: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
  }
};

var updateSchema = {
  body: {
    Mahasiswaname: Joi.string().allow(""),
    fakultas: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    password: Joi.string().allow(""),
  }
};

router.post('/signup', async (req, res) => {
  var body = req.body;
  await Mahasiswa.findOne({
      where: {
        nim: body.nim
      }
    }).then(current_Mahasiswa => {
      if (current_Mahasiswa) {
        return res.json("fakultas has been used");
      } else {
        Mahasiswa.create({
            nim: body.nim,
            user_id: body.user_id,
            prodi: body.prodi,
            angkatan: body.angkatan,
            kelas: body.kelas,
            fakultas: body.fakultas,
          })
          .then(data => (res.json(data)))
      }
    })
    .catch(err => res.status(400).json(err));
});

router.post('/signin', async (req, res) => {
  await Mahasiswa.findOne({
    where: {
      nim: req.body.nim
    }
  }).then((mahasiswa) => {
    const checkLogin = bcrypt.compareSync(req.body.password, mahasiswa.password);
    if (checkLogin) {
      var token = jwt.sign({
        id: mahasiswa.id,
        role: mahasiswa.role
      }, config.secret, {
        expiresIn: '1h'
      });
      if (token) {
        res.status(200).json({
          message: "Success Sign In",
          token: token,
          Mahasiswa: mahasiswa,
        });
      }
    } else {
      res.status(300).json({
        message: "Failed Sign In",
      });
    }
  }).catch((err) => {
    res.status(200).json({
      message: err.message,
    });
  });
})

router.post('/edit/:id', async (req, res) => {
  var Id = req.params.id;
  var body = req.body;
  try {
    var data = await Mahasiswa.findOne({
      where: {
        id: Id
      }
    })
    if (!data) {
      return res.status(300).json("Mahasiswa not found");
    } else {
       await Mahasiswa.update({
        nim: body.nim,
        user_id: body.user_id,
        prodi: body.prodi,
        angkatan: body.angkatan,
        kelas: body.kelas,
        fakultas: body.fakultas,
      }, {
        where: {
          id: Id
        }
      })
    }
    var finish = await Mahasiswa.findOne({
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
  await Mahasiswa.findAll()
    .then(data => (res.json(data)))
    .catch(err => res.status(400).json(err))
});

router.get('/:id', async (req, res) => {
  var Id = req.params.id;
  await Mahasiswa.findOne({
      where: {
        id: Id
      }
    })
    .then(data => {
      if (!data) {
        return res.json("Mahasiswa not found");
      } else {
        return res.json(data);
      }
    })
    .catch(err => res.status(400).json(err))
});


router.delete('/:id', async (req, res) => {
  var Id = req.params.id;
  await Mahasiswa.update({
    isDelete: true
  }, {
    where: {
      id: Id
    }
  })
  await Mahasiswa.destroy({
      where: {
        id: Id
      }
    })
    .then(res.json("Mahasiswa was remove"))
    .catch(err => res.status(400).json(err))
});

module.exports = router;