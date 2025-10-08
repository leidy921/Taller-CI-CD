const app = require('./app');

const PUERTO = process.env.PORT || 3001;
app.listen(PUERTO, () => {
  console.log(`Productos en http://localhost:${PUERTO}`);
  console.log(`Swagger:   http://localhost:${PUERTO}/documentacion`);
});
