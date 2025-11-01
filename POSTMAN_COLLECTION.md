# 📮 Colección Postman - Control de Gastos API

Esta es una guía para probar la API usando Postman o cualquier cliente HTTP.

## 🔗 Variables de Entorno (Opcional)

Puedes crear estas variables en Postman para facilitar las pruebas:

```
baseUrl = http://localhost:8080/api
userId = (se obtiene después de crear un usuario)
categoriaId = (se obtiene después de crear una categoría)
transaccionId = (se obtiene después de crear una transacción)
```

---

## 👤 USUARIOS

### 1. Crear Usuario
```http
POST {{baseUrl}}/usuarios
Content-Type: application/json

{
  "apodo": "juan123",
  "correo": "juan@example.com",
  "contraseña": "password123"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": "67200a1b2c3d4e5f6g7h8i9j",
  "apodo": "juan123",
  "correo": "juan@example.com",
  "transaccionesIds": [],
  "categoriasIds": [],
  "totalTransacciones": 0,
  "totalCategorias": 0
}
```

### 2. Obtener Todos los Usuarios
```http
GET {{baseUrl}}/usuarios
```

### 3. Obtener Usuario por ID
```http
GET {{baseUrl}}/usuarios/{{userId}}
```

### 4. Obtener Usuario por Apodo
```http
GET {{baseUrl}}/usuarios/apodo/juan123
```

### 5. Actualizar Usuario
```http
PUT {{baseUrl}}/usuarios/{{userId}}
Content-Type: application/json

{
  "apodo": "juan_actualizado",
  "correo": "juan_nuevo@example.com",
  "contraseña": "newpassword456"
}
```

### 6. Eliminar Usuario
```http
DELETE {{baseUrl}}/usuarios/{{userId}}
```

---

## 📁 CATEGORÍAS

### 1. Crear Categoría
```http
POST {{baseUrl}}/categorias/usuario/{{userId}}
Content-Type: application/json

{
  "nombre": "Alimentos"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": "cat123abc456def789",
  "nombre": "Alimentos",
  "userId": "67200a1b2c3d4e5f6g7h8i9j"
}
```

### 2. Crear Más Categorías (Ejemplos)

**Transporte:**
```http
POST {{baseUrl}}/categorias/usuario/{{userId}}
Content-Type: application/json

{
  "nombre": "Transporte"
}
```

**Entretenimiento:**
```http
POST {{baseUrl}}/categorias/usuario/{{userId}}
Content-Type: application/json

{
  "nombre": "Entretenimiento"
}
```

**Salud:**
```http
POST {{baseUrl}}/categorias/usuario/{{userId}}
Content-Type: application/json

{
  "nombre": "Salud"
}
```

### 3. Obtener Categorías de un Usuario
```http
GET {{baseUrl}}/categorias/usuario/{{userId}}
```

### 4. Obtener Categoría por ID
```http
GET {{baseUrl}}/categorias/{{categoriaId}}
```

### 5. Actualizar Categoría
```http
PUT {{baseUrl}}/categorias/{{categoriaId}}
Content-Type: application/json

{
  "nombre": "Alimentos y Bebidas"
}
```

### 6. Eliminar Categoría
```http
DELETE {{baseUrl}}/categorias/{{categoriaId}}
```

---

## 💰 TRANSACCIONES

### 1. Crear Transacción - GASTO
```http
POST {{baseUrl}}/transacciones/usuario/{{userId}}
Content-Type: application/json

{
  "tipoTransaccion": "GASTO",
  "categoriaId": "{{categoriaId}}",
  "descripcion": "Compra de supermercado",
  "fecha": "2025-10-28T14:30:00",
  "monto": 150.50
}
```

**Respuesta exitosa (201):**
```json
{
  "id": "trans123xyz456",
  "tipoTransaccion": "GASTO",
  "categoriaId": "cat123abc456def789",
  "categoriaNombre": "Alimentos",
  "descripcion": "Compra de supermercado",
  "fecha": "2025-10-28T14:30:00",
  "monto": 150.50,
  "userId": "67200a1b2c3d4e5f6g7h8i9j"
}
```

### 2. Crear Transacción - INGRESO
```http
POST {{baseUrl}}/transacciones/usuario/{{userId}}
Content-Type: application/json

{
  "tipoTransaccion": "INGRESO",
  "categoriaId": "{{categoriaId}}",
  "descripcion": "Salario mensual",
  "fecha": "2025-10-01T09:00:00",
  "monto": 3000.00
}
```

### 3. Ejemplos de Más Transacciones

**Gasto - Transporte:**
```http
POST {{baseUrl}}/transacciones/usuario/{{userId}}
Content-Type: application/json

{
  "tipoTransaccion": "GASTO",
  "categoriaId": "{{categoriaIdTransporte}}",
  "descripcion": "Gasolina",
  "fecha": "2025-10-15T08:00:00",
  "monto": 60.00
}
```

**Gasto - Entretenimiento:**
```http
POST {{baseUrl}}/transacciones/usuario/{{userId}}
Content-Type: application/json

{
  "tipoTransaccion": "GASTO",
  "categoriaId": "{{categoriaIdEntretenimiento}}",
  "descripcion": "Cine con amigos",
  "fecha": "2025-10-20T19:30:00",
  "monto": 25.00
}
```

**Ingreso - Freelance:**
```http
POST {{baseUrl}}/transacciones/usuario/{{userId}}
Content-Type: application/json

{
  "tipoTransaccion": "INGRESO",
  "categoriaId": "{{categoriaIdIngresos}}",
  "descripcion": "Proyecto freelance",
  "fecha": "2025-10-25T16:00:00",
  "monto": 500.00
}
```

### 4. Obtener Todas las Transacciones de un Usuario
```http
GET {{baseUrl}}/transacciones/usuario/{{userId}}
```

### 5. Filtrar por Tipo - Solo GASTOS
```http
GET {{baseUrl}}/transacciones/usuario/{{userId}}/tipo/GASTO
```

### 6. Filtrar por Tipo - Solo INGRESOS
```http
GET {{baseUrl}}/transacciones/usuario/{{userId}}/tipo/INGRESO
```

### 7. Filtrar por Categoría
```http
GET {{baseUrl}}/transacciones/usuario/{{userId}}/categoria/{{categoriaId}}
```

### 8. Filtrar por Rango de Fechas
```http
GET {{baseUrl}}/transacciones/usuario/{{userId}}/fecha?fechaInicio=2025-10-01T00:00:00&fechaFin=2025-10-31T23:59:59
```

### 9. Obtener Transacción por ID
```http
GET {{baseUrl}}/transacciones/{{transaccionId}}
```

### 10. Actualizar Transacción
```http
PUT {{baseUrl}}/transacciones/{{transaccionId}}
Content-Type: application/json

{
  "tipoTransaccion": "GASTO",
  "categoriaId": "{{categoriaId}}",
  "descripcion": "Compra de supermercado - ACTUALIZADO",
  "fecha": "2025-10-28T15:00:00",
  "monto": 175.75
}
```

### 11. Eliminar Transacción
```http
DELETE {{baseUrl}}/transacciones/{{transaccionId}}
```

---

## 📊 REPORTES Y RESÚMENES

### 1. Obtener Resumen General
```http
GET {{baseUrl}}/transacciones/usuario/{{userId}}/resumen
```

**Respuesta:**
```json
{
  "totalIngresos": 3500.00,
  "totalGastos": 235.50,
  "balance": 3264.50,
  "cantidadIngresos": 2,
  "cantidadGastos": 3,
  "periodo": "Todos los periodos"
}
```

### 2. Obtener Resumen por Periodo
```http
GET {{baseUrl}}/transacciones/usuario/{{userId}}/resumen/periodo?fechaInicio=2025-10-01T00:00:00&fechaFin=2025-10-31T23:59:59
```

**Respuesta:**
```json
{
  "totalIngresos": 3500.00,
  "totalGastos": 235.50,
  "balance": 3264.50,
  "cantidadIngresos": 2,
  "cantidadGastos": 3,
  "periodo": "Desde 2025-10-01 hasta 2025-10-31"
}
```

---

## 🧪 FLUJO COMPLETO DE PRUEBA

### Secuencia Recomendada:

1. **Crear un usuario** → Guardar el `userId`
2. **Crear categorías** (3-4 categorías) → Guardar los `categoriaId`
3. **Crear ingresos** (2-3 transacciones de tipo INGRESO)
4. **Crear gastos** (5-10 transacciones de tipo GASTO)
5. **Probar filtros:**
   - Por tipo (INGRESO/GASTO)
   - Por categoría
   - Por rango de fechas
6. **Ver resúmenes:**
   - Resumen general
   - Resumen por periodo
7. **Actualizar** alguna transacción
8. **Eliminar** alguna transacción de prueba

---

## ❌ EJEMPLOS DE RESPUESTAS DE ERROR

### Error 400 - Validación
```json
{
  "timestamp": "2025-10-28T14:30:00",
  "status": 400,
  "error": "Error de validación",
  "validationErrors": {
    "apodo": "El apodo debe tener entre 3 y 50 caracteres",
    "correo": "El correo debe ser válido",
    "contraseña": "La contraseña debe tener al menos 6 caracteres"
  },
  "path": "/api/usuarios"
}
```

### Error 404 - No Encontrado
```json
{
  "timestamp": "2025-10-28T14:30:00",
  "status": 404,
  "error": "Recurso no encontrado",
  "message": "Usuario no encontrado con id: '123xyz'",
  "path": "/api/usuarios/123xyz"
}
```

### Error 409 - Conflicto (Duplicado)
```json
{
  "timestamp": "2025-10-28T14:30:00",
  "status": 409,
  "error": "Conflicto de datos",
  "message": "Usuario ya existe con apodo: 'juan123'",
  "path": "/api/usuarios"
}
```

---

## 📥 IMPORTAR EN POSTMAN

### Opción 1: Crear Manualmente
1. Abre Postman
2. Crea una nueva colección "Control de Gastos API"
3. Copia y pega cada endpoint de esta guía
4. Configura las variables de entorno

### Opción 2: Swagger
1. Accede a http://localhost:8080/swagger-ui.html
2. Usa "Try it out" para probar directamente
3. Copia los ejemplos a Postman si lo prefieres

---

## 💡 TIPS

1. **Usa Variables**: Define `baseUrl`, `userId`, `categoriaId` como variables de entorno
2. **Scripts de Test**: Puedes agregar scripts en Postman para guardar automáticamente los IDs
3. **Colecciones**: Organiza los endpoints por entidad (Usuarios, Categorías, Transacciones)
4. **Ordenamiento**: Ordena las peticiones en el flujo lógico de uso

---

## 🔄 EJEMPLO DE SCRIPT POSTMAN

Para guardar automáticamente el `userId` después de crear un usuario:

```javascript
// En la pestaña "Tests" de la petición POST /usuarios
pm.test("Usuario creado exitosamente", function () {
    pm.response.to.have.status(201);
    var jsonData = pm.response.json();
    pm.environment.set("userId", jsonData.id);
});
```

---

**¡Listo para probar la API! 🚀**
