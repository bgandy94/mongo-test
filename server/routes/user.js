const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

/* GET users listing. */
router.get('/me', userController.currentUser);

module.exports = router;