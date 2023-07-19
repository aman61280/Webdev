// accountModel.js
const databaseService = require('../services/database');

const accountModel = {
  getAccountById: async (accountId) => {
    const query = 'SELECT * FROM account WHERE auth_id = $1';
    const values = [accountId];
    return await databaseService.queryOne(query, values);
  },
};

module.exports = accountModel;
