const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(400).send('not implemented yet');
});

router.post('/', messageController.add);

module.exports = router;