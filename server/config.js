module.exports = {
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpirationPeriod: process.env.TOKEN_EXPIRATION_TIME || '1h',
  db: {
    url: process.env.DATABASE_URL,
  },
};
