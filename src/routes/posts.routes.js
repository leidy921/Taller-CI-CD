const { Router } = require('express');
const { getPosts, getPostPorId, postPost, deletePost } = require('../controllers/posts.controller');
const router = Router();

/**
 * @openapi
 * /api/posts:
 *   get:
 *     summary: Listar posts
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/posts', getPosts);

/**
 * @openapi
 * /api/posts/{id}:
 *   get:
 *     summary: Obtener post por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 */
router.get('/posts/:id', getPostPorId);

/**
 * @openapi
 * /api/posts:
 *   post:
 *     summary: Crear post (requiere userId válido)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, titulo, contenido]
 *             properties:
 *               userId: { type: integer, example: 1 }
 *               titulo: { type: string, example: "Hola Mundo" }
 *               contenido: { type: string, example: "Contenido del post" }
 *     responses:
 *       201: { description: Creado }
 *       400: { description: Datos inválidos }
 *       404: { description: Usuario no encontrado }
 */
router.post('/posts', postPost);

/**
 * @openapi
 * /api/posts/{id}:
 *   delete:
 *     summary: Eliminar post por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */
router.delete('/posts/:id', deletePost);

module.exports = router;
