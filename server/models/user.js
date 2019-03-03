const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

userSchema.pre('remove', (next) => {
  this.model('Message').deleteMany({ user: this._id }, next); //eslint-disable-line
});

const User = mongoose.model('User', userSchema);

module.exports = User;
