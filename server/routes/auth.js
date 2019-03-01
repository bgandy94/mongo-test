const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('auth - respond with a resource');
});

router.get('/butt', (req, res, next) => {
    res.send('auth - hello!');
});

module.exports = router;
