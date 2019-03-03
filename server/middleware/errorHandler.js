const { isCelebrate } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrate(err)) {
    return res.status(400).send('invalid data');
  }

  return res.status(500).send('an error occured');
};
