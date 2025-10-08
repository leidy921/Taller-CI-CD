const { listarUsuarios, crearUsuario } = require('../services/users.service');

async function getUsuarios(req, res) {
  return res.json(listarUsuarios());
}

async function postUsuario(req, res) {
  try {
    const { nombre, email, password } = req.body || {};
    const nuevo = crearUsuario({ nombre, email, password });
    return res.status(201).json(nuevo);
  } catch (e) {
    return res.status(e.estado || 500).json({ mensaje: e.message });
  }
}

module.exports = { getUsuarios, postUsuario };