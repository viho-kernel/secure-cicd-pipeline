const request = require('supertest');
const app = require('./index');

test('GET / should return welcome message', async () => {
  const res = await request(app).get('/');
  expect(res.status).toBe(200);
  expect(res.text).toContain('Welcome to Jenkins CI/CD Demo App');
});

test('GET /add/2/3 should return 5', async () => {
  const res = await request(app).get('/add/2/3');
  expect(res.status).toBe(200);
  expect(res.text).toContain('5');
});

test('GET /subtract/5/2 should return 3', async () => {
  const res = await request(app).get('/subtract/5/2');
  expect(res.status).toBe(200);
  expect(res.text).toContain('3');
});