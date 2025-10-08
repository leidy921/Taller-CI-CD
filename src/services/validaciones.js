function esEmailValido(email) {
  if (typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function siguienteId(arreglo) {
  const max = arreglo.reduce((m, o) => (o.id && o.id > m ? o.id : m), 0);
  return max + 1;
}

module.exports = { esEmailValido, siguienteId };
