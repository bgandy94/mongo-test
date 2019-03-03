const auth = require('./auth');
const user = require('./user');
const message = require('./message');

module.exports = (app) => {
  app.use('/auth', auth);
  app.use('/user', user);
  app.use('/message', message);
};
