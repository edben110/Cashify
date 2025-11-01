# Control de Gastos - API REST

API REST completa para un sistema de control de gastos personales, desarrollada con Spring Boot 3.2, Java 21 y MongoDB.

## 📋 Características

- ✅ Arquitectura en tres capas (Controller → Service → Repository)
- ✅ Gestión completa de usuarios, categorías y transacciones
- ✅ Validación de datos con Bean Validation
- ✅ Manejo global de excepciones
- ✅ Documentación automática con Swagger/OpenAPI 3
- ✅ CORS habilitado para frontends
- ✅ Pruebas unitarias con JUnit 5 y Mockito
- ✅ Soporte para reportes y resúmenes financieros

## 🚀 Tecnologías

- **Java 21**
- **Spring Boot 3.2.0**
- **Spring Data MongoDB**
- **Spring Validation**
- **SpringDoc OpenAPI 3** (Swagger)
- **Lombok**
- **JUnit 5**
- **Mockito**
- **Maven**

## 📦 Estructura del Proyecto

```
Cashify/
├── back/                       # Backend Spring Boot
│   ├── src/main/java/com/controlgastos/
│   │   ├── controller/         # Endpoints REST
│   │   │   ├── UserController.java
│   │   │   ├── CategoriaController.java
│   │   │   └── TransaccionController.java
│   │   ├── service/            # Lógica de negocio
│   │   │   ├── UserService.java
│   │   │   ├── CategoriaService.java
│   │   │   └── TransaccionService.java
│   │   ├── repository/         # Acceso a MongoDB
│   │   │   ├── UserRepository.java
│   │   │   ├── CategoriaRepository.java
│   │   │   └── TransaccionRepository.java
│   │   ├── model/              # Entidades de dominio
│   │   │   ├── User.java
│   │   │   ├── Categoria.java
│   │   │   ├── Transaccion.java
│   │   │   └── TipoTransaccion.java
│   │   ├── dto/                # Data Transfer Objects
│   │   │   ├── UserRequestDTO.java
│   │   │   ├── UserResponseDTO.java
│   │   │   ├── CategoriaDTO.java
│   │   │   ├── TransaccionRequestDTO.java
│   │   │   ├── TransaccionResponseDTO.java
│   │   │   └── ResumenGastosDTO.java
│   │   ├── exception/          # Manejo de excepciones
│   │   │   ├── ResourceNotFoundException.java
│   │   │   ├── DuplicateResourceException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── config/             # Configuraciones
│   │   │   ├── CorsConfig.java
│   │   │   └── OpenAPIConfig.java
│   │   └── ControlGastosApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-atlas.properties
│   └── pom.xml
│
├── front/                      # Frontend Next.js
│   ├── app/                    # Pages y layouts
│   ├── components/             # Componentes React
│   ├── lib/                    # Utilidades y API client
│   └── package.json
│
└── scripts y configuración
    ├── start-backend.ps1       # Iniciar backend
    ├── start-frontend.ps1      # Iniciar frontend
    └── setup-atlas.ps1         # Configurar MongoDB Atlas
```

## 🔧 Configuración

### Requisitos Previos

1. **Java 21** instalado
2. **MongoDB Atlas** (cloud) o **MongoDB local** en `localhost:27017`
3. **Maven** instalado
4. **Node.js 18+** y **npm** (para el frontend)

### Configuración de MongoDB

La aplicación se conecta a MongoDB usando la siguiente URI (configurable en `application.properties`):

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/controlgastos
```

### Instalación y Ejecución

1. **Clonar el repositorio** (o ubicarse en la carpeta del proyecto)

2. **Ir a la carpeta del backend:**
   ```bash
   cd back
   ```

3. **Compilar el proyecto:**
   ```bash
   mvn clean install
   ```

4. **Ejecutar la aplicación:**
   ```bash
   mvn spring-boot:run
   ```
   
   O desde la raíz del proyecto:
   ```bash
   .\start-backend.ps1  # Windows PowerShell
   ./run.sh             # Linux/Mac
   ```

5. **La API estará disponible en:**
   - Base URL: `http://localhost:8080/api`
   - Swagger UI: `http://localhost:8080/swagger-ui.html`
   - API Docs: `http://localhost:8080/api-docs`

## 📚 Modelo de Datos

### Enumeración: TipoTransaccion
- `INGRESO`
- `GASTO`

### Entidad: User
- `id`: String (generado automáticamente)
- `apodo`: String (único, 3-50 caracteres)
- `correo`: String (único, formato email)
- `contraseña`: String (mínimo 6 caracteres)
- `transaccionesIds`: List<String>
- `categoriasIds`: List<String>

### Entidad: Categoria
- `id`: String (generado automáticamente)
- `nombre`: String (obligatorio)
- `userId`: String (referencia al usuario propietario)

### Entidad: Transaccion
- `id`: String (generado automáticamente)
- `tipoTransaccion`: TipoTransaccion (INGRESO/GASTO)
- `categoriaId`: String (referencia a categoría)
- `categoriaNombre`: String (desnormalizado)
- `descripcion`: String (obligatorio)
- `fecha`: LocalDateTime (obligatorio)
- `monto`: Double (positivo, obligatorio)
- `userId`: String (referencia al usuario propietario)

## 🔌 Endpoints de la API

### Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/usuarios` | Crear nuevo usuario |
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| GET | `/api/usuarios/apodo/{apodo}` | Obtener usuario por apodo |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

### Categorías (`/api/categorias`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/categorias/usuario/{userId}` | Crear categoría |
| GET | `/api/categorias/usuario/{userId}` | Obtener categorías de un usuario |
| GET | `/api/categorias/{id}` | Obtener categoría por ID |
| PUT | `/api/categorias/{id}` | Actualizar categoría |
| DELETE | `/api/categorias/{id}` | Eliminar categoría |

### Transacciones (`/api/transacciones`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/transacciones/usuario/{userId}` | Crear transacción |
| GET | `/api/transacciones/usuario/{userId}` | Obtener transacciones de un usuario |
| GET | `/api/transacciones/usuario/{userId}/tipo/{tipo}` | Filtrar por tipo (INGRESO/GASTO) |
| GET | `/api/transacciones/usuario/{userId}/fecha` | Filtrar por rango de fechas |
| GET | `/api/transacciones/usuario/{userId}/categoria/{categoriaId}` | Filtrar por categoría |
| GET | `/api/transacciones/{id}` | Obtener transacción por ID |
| PUT | `/api/transacciones/{id}` | Actualizar transacción |
| DELETE | `/api/transacciones/{id}` | Eliminar transacción |
| GET | `/api/transacciones/usuario/{userId}/resumen` | Calcular resumen general |
| GET | `/api/transacciones/usuario/{userId}/resumen/periodo` | Resumen por periodo |

## 📝 Ejemplos de Uso

### Crear un Usuario

```json
POST /api/usuarios
Content-Type: application/json

{
  "apodo": "juan123",
  "correo": "juan@example.com",
  "contraseña": "mipassword"
}
```

### Crear una Categoría

```json
POST /api/categorias/usuario/{userId}
Content-Type: application/json

{
  "nombre": "Alimentos"
}
```

### Crear una Transacción (Gasto)

```json
POST /api/transacciones/usuario/{userId}
Content-Type: application/json

{
  "tipoTransaccion": "GASTO",
  "categoriaId": "cat123",
  "descripcion": "Compra de supermercado",
  "fecha": "2025-10-28T14:30:00",
  "monto": 150.50
}
```

### Obtener Resumen de Gastos

```
GET /api/transacciones/usuario/{userId}/resumen
```

**Respuesta:**
```json
{
  "totalIngresos": 5000.0,
  "totalGastos": 2500.0,
  "balance": 2500.0,
  "cantidadIngresos": 3,
  "cantidadGastos": 15,
  "periodo": "Todos los periodos"
}
```

## 🧪 Pruebas

Ejecutar todas las pruebas unitarias:

```bash
mvn test
```

Las pruebas incluyen:
- `UserServiceTest`: 9 casos de prueba
- `CategoriaServiceTest`: 7 casos de prueba  
- `TransaccionServiceTest`: 10 casos de prueba

## 🔐 Validaciones

La API implementa validaciones en los DTOs:

- **Usuario:**
  - Apodo: 3-50 caracteres, único
  - Correo: formato email válido, único
  - Contraseña: mínimo 6 caracteres

- **Categoría:**
  - Nombre: no puede estar vacío
  - Único por usuario

- **Transacción:**
  - Tipo: INGRESO o GASTO
  - Monto: positivo, obligatorio
  - Fecha: obligatoria
  - Descripción: obligatoria

## 🛠️ Manejo de Errores

La API retorna respuestas estructuradas para errores:

```json
{
  "timestamp": "2025-10-28T14:30:00",
  "status": 404,
  "error": "Recurso no encontrado",
  "message": "Usuario no encontrado con id: '123'",
  "path": "/api/usuarios/123"
}
```

Códigos de estado HTTP:
- `200 OK` - Operación exitosa
- `201 Created` - Recurso creado
- `204 No Content` - Eliminación exitosa
- `400 Bad Request` - Error de validación
- `404 Not Found` - Recurso no encontrado
- `409 Conflict` - Recurso duplicado
- `500 Internal Server Error` - Error del servidor

## 📖 Documentación Swagger

La documentación interactiva de la API está disponible en:

**http://localhost:8080/swagger-ui.html**

Desde allí puedes:
- Ver todos los endpoints disponibles
- Probar las operaciones directamente
- Ver los modelos de datos
- Consultar códigos de respuesta

## 🌐 CORS

CORS está habilitado para los siguientes orígenes (configurable en `CorsConfig.java`):

- `http://localhost:3000` (React)
- `http://localhost:4200` (Angular)
- `http://localhost:8081` (Vue)
- `http://localhost:5173` (Vite)

## 👥 Historias de Usuario

Esta API implementa las historias de usuario especificadas en:
https://github.com/migueltovarb/ISWDISENO202502-1EdwarBenito/issues

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Sistema Control de Gastos - Edwar Benito
Proyecto de Ingeniería de Software y Diseño 2025-02

---

**¡Listo para usar! 🚀**

Para cualquier duda o consulta, consulta la documentación en Swagger UI.
