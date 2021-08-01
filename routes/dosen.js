var express = require('express');
var router = express.Router();
var Dosen = require('../models/dosen');
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

router.post('/signup', async (req, res) => {
  var body = req.body;
  await Dosen.findOne({
      where: {
        nip: body.nip
      }
    }).then(current_Dosen => {
      if (current_Dosen) {
        return res.json("email has been used");
      } else {
        Dosen.create({
            nip: body.nip,
            fakultas: body.fakultas,
            user_id: body.user_id,
          })
          .then(data => (res.json(data)))
      }
    })
    .catch(err => res.status(400).json(err));
});

router.post('/signin', async (req, res) => {
  await Dosen.findOne({
    where: {
      nip: req.body.nip
    }
  }).then((dosen) => {
    const checkLogin = bcrypt.compareSync(req.body.password, dosen.password);
    if (checkLogin) {
      var token = jwt.sign({
        id: dosen.id,
        role: dosen.role
      }, config.secret, {
        expiresIn: '1h'
      });
      if (token) {
        res.status(200).json({
          message: "Success Sign In",
          token: token,
          Dosen: dosen,
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
    var dosen = await Dosen.findOne({
      where: {
        id: Id
      }
    })
    if (!dosen) {
      return res.status(300).json("Dosen not found");
    } else {
      var update = await Dosen.update({
        nip: body.nip,
        fakultas: body.fakultas,
        user_id: body.user_id,
      }, {
        where: {
          id: Id
        }
      })
    }
    var finish = await Dosen.findOne({
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
  await Dosen.findAll()
    .then(data => (res.json(data)))
    .catch(err => res.status(400).json(err))
});

router.get('/:id', async (req, res) => {
  var Id = req.params.id;
  await Dosen.findOne({
      where: {
        id: Id
      }
    })
    .then(data => {
      if (!data) {
        return res.json("Dosen not found");
      } else {
        return res.json(data);
      }
    })
    .catch(err => res.status(400).json(err))
});


router.delete('/:id', async (req, res) => {
  var Id = req.params.id;
  await Dosen.update({
    isDelete: true
  }, {
    where: {
      id: Id
    }
  })
  await Dosen.destroy({
      where: {
        id: Id
      }
    })
    .then(res.json("Dosen was remove"))
    .catch(err => res.status(400).json(err))
});

module.exports = router;