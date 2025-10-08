const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Prepara app con DB aislada por test
process.env.DB_PATH = path.resolve(__dirname, 'tmp.db.json');
const app = require('../src/app');

beforeEach(() => {
  fs.writeFileSync(process.env.DB_PATH, JSON.stringify({ users: [], posts: [] }, null, 2));
});

afterAll(() => {
  if (fs.existsSync(process.env.DB_PATH)) fs.unlinkSync(process.env.DB_PATH);
});

test('registro usuario: 201', async () => {
  const res = await request(app)
    .post('/api/usuarios')
    .send({ nombre: 'Ana', email: 'ana@ejemplo.com', password: '123' });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test('registro usuario duplicado: 409', async () => {
  await request(app).post('/api/usuarios').send({ nombre: 'Ana', email: 'ana@e.com', password: 'x' });
  const res = await request(app).post('/api/usuarios').send({ nombre: 'Ana2', email: 'ana@e.com', password: 'y' });
  expect(res.status).toBe(409);
  expect(res.body.mensaje).toMatch(/email/i);
});

test('registro usuario faltante: 400', async () => {
  const res = await request(app).post('/api/usuarios').send({ nombre: 'SinEmail' });
  expect(res.status).toBe(400);
});

test('crear post: 201', async () => {
  const u = await request(app).post('/api/usuarios').send({ nombre: 'Ana', email: 'ana@e.com', password: 'z' });
  const res = await request(app).post('/api/posts').send({ userId: u.body.id, titulo: 'Hola', contenido: 'Mundo' });
  expect(res.status).toBe(201);
  expect(res.body.userId).toBe(u.body.id);
});

test('crear post userId inexistente: 404', async () => {
  const res = await request(app).post('/api/posts').send({ userId: 999, titulo: 'X', contenido: 'Y' });
  expect(res.status).toBe(404);
});

test('crear post sin titulo: 400', async () => {
  const u = await request(app).post('/api/usuarios').send({ nombre: 'Ana', email: 'ana@e.com', password: 'z' });
  const res = await request(app).post('/api/posts').send({ userId: u.body.id, contenido: 'Y' });
  expect(res.status).toBe(400);
});