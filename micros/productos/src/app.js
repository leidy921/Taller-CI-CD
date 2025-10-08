const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { crearProducto, obtenerProductoPorId, obtenerProductos } = require('./datos');

const app = express();
app.use(express.json());

const opcionesSwagger = {
  definition: { openapi: '3.0.0', info: { title: 'API de Productos', version: '1.0.0' } },
  apis: [__filename]
};
const especificacion = swaggerJSDoc(opcionesSwagger);
app.use('/documentacion', swaggerUi.serve, swaggerUi.setup(especificacion));

/**
 * @openapi
 * /productos:
 *   get:
 *     summary: Listar productos
 *     responses: { 200: { description: OK } }
 */
app.get('/productos', (req, res) => res.json(obtenerProductos()));

/**
 * @openapi
 * /productos/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     parameters: [ { in: path, name: id, required: true, schema: { type: integer } } ]
 *     responses: { 200: { description: OK }, 404: { description: No encontrado } }
 */
app.get('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const prod = obtenerProductoPorId(id);
  if (!prod) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  return res.json(prod);
});

/**
 * @openapi
 * /productos:
 *   post:
 *     summary: Crear producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, precio, stock]
 *             properties:
 *               nombre: { type: string }
 *               precio: { type: number }
 *               stock:  { type: integer }
 *     responses: { 201: { description: Creado }, 400: { description: Datos inválidos } }
 */
app.post('/productos', (req, res) => {
  const { nombre, precio, stock } = req.body || {};
  if (!nombre || typeof precio !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ mensaje: 'nombre, precio y stock son obligatorios' });
  }
  const nuevo = crearProducto({ nombre, precio, stock });
  return res.status(201).json(nuevo);
});

module.exports = app;
