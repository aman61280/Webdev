// inbound.test.js
const request = require('supertest');
const app = require('../app');

describe('POST /inbound/sms/', () => {
  it('should return 400 if required parameters are missing', async () => {
    const response = await request(app)
      .post('/inbound/sms/')
      .set('Authorization', 'Basic dXNlcm5hbWU6YXV0aF9wYXNzd29yZA==')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('from parameter is missing');
  });

  // Add more unit tests for other scenarios
});
