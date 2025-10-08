# Guía sencilla del proyecto — Taller CI/CD (Express)

Esta guía explica **en palabras simples** qué hace el proyecto, cómo ponerlo a funcionar y cómo comprobar que todo anda bien. No necesitas ser experto en programación para seguirla.

> **¿Qué es este proyecto?**  
> Es una pequeña aplicación de ejemplo con tres partes:
> 1) Una **API principal** para manejar *usuarios* y *posts*.
> 2) Un microservicio de **productos**.
> 3) Un microservicio de **pedidos** que usa los productos.
>
> Todo corre en tu propio computador y se puede probar desde el navegador.

---

## 1) Objetivo del proyecto (en corto)
- **Aprender** cómo organizar mejor un proyecto en Node.js/Express.
- **Separar** funciones en partes pequeñas (microservicios) para que sea más fácil de mantener.
- **Probar** que cada parte funciona (con pruebas automáticas).
- **Documentar** lo que hicimos para que cualquiera pueda entenderlo.
- **Automatizar** tareas básicas (con GitHub Actions) para que el proyecto sea más confiable.

---

## 2) ¿Qué es una API? ¿y qué son microservicios?
- **API**: imagina un restaurante. La API es el *mesero*: recibe pedidos (solicitudes), se los pasa a la cocina (el sistema) y devuelve el resultado (la respuesta).  
- **Microservicios**: en vez de una sola “gran cocina”, tenemos varias “cocinas pequeñas”. Una cocina hace **productos** y otra cocina hace **pedidos**. Esto ayuda a organizarse mejor.

---

## 3) Lo que necesitas antes de empezar
- **Node.js 18 o más nuevo** y **npm 7 o más nuevo** (son herramientas para correr el proyecto).  
- Un navegador (Chrome, Edge, Firefox, etc.).  
- Opcional: **PowerShell 7** en Windows (si usas Windows viejo, igual puedes seguir los pasos).

> **Cómo saber tu versión de Node.js**: abre una terminal y escribe `node -v`. Si ves algo como `v18.x.x`, estás bien.

---

## 4) ¿Qué contiene el proyecto?
Estructura principal (lo importante está en negrita):

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

## 5) Instalación (paso a paso)
1. **Descarga** el proyecto (o clónalo) a tu computador.  
2. **Abre una terminal** dentro de la carpeta del proyecto `Taller-CI-CD`.
3. Escribe:
   ```bash
   npm install
   ```
   y espera a que termine (descarga lo necesario una sola vez).

> Si aparece un error, revisa la sección **“Solución de problemas”** más abajo.

---

## 6) ¿Cómo lo enciendo? (paso a paso)
Tendrás **tres servicios**: la API principal y dos microservicios. Puedes abrir **tres terminales** (una por servicio) o iniciarlos uno por uno.

### 6.1 API principal (Usuarios + Posts)
1. En la terminal, escribe:
   ```bash
   npm run start:api
   ```
2. Si todo va bien, verás un mensaje como:  
   `API escuchando en http://localhost:3000`

**Cómo comprobar**: Abre tu navegador y visita:  
👉 `http://localhost:3000/api/documentacion`  
Deberías ver una página de **Swagger** (un explorador de la API).

### 6.2 Microservicio de Productos
1. Abre otra terminal en el mismo proyecto.
2. Escribe:
   ```bash
   npm run start:productos
   ```
3. Debería iniciar en: `http://localhost:3001`

**Cómo comprobar**: visita en el navegador:  
👉 `http://localhost:3001/documentacion`

### 6.3 Microservicio de Pedidos
1. Abre otra terminal.
2. Escribe:
   ```bash
   npm run start:pedidos
   ```
3. Debería iniciar en: `http://localhost:3002`

**Cómo comprobar**: visita en el navegador:  
👉 `http://localhost:3002/documentacion`

> Si ves “Cannot GET /”, no te preocupes: entra a las direcciones de **documentación** indicadas arriba.

---

## 7) Probar sin herramientas raras (solo navegador)
Puedes usar el navegador gracias a **Swagger**, que permite “hacer clic” en los endpoints.

### 7.1 Crear un usuario
1. Entra a `http://localhost:3000/api/documentacion`.
2. Busca la sección **Usuarios** → `POST /api/usuarios`.
3. Pulsa **Try it out** (o “Probar”).
4. En el cuadro de ejemplo, deja algo como:
   ```json
   { "nombre": "Ana", "email": "ana@e.com", "password": "secreto" }
   ```
5. Pulsa **Execute** (o “Ejecutar”).  
6. Debes ver una **respuesta 201** (creado).

### 7.2 Ver la lista de usuarios
- En la misma página, elige **GET /api/usuarios** → **Execute**.  
  Deberías ver un listado con la usuaria “Ana”.

### 7.3 Crear un producto
- En `http://localhost:3001/documentacion`, busca **POST /productos** y crea uno, por ejemplo:
  ```json
  { "nombre": "Teclado", "precio": 99.9, "stock": 10 }
  ```

### 7.4 Crear un pedido
- En `http://localhost:3002/documentacion`, usa **POST /pedidos** con algo como:
  ```json
  { "productoId": 1, "cantidad": 2, "nombreUsuario": "Ana" }
  ```
- Si todo está bien, verás un pedido creado que hace referencia a ese producto.

> **Consejo**: toma **capturas** de estas pantallas como evidencia del funcionamiento y guárdalas en `docs/evidencias/`.

---

## 8) Historias de uso (qué casos cubre)
- **Registro de usuario**: crear una cuenta nueva.  
  - Respuesta esperada: **201 Creado**.
  - Si el email ya existe: **409** (conflicto).
  - Si faltan datos: **400** (solicitud incorrecta).
- **Publicar un post**: crear un post usando el `userId` de un usuario real.  
  - Si el usuario no existe: **404** (no encontrado).
- **Gestionar productos**: ver productos, crear nuevos y consultarlos por id.
- **Generar pedidos**: crear pedidos que referencian un producto existente.

---

## 9) Evidencias sugeridas (para tu informe)
Guarda capturas con nombres claros dentro de `docs/evidencias/`:
- `usuarios_creacion_201.png` (usuario creado)
- `usuarios_listado_200.png` (lista de usuarios)
- `productos_creacion_201.png` (producto creado)
- `pedidos_creacion_201.png` (pedido creado)
- `swagger_api.png`, `swagger_productos.png`, `swagger_pedidos.png`
- `npm_test_ci.png` (resultado de pruebas)
- `pull_request.png` (ejemplo de PR)
- `rastro_ramas.png` (historial de ramas)

> **Tip**: añade una breve descripción debajo de cada captura en tu informe final.

---

## 10) Pruebas automáticas (explicadas simple)
El proyecto trae pruebas para verificar que las funciones básicas no se rompan.  
Para ejecutarlas, en la terminal escribe:
```bash
npm test
```
- Verifica, por ejemplo, que el email sea válido y que se puedan crear usuarios y posts correctamente.  
- Si algo falla, el terminal te lo dirá con un mensaje claro.

> Aunque no programes las pruebas, **correrlas** te ayuda a comprobar que “todo sigue bien” después de cambiar algo.

---

## 11) Trabajo en equipo (recomendado)
- Cada persona trabaja en su **propia rama** (por ejemplo: `feat/mi-aporte`).
- Cuando terminas una parte, haces un **Pull Request (PR)** hacia `main`.
- Usa **Issues** para anotar tareas pendientes y **Projects** para organizarse.
- Deja mensajes de commit **claros** (“qué hiciste y por qué”).

> Esto facilita revisar cambios y evita pisarse el trabajo.

---

## 12) Seguridad y datos (lenguaje claro)
- Las contraseñas en este proyecto **no están encriptadas** (solo con fines de aprendizaje).  
  En un sistema real, siempre deben guardarse en forma **encriptada** (ej.: *bcrypt*).
- No compartas datos reales sensibles cuando hagas pruebas.
- Si piensas conectar esto a internet, consulta con alguien más técnico antes.

---

## 13) Solución de problemas (FAQ sencilla)

**A) Entro a `http://localhost:3000` y dice “Cannot GET /”. ¿Está mal?**  
No. Entra a `http://localhost:3000/api/documentacion` para ver la página de pruebas (Swagger).
Lo mismo para productos y pedidos: `/documentacion`.

**B) Me dice que el puerto está ocupado (EADDRINUSE). ¿Qué hago?**  
Puede que otra cosa esté usando ese número (3000, 3001 o 3002).  
Cierra el programa que lo usa o cambia la variable `PORT` en el archivo `.env` del servicio.

**C) Windows me da problemas con comillas o con `&&`.**  
Usa **PowerShell 7** o ejecuta los comandos **uno por uno**. En Swagger puedes probar sin usar la terminal.

**D) Los pedidos no encuentran productos.**  
Revisa que **productos** esté encendido (`http://localhost:3001`) y que **pedidos** apunte a la dirección correcta.  
La variable debería ser: `PRODUCTOS_URL=http://localhost:3001`

**E) No sé si mi servicio está encendido.**  
Si la página `.../documentacion` carga en el navegador, está encendido. Si no, revisa la terminal para ver errores.

**F) ¿Dónde están los datos?**  
Se guardan en archivos **JSON** dentro del proyecto (por ejemplo, `src/data/db.json`). Son “bases de datos” sencillas para este ejercicio.

---

## 14) Glosario rápido
- **Endpoint**: una dirección específica (URL) para hacer una acción (ej.: crear usuario).
- **Puerto**: número que identifica por dónde “escucha” un servicio en tu PC (3000, 3001, 3002).
- **Swagger**: página web para *probar* la API con clics.
- **JSON**: formato de texto para enviar y recibir datos (como llenar un formulario).

---

## 15) Checklist de entrega (marca lo que ya hiciste)
- [ ] Instalé dependencias (`npm install`).
- [ ] La API principal enciende y abre Swagger (`:3000/api/documentacion`).
- [ ] Productos enciende y abre Swagger (`:3001/documentacion`).
- [ ] Pedidos enciende y abre Swagger (`:3002/documentacion`).
- [ ] Pude **crear** y **listar** usuarios.
- [ ] Pude **crear** un producto.
- [ ] Pude **crear** un pedido usando un producto.
- [ ] Corrí las **pruebas** (`npm test`).
- [ ] Guardé **evidencias** en `docs/evidencias/`.

---

## 16) Direcciones útiles (para copiar y pegar)
- API principal (Swagger): **http://localhost:3000/api/documentacion**
- Productos (Swagger): **http://localhost:3001/documentacion**
- Pedidos (Swagger): **http://localhost:3002/documentacion**

> Recuerda: puedes probar casi todo desde esas pantallas, sin instalar programas extra.

---

## 17) Créditos y licencia
Este proyecto es con fines **académicos**. Si lo reutilizas, menciona a tu equipo y al curso.
