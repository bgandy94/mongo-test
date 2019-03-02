const User = require('../models').models.User;

module.exports = {
  add: async (userModel) => User.create(userModel),
  findByUsername: async (username) => User.findOne({username}),
  findById: async (id) => User.findById(id),
};
