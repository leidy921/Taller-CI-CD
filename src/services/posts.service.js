const { leerBD, escribirBD } = require('../data/db');
const { siguienteId } = require('./validaciones');
const { obtenerUsuarioPorId } = require('./users.service');

function listarPosts() {
  const db = leerBD();
  return db.posts || [];
}

function crearPost({ userId, titulo, contenido }) {
  if (typeof userId !== 'number' || !titulo || !contenido) {
    const error = new Error('userId (número), titulo y contenido son obligatorios');
    error.estado = 400;
    throw error;
  }
  const usuario = obtenerUsuarioPorId(userId);
  if (!usuario) {
    const error = new Error('Usuario no encontrado');
    error.estado = 404;
    throw error;
  }
  const db = leerBD();
  db.posts = db.posts || [];
  const nuevo = { id: siguienteId(db.posts), userId, titulo, contenido };
  db.posts.push(nuevo);
  escribirBD(db);
  return nuevo;
}

function obtenerPostPorId(id) {
  const db = leerBD();
  return (db.posts || []).find(p => p.id === id) || null;
}

function eliminarPost(id) {
  const db = leerBD();
  const antes = db.posts.length;
  db.posts = (db.posts || []).filter(p => p.id !== id);
  if (db.posts.length === antes) {
    const error = new Error('Post no encontrado');
    error.estado = 404;
    throw error;
  }
  escribirBD(db);
}

module.exports = { listarPosts, crearPost, obtenerPostPorId, eliminarPost };
