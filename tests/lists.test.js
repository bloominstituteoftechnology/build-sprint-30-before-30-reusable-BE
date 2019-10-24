const session = require('supertest-session');
const database = require('../database');
const server = require('../server');
const knexCleaner = require('knex-cleaner');
let request;

beforeEach(async () => {
  request = session(server);

  await knexCleaner.clean(database, {
    mode: 'truncate',
    restartIdentity: true,
  });
});

describe('lists', () => {
  beforeEach(async () => {
    await request
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test' });

    await request
      .post('/api/auth/login')
      .auth('test', 'test');
  });

  test('400 when trying to create list without all fields', async () => {
    const response = await request
      .post('/api/lists');

    expect(response.status).toBe(400);
  });

  test('201 when creating a list with all fields', async () => {
    const response = await request
      .post('/api/lists')
      .send({ name: 'Name', description: 'Description' });

    expect(response.status).toBe(201);
  });

  test('200 when getting all lists', async () => {
    const response = await request
      .get('/api/lists');

    expect(response.status).toBe(200);
  });

  test('404 when getting an unknown list', async () => {
    const response = await request
      .get('/api/lists/1');

    expect(response.status).toBe(404);
  });

  test('204 when deleting a list', async () => {
    await request
      .post('/api/lists')
      .send({ name: 'Name', description: 'Description' });

    const response = await request
      .delete('/api/lists/1');

    expect(response.status).toBe(204);
  });

  test('201 when creating a comment with all fields', async () => {
    await request
      .post('/api/lists')
      .send({ name: 'Name', description: 'Description' });

    await request
      .post('/api/lists/1/comments')
      .send({ content: 'Content' });

    const response = await request
      .post('/api/lists/1/comments')
      .send({ content: 'Content' });

    expect(response.status).toBe(201);
  });

  test('204 when deleting a comment', async () => {
    await request
      .post('/api/lists')
      .send({ name: 'Name', description: 'Description' });

    await request
      .post('/api/lists/1/comments')
      .send({ content: 'Content' });

    const response = await request
      .delete('/api/lists/comments/1');

    expect(response.status).toBe(204);
  });

  test('400 when creating an item without all fields', async () => {
    await request
      .post('/api/lists')
      .send({ name: 'Name', description: 'Description' });

    const response = await request
      .post('/api/lists/1/items');

    expect(response.status).toBe(400);
  });

  test('201 when creating an item with all fields', async () => {
    await request
      .post('/api/lists')
      .send({ name: 'Name', description: 'Description' });

    const response = await request
      .post('/api/lists/1/items')
      .send({ name: 'Name', description: 'Description' });

    expect(response.status).toBe(201);
  });

  test('204 when deleting an item', async () => {
    await request
      .post('/api/lists')
      .send({ name: 'Name', description: 'Description' });

    await request
      .post('/api/lists/1/items')
      .send({ name: 'Name', description: 'Description' });

    const response = await request
      .delete('/api/lists/items/1')

    expect(response.status).toBe(204);
  });
});