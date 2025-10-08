const fs = require('fs');
const path = require('path');

const RUTA_DB = process.env.DB_PATH || path.resolve(__dirname, 'db.json');

function leerBD() {
  const data = fs.readFileSync(RUTA_DB, 'utf-8');
  return JSON.parse(data);
}

function escribirBD(contenido) {
  fs.writeFileSync(RUTA_DB, JSON.stringify(contenido, null, 2), 'utf-8');
}

module.exports = { leerBD, escribirBD, RUTA_DB };
