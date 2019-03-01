const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/butt', (req, res, next) => {
  res.send('hello!');
});

router.post('/', messageController.add);

module.exports = router;