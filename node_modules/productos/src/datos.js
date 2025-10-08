const listaProductos = [];
let ultimoIdProducto = 0;

function crearProducto({ nombre, precio, stock }) {
  ultimoIdProducto += 1;
  const nuevo = { id: ultimoIdProducto, nombre, precio, stock };
  listaProductos.push(nuevo);
  return nuevo;
}

function obtenerProductoPorId(id) {
  return listaProductos.find(p => p.id === id) || null;
}

function obtenerProductos() {
  return listaProductos;
}

module.exports = { crearProducto, obtenerProductoPorId, obtenerProductos };
