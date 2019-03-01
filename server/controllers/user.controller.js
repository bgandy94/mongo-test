const models = require('../models/index').models;

module.exports = {
    add: async (req, res, next) => {
        try {
            let results = await models.User.create(req.body);
            res.send('success!');
        } catch (e) {
            throw e;
        }
    },
};