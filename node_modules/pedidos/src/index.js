const app = require('./app');

const PUERTO = process.env.PORT || 3002;
app.listen(PUERTO, () => {
  console.log(`Pedidos en http://localhost:${PUERTO}`);
  console.log(`Swagger: http://localhost:${PUERTO}/documentacion`);
});
