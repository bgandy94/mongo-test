const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');

const connectDb = () => mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const models = { User, Message };

module.exports = { connectDb, models };
