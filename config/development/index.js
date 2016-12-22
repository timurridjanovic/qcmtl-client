const root = 'http://localhost:8080';
const api = root + '/api';
const apiOne = api + '/v1';

module.exports = {
  env: 'development',
  logging: true,
  api: {
    users: apiOne + '/users',
    login: apiOne + '/login',
    logout: apiOne + '/logout'
  }
};
