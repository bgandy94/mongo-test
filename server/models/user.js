const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
});

userSchema.statics.findByLogin = async (login) => {
    let user = await this.findOne({
        username: login,
    })
}

userSchema.pre('remove', (next) => {
    this.model('Message').deleteMany({user: this._id}, next);
});

const User = mongoose.model('User', userSchema);

module.exports = User; 