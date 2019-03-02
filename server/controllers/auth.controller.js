const jwt = require('jsonwebtoken');

const config = require('../config');
const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const models = require('../models/index').models;


module.exports = {
  register: async (req, res, next) => {
    const userObject = req.body;

    try {
      userObject.password = await authService.hashPassword(userObject.password);

      await userService.add(userObject);

    } catch (e) {
      return res.status(500).send('an error occurred.');
    }

    return res.send('test');
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    const secret = config.tokenSecret;

    const user = await userService.findByUsername(username);

    if (!user) {
      return res.status(401);
    }

    try {
      await authService.checkPassword(password, user.password);
      delete user.password;

    } catch (e) {
      return res.send(403).send('bad password');
    }
    let token;

    try {
      token = await authService.generateToken({username: user.username, name: user.name, id: user._id});
    } catch (e) {
      return res.status(500).send('an error occured while logging in');
    }

    return res.send({
      success: true,
      message: 'Authentication Successful!',
      access_token: token,
    });

  },
};