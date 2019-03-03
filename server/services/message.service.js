const { Message } = require('../models/index').models;

module.exports = {
  add: async message => Message.create(message),
  read: async (filter, options) => {
    const query = Message.find(filter);
    if (options._limit) {
      query.limit(+options._limit);
    }
    if (options._startDate) {
      query.gt('createdAt', options._startDate);
    }
    return query;
  },
};
