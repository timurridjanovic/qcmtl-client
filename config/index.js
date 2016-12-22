'use strict';

/* eslint-disable */
function getConfig() {
  const env = process.env.NODE_ENV || 'development';
  console.log('ENV: ', env);
  let config;
  if (env === 'qa') {
    config = require('./qa');
  } else if (env === 'production') {
    config = require('./production');
  } else {
    config = require('./development');
  }
  return config;
}
/* eslint-enable */
module.exports = getConfig();
