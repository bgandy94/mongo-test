
const messageService = require('../services/message.service');

module.exports = {
  add: async (req, res) => {
    try {
      await messageService.add(req.body);
      res.send('success!');
    } catch (e) {
      throw e;
    }
  },
  read: async (req, res) => {
    let messages;

    try {
      // messages = await messageService.read(filters, options);
    } catch (e) {
      res.status(500).send('an error occurred when retrieving messages');
    }

    res.send(messages);
  },
};
