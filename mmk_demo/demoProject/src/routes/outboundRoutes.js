// outboundRoutes.js
const express = require('express');
const outboundController = require('../controllers/outboundController');

const router = express.Router();

router.post('/outbound/sms/', outboundController.handleOutboundSMS);

module.exports = router;
