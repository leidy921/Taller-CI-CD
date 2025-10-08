# Taller CI/CD — Evolución de una API REST (Express)

Proyecto académico que refactoriza un prototipo en Express hacia una estructura modular, con:
- API principal (usuarios + posts) en src/
- Microservicios: productos y pedidos (HTTP simple)
- Rutas y variables en español
- Swagger (documentación automática)
- Pruebas automatizadas (Jest + Supertest)
- CI/CD con GitHub Actions
- Documentación manual y evidencias

================================================================
CONTENIDO COMPLETO
================================================================

1) Requisitos
- Node.js 18+
- npm 7+ (workspaces para los microservicios)

2) Estructura
Taller-CI-CD/
├─ .github/workflows/ci.yml        # CI/CD (GitHub Actions)
├─ micros/
│  ├─ productos/                   # micro 1
│  │  └─ src/ (app.js, index.js, datos.js)
│  └─ pedidos/                     # micro 2
│     └─ src/ (app.js, index.js)
├─ src/                            # API principal (usuarios + posts)
│  ├─ app.js
│  ├─ index.js
│  ├─ routes/ (users.routes.js, posts.routes.js)
│  ├─ controllers/ (...)
│  ├─ services/ (users.service.js, posts.service.js, validaciones.js)
│  └─ data/ (db.json, db.js)
├─ tests
├─ package.json
└─ README.md

3) Instalación
npm install

4) Ejecución y Swagger
API principal (Usuarios + Posts)
  npm run start:api
  Swagger: http://localhost:3000/api/documentacion

Microservicios
  Productos
    npm run start:productos
    Swagger: http://localhost:3001/documentacion
  Pedidos
    npm run start:pedidos
    Swagger: http://localhost:3002/documentacion

5) Variables de entorno útiles
API (src/)
  PORT (por defecto 3000)
  DB_PATH (por defecto src/data/db.json)
Micro Productos
  PORT (por defecto 3001)
Micro Pedidos
  PORT (por defecto 3002)
  PRODUCTOS_URL (por defecto http://localhost:3001)

6) Endpoints
API principal (http://localhost:3000)
  Usuarios
    GET  /api/usuarios
    POST /api/usuarios   Body: { "nombre":"Ana","email":"ana@e.com","password":"secreto" }
  Posts
    GET    /api/posts
    GET    /api/posts/:id
    POST   /api/posts    Body: { "userId":1,"titulo":"Hola","contenido":"Mundo" }
    DELETE /api/posts/:id

Micro Productos (http://localhost:3001)
  GET  /productos
  GET  /productos/:id
  POST /productos       Body: { "nombre":"Teclado","precio":99.9,"stock":10 }

Micro Pedidos (http://localhost:3002)
  GET  /pedidos
  POST /pedidos         Body: { "productoId":1,"cantidad":2,"nombreUsuario":"Ana" }

7) cURL rápidos (PowerShell usa curl.exe y comillas dobles dobles)
Usuarios (API)
  curl.exe -X POST "http://localhost:3000/api/usuarios" -H "Content-Type: application/json" --data-raw "{""nombre"":""Ana"",""email"":""ana@e.com"",""password"":""secreto""}"
  curl.exe "http://localhost:3000/api/usuarios"

Productos (micro)
  curl.exe -X POST "http://localhost:3001/productos" -H "Content-Type: application/json" --data-raw "{""nombre"":""Alfombrilla para Mouse"",""precio"":24.9,""stock"":10}"
  curl.exe "http://localhost:3001/productos"

Pedidos (micro)
  curl.exe -X POST "http://localhost:3002/pedidos" -H "Content-Type: application/json" --data-raw "{""productoId"":1,""cantidad"":2,""nombreUsuario"":""Ana""}"
  curl.exe "http://localhost:3002/pedidos"

8) Pruebas automatizadas
npm test
- Unitarias (validación de email, siguienteId)
- Integración (crear usuario, email duplicado, crear post con userId válido, 400/404)

9) CI/CD (GitHub Actions)
Archivo: .github/workflows/ci.yml
- CI: npm ci --workspaces, lint, npm test en cada push y PR a main
- CD: en main, despliegue via webhook (secreto DEPLOY_HOOK_URL en GitHub Secrets)

10) Swagger
API:       http://localhost:3000/api/documentacion
Productos: http://localhost:3001/documentacion
Pedidos:   http://localhost:3002/documentacion

11) Evidencias
Guardar capturas en docs/evidencias/ (usuarios_creacion_201.png, productos_creacion_201.png, pedidos_creacion_201.png, swagger_*.png, npm_test_ci.png, pull_request.png, rastro_ramas.png)

12) Flujo de trabajo (equipo)
- Repo público, una rama por estudiante, PRs a main
- Issues y Proyectos para trazabilidad
- Plantillas de PR/Issue en .github/

13) Historias de usuario (resumen)
- Registro: POST /api/usuarios (201), 409 email usado, 400 faltantes
- Posts: POST /api/posts (201 con userId válido), 404 userId no existe, 400 faltantes

14) Seguridad (nota académica)
- Password en texto plano solo para el curso
- En producción: hash con sal (bcrypt), no devolver password

15) Problemas comunes
- EADDRINUSE (puerto ocupado): liberar PID o cambiar PORT
- Cannot GET /: abrir /documentacion o rutas /productos /pedidos
- JSON inválido en PowerShell: usar Invoke-RestMethod o comillas dobles dobles
- Pedidos contra puerto distinto de productos: ajustar PRODUCTOS_URL