##Taller CI/CD 

Este es un proyecto de aula en el que construimos una aplicación pequeña dividida en tres partes que se comunican entre sí: una API principal que gestiona usuarios y posts, un microservicio de productos y un microservicio de pedidos que utiliza la información de productos.

---

## 1) Objetivo del proyecto 
- **Aprender** cómo organizar mejor un proyecto en Node.js/Express.
- **Separar** funciones en partes pequeñas (microservicios) para que sea más fácil de mantener.
- **Probar** que cada parte funciona (con pruebas automáticas).
- **Automatizar** tareas básicas (con GitHub Actions) para que el proyecto sea más confiable.

---

## 2) ¿Qué contiene el proyecto?
Estructura principal:

```
Taller-CI-CD/
├─ .github/workflows/ci.yml        # Automatización (CI/CD)
├─ docs/
│  └─ evidencias/                  # Aquí irán las capturas de pantalla
├─ micros/
│  ├─ productos/                   # **Microservicio de productos**
│  └─ pedidos/                     # **Microservicio de pedidos**
├─ src/                            # **API principal (usuarios + posts)**
│  └─ ...                          # Archivos internos (no te preocupes por ellos)
├─ tests/                          # Pruebas automáticas
├─ package.json                    # Lista de dependencias y atajos de comandos
└─ README.md
```

---

## 3) Instalación (paso a paso)
1. **Descarga** el proyecto (o clónalo) a tu computador.  
2. **Abre una terminal** dentro de la carpeta del proyecto `Taller-CI-CD`.
3. Escribe:
   ```bash
   npm install
   ```
   y espera a que termine (descarga lo necesario una sola vez).

---

## 4) ¿Cómo lo enciendo? (paso a paso)
Tendrás **tres servicios**: la API principal y dos microservicios. Puedes abrir **tres terminales** (una por servicio) o iniciarlos uno por uno.

### 4.1 API principal (Usuarios + Posts)
1. En la terminal, escribe:
   ```bash
   npm run start:api
   ```
2. Si todo va bien, verás un mensaje como:  
   `API escuchando en http://localhost:3000`

**Cómo comprobar**: Abre tu navegador y visita:  
👉 `http://localhost:3000/api/documentacion`  
Deberías ver una página de **Swagger** (un explorador de la API).

### 4.2 Microservicio de Productos
1. Abre otra terminal en el mismo proyecto.
2. Escribe:
   ```bash
   npm run start:productos
   ```
3. Debería iniciar en: `http://localhost:3001`

**Cómo comprobar**: visita en el navegador:  
👉 `http://localhost:3001/documentacion`

### 4.3 Microservicio de Pedidos
1. Abre otra terminal.
2. Escribe:
   ```bash
   npm run start:pedidos
   ```
3. Debería iniciar en: `http://localhost:3002`

**Cómo comprobar**: visita en el navegador:  
👉 `http://localhost:3002/documentacion`

---

## 5) Probar atraves de swagger (solo navegador)
Atravez del navegador podemos probrar  **Swagger**, que permite “hacer clic” en los endpoints.

### 5.1 Crear un usuario
1. Entra a `http://localhost:3000/api/documentacion`.
2. Busca la sección **Usuarios** → `POST /api/usuarios`.
3. Pulsa **Try it out** (o “Probar”).
4. En el cuadro de ejemplo, deja algo como:
   ```json
   { "nombre": "Juan Perez Ruiz", "email": "JuanPerezR@gmail.com", "password": "123" }
   ```
5. Pulsa **Execute** (o “Ejecutar”).  
6. Debes ver una **respuesta 201** (creado).

### 5.2 Ver la lista de usuarios
- En la misma página, elige **GET /api/usuarios** → **Execute**.  
  Deberías ver un listado con la usuario “Juan”.

### 5.3 Crear un producto
- En `http://localhost:3001/documentacion`, busca **POST /productos** y crea uno, por ejemplo:
  ```json
  { "nombre": "Teclado", "precio": 99.9, "stock": 10 }
  ```

### 5.4 Crear un pedido
- En `http://localhost:3002/documentacion`, usa **POST /pedidos** con algo como:
  ```json
  { "productoId": 1, "cantidad": 2, "nombreUsuario": "Juan" }
  ```
- Si todo está bien, verás un pedido creado que hace referencia a ese producto.

---

## 6) Evidencias 
Guarda capturas con nombres claros dentro de `docs/evidencias/`:
- `usuarios_creacion.png` (usuario creado)
- `usuarios_listado.png` (lista de usuarios)
- `crear_posts.png`  (creacion de posts)
- `obtener_posts.png`  (lista de posts)
- `craer_producto.png` (producto creado)
- `craer_pedidos.png` (pedido creado)
- `swagger_api.png`, `swagger_productos.png`, `swagger_pedidos.png`

---

## 7) Direcciones útiles 
- API principal (Swagger): **http://localhost:3000/api/documentacion**
- Productos (Swagger): **http://localhost:3001/documentacion**
- Pedidos (Swagger): **http://localhost:3002/documentacion**

---

## 8) Integrantes
Desarollado por: 
-Leidy Johana Arboleda Sánchez
-Miguel Ángel Isaza Fajardo
-Carolina Palacio Gutiérrez
