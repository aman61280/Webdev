// app.js
const express = require('express');
const bodyParser = require('body-parser');
const inboundRoutes = require('./routes/inboundRoutes');
const outboundRoutes = require('./routes/outboundRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(inboundRoutes);
app.use(outboundRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
