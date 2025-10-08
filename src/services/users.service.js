const { leerBD, escribirBD } = require('../data/db');
const { esEmailValido, siguienteId } = require('./validaciones');

function listarUsuarios() {
  const db = leerBD();
  return db.users || [];
}

function crearUsuario({ nombre, email, password }) {
  if (!nombre || !email || !password) {
    const error = new Error('nombre, email y password son obligatorios');
    error.estado = 400;
    throw error;
  }
  if (!esEmailValido(email)) {
    const error = new Error('email no tiene formato válido');
    error.estado = 400;
    throw error;
  }
  const db = leerBD();
  const yaExiste = (db.users || []).some(u => u.email === email);
  if (yaExiste) {
    const error = new Error('El email ya está en uso');
    error.estado = 409;
    throw error;
  }
  db.users = db.users || [];
  const nuevo = { id: siguienteId(db.users), nombre, email, password };
  db.users.push(nuevo);
  escribirBD(db);
  return nuevo;
}

function obtenerUsuarioPorId(id) {
  const db = leerBD();
  return (db.users || []).find(u => u.id === id) || null;
}

module.exports = { listarUsuarios, crearUsuario, obtenerUsuarioPorId };
