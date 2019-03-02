const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');

const saltRounds = 10;

module.exports = {
  hashPassword: async (plainTextPassword) => {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    } catch (e) {
      throw e;
    }
    return hashedPassword;
  },
  checkPassword: async (plainTextPassword, hash) => {
    try {
      const results = await bcrypt.compare(plainTextPassword, hash);
      if (!results) {
        throw new Error('incorrect password!');
      }
    } catch (e) {
      throw e;
    }
  },
  generateToken: async (body) => jwt.sign(body, config.tokenSecret, { expiresIn: config.tokenExpirationPeriod }),
  validateToken: async (req, res, next) => {

    if (req.path.indexOf('auth') >= 0) {
      return next();
    }

    let token = req.headers['authorization'];
    let results;
    if (!token) {
      return res.status(401).send('no token provided');
    }

    if (token.startsWith('Bearer ') || token.startsWith('bearer ')) {
      token = token.slice(7, token.length);
    }
    try {
      if (token) {
        results = await jwt.verify(token, config.tokenSecret);
      }

    } catch (e) {
      return res.status(403).send({ success: false, message: 'auth error' });
    }
    req.userInfo = { id: results.id, username: results.username, name: results.name}
    next();
  },
};