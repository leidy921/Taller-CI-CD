const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const rutasPosts = require('./routes/posts.routes');
const rutasUsuarios = require('./routes/users.routes');

const app = express();
app.use(cors());
app.use(express.json());

const opcionesSwagger = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API Posts y Usuarios', version: '1.0.0', description: 'API refactorizada (prototipo -> producción)' }
  },
  apis: [__dirname + '/routes/*.js']
};
const especificacion = swaggerJSDoc(opcionesSwagger);
app.use('/api/documentacion', swaggerUi.serve, swaggerUi.setup(especificacion));

app.use('/api', rutasPosts);
app.use('/api', rutasUsuarios);

module.exports = app;
