// phoneNumberModel.js
const databaseService = require('../services/database');

const phoneNumberModel = {
  checkPhoneNumberExists: async (phoneNumber, accountId) => {
    const query = 'SELECT EXISTS(SELECT 1 FROM phone_number WHERE number = $1 AND account_id = $2)';
    const values = [phoneNumber, accountId];
    const result = await databaseService.queryOne(query, values);
    return result.exists;
  },
};

module.exports = phoneNumberModel;
