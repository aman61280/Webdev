// inboundController.js
const cacheService = require('../services/cache');
const phoneNumberModel = require('../models/phoneNumber');

const inboundController = {
  handleInboundSMS: async (req, res) => {
    const { from, to, text } = req.body;

    // Input validation
    if (!from) {
      return res.status(400).json({ message: '', error: 'from parameter is missing' });
    }
    if (!to) {
      return res.status(400).json({ message: '', error: 'to parameter is missing' });
    }
    if (!text) {
      return res.status(400).json({ message: '', error: 'text parameter is missing' });
    }

    // Check if 'to' parameter exists in the phone_number table for the specific account
    const accountId = req.headers.account_id; // Assuming auth_id is the account_id
    const phoneNumberExists = await phoneNumberModel.checkPhoneNumberExists(parseInt(to), parseInt(accountId));

    if (!phoneNumberExists) {
      return res.status(400).json({ message: '', error: 'to parameter not found' });
    }

    // Store in cache if the text is STOP
    if (text.trim().toUpperCase() === 'STOP') {
      const cacheKey = `${from}:${to}`;
      cacheService.setCacheEntry(cacheKey, 'STOP', 4 * 60 * 60); // 4 hours expiration
    }

    return res.json({ message: 'inbound sms ok', error: '' });
  },
};

module.exports = inboundController;
