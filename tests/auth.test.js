const request = require('supertest');
const database = require('../database');
const server = require('../server');
const knexCleaner = require('knex-cleaner');

beforeEach(async () => {
  await knexCleaner.clean(database, {
    mode: 'truncate',
    restartIdentity: true,
  });
});

describe('auth', () => {
  test('successful registration responds with 201', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' });

    expect(response.status).toBe(201);
  });

  test('successful registration responds with id and username', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' });

    expect(response.body.id).toBe(1);
    expect(response.body.username).toBe('test');
  });

  test('registration with duplicate name responds with 409', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' });

    const response = await request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' });

      expect(response.status).toBe(409);
  });

  test('logging in with unknown user responds with 404', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .auth('test', 'test');

      expect(response.status).toBe(404);
  });

  test('logging in with bad password responds with 401', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' });

    const response = await request(server)
      .post('/api/auth/login')
      .auth('test', 'badpassword');

      expect(response.status).toBe(401);
  });
});