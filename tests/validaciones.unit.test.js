const { esEmailValido, siguienteId } = require('../src/services/validaciones');

test('email válido', () => {
  expect(esEmailValido('a@b.com')).toBe(true);
  expect(esEmailValido('invalido')).toBe(false);
});

test('siguienteId', () => {
  expect(siguienteId([])).toBe(1);
  expect(siguienteId([{id:2},{id:5}])).toBe(6);
});