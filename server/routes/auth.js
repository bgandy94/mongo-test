const { celebrate, Joi } = require('celebrate');
const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');

/* GET users listing. */
router.post('/register', celebrate({
  body: Joi.object().keys({
    username: Joi.string(),
    name: Joi.string(),
    password: Joi.string(),
  }),
}, { presence: 'required' }), authController.register);

router.post('/login', celebrate({
  body: Joi.object().keys({
    username: Joi.string(),
    password: Joi.string(),
  }),
}, { presence: 'required' }), authController.login);

module.exports = router;
