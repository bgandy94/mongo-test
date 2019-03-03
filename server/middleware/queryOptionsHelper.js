const _ = require('lodash');

module.exports = (req, res, next) => {
  const queryOptions = req.query;
  req.customQuery = {};
  req.customQuery.options = parseKeysFromObject(queryOptions, item => item.startsWith('_'));
  req.customQuery.filters = parseKeysFromObject(queryOptions, item => !item.startsWith('_'));

  next();
};

const parseKeysFromObject = (sourceObject, parseValidationCb) => _.invert(_.pickBy(_.invert(sourceObject), parseValidationCb)); //eslint-disable-line
