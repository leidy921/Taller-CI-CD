const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

const URL_PRODUCTOS = process.env.PRODUCTOS_URL || 'http://localhost:3001';

const opcionesSwagger = {
  definition: { openapi: '3.0.0', info: { title: 'API de Pedidos', version: '1.0.0' } },
  apis: [__filename]
};
const especificacion = swaggerJSDoc(opcionesSwagger);
app.use('/documentacion', swaggerUi.serve, swaggerUi.setup(especificacion));

const listaPedidos = [];
let ultimoIdPedido = 0;

/**
 * @openapi
 * /pedidos:
 *   get:
 *     summary: Listar pedidos
 *     responses: { 200: { description: OK } }
 */
app.get('/pedidos', (req, res) => res.json(listaPedidos));

/**
 * @openapi
 * /pedidos:
 *   post:
 *     summary: Crear pedido
 *     description: Valida que el producto exista llamando al micro de productos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productoId, cantidad, nombreUsuario]
 *             properties:
 *               productoId: { type: integer, example: 1 }
 *               cantidad: { type: integer, example: 2 }
 *               nombreUsuario: { type: string, example: "Ana" }
 *     responses:
 *       201: { description: Creado }
 *       400: { description: Datos inválidos }
 *       404: { description: Producto no encontrado }
 */
app.post('/pedidos', async (req, res) => {
  const { productoId, cantidad, nombreUsuario } = req.body || {};
  if (typeof productoId !== 'number' || typeof cantidad !== 'number' || cantidad <= 0 || !nombreUsuario) {
    return res.status(400).json({ mensaje: 'productoId (número), cantidad (>0) y nombreUsuario (string) son obligatorios' });
  }
  try {
    const r = await fetch(`${URL_PRODUCTOS}/productos/${productoId}`);
    if (r.status === 404) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    if (!r.ok) return res.status(400).json({ mensaje: 'Error al validar el producto' });
    const prod = await r.json();

    ultimoIdPedido += 1;
    const nuevo = { id: ultimoIdPedido, productoId: prod.id, cantidad, nombreUsuario };
    listaPedidos.push(nuevo);
    return res.status(201).json(nuevo);
  } catch (e) {
    return res.status(400).json({ mensaje: 'No se pudo contactar el servicio de productos' });
  }
});

module.exports = app;
