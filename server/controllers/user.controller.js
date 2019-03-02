const models = require('../models/index').models;

const userService = require('../services/user.service');

module.exports = {
  add: async (req, res, next) => {
    try {
      let results = await models.User.create(req.body);
      res.send('success!');
    } catch (e) {
      throw e;
    }
  },
  currentUser: async (req, res, next) => {
    try {
      res.send(req.userInfo);
    } catch (e) {

    }
  },
};