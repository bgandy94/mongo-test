const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/butt', (req, res, next) => {
  res.send('hello!');
});

router.post('/', userController.add);

module.exports = router;