const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Message };

module.exports = { connectDb, models };
