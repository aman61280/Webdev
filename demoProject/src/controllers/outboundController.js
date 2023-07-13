// outboundController.js
const cacheService = require('../services/cache');
const phoneNumberModel = require('../models/phoneNumber');

const outboundController = {
  handleOutboundSMS: async (req, res) => {
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

    // Basic Authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return res.status(401).json({ message: '', error: 'Unauthorized' });
    }

    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [username, password] = decodedCredentials.split(':');

    if (!authenticationService.isValidCredentials(username, password)) {
      return res.status(403).json({ message: '', error: 'Forbidden' });
    }


    // Check cache for STOP entry
    const cacheKey = `${from}:${to}`;
    const isBlocked = await cacheService.isBlocked(cacheKey);
    if (isBlocked) {
      return res
        .status(400)
        .json({ message: '', error: `sms from ${from} to ${to} blocked by STOP request` });
    }

    // Track request count for 'from' number
    try {
      const key = `request_count:${from}`;
      const requestCount = await cacheService.trackRequestCount(key);
      if (requestCount > 50) {
        return res
          .status(400)
          .json({ message: '', error: `limit reached for from ${from}` });
      }

      return res.status(200).json({ message: 'outbound sms ok', error: '' });
    } catch (error) {
      console.error('Error tracking request count:', error);
      return res.status(500).json({ message: '', error: 'unknown failure' });
    }
  },
};

module.exports = outboundController;
