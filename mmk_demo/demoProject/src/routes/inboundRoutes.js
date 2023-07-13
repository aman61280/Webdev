// inboundRoutes.js
const express = require('express');
const inboundController = require('../controllers/inboundController');

const router = express.Router();

router.post('/inbound/sms/', inboundController.handleInboundSMS);

module.exports = router;
