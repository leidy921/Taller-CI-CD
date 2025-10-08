const { Router } = require('express');
const { getUsuarios, postUsuario } = require('../controllers/users.controller');
const router = Router();

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     summary: Listar usuarios
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/usuarios', getUsuarios);

/**
 * @openapi
 * /api/usuarios:
 *   post:
 *     summary: Crear usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, password]
 *             properties:
 *               nombre: { type: string, example: "María" }
 *               email:  { type: string, example: "maria@example.com" }
 *               password: { type: string, example: "secreto" }
 *     responses:
 *       201:
 *         description: Creado
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Email en uso
 */
router.post('/usuarios', postUsuario);

module.exports = router;
