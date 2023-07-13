// authenticationService.js
const accountModel = require('../models/account');

const authenticationService = {
  validateCredentials: async (username, accountId) => {
    const account = await accountModel.getAccountById(accountId);
    return account && account.auth_id === username;
  },
};

module.exports = authenticationService;
