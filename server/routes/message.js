const { celebrate, Joi } = require('celebrate');
const express = require('express');

const router = express.Router();

const messageController = require('../controllers/message.controller');

router.get('/', celebrate({
  body: Joi.object().keys({
    test: Joi.string(),
  }),
}, { presence: 'required' }), messageController.read);

router.post('/', messageController.add);

module.exports = router;
