const { listarPosts, crearPost, obtenerPostPorId, eliminarPost } = require('../services/posts.service');

async function getPosts(req, res) {
  return res.json(listarPosts());
}

async function getPostPorId(req, res) {
  const id = Number(req.params.id);
  const post = obtenerPostPorId(id);
  if (!post) return res.status(404).json({ mensaje: 'Post no encontrado' });
  return res.json(post);
}

async function postPost(req, res) {
  try {
    const { userId, titulo, contenido } = req.body || {};
    const nuevo = crearPost({ userId, titulo, contenido });
    return res.status(201).json(nuevo);
  } catch (e) {
    return res.status(e.estado || 500).json({ mensaje: e.message });
  }
}

async function deletePost(req, res) {
  try {
    const id = Number(req.params.id);
    eliminarPost(id);
    return res.status(204).send();
  } catch (e) {
    return res.status(e.estado || 500).json({ mensaje: e.message });
  }
}

module.exports = { getPosts, getPostPorId, postPost, deletePost };