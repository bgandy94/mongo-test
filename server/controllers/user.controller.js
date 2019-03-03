module.exports = {
  currentUser: async (req, res) => {
    try {
      res.send(req.userInfo);
    } catch (e) {
      res.status(500).send('an error occurred');
    }
  },
};
