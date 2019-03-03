
const messageService = require('../services/message.service');

module.exports = {
  add: async (req, res) => {
    req.body.user = req.userInfo.id;
    try {
      await messageService.add(req.body);
      res.send('success!');
    } catch (e) {
      next(e);
    }
  },
  read: async (req, res) => {
    let messages;

    try {
      messages = await messageService.read(req.customQuery.filters, req.customQuery.options);
    } catch (e) {
      res.status(500).send('an error occurred when retrieving messages');
    }

    res.send(messages);
  },
};
