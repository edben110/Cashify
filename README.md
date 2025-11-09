# 💰 CA$HIFY - Sistema de Control de Gastos

> Sistema completo de gestión financiera personal con interfaz retro-terminal. Backend REST API en Spring Boot + Frontend interactivo en Next.js.

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📋 Características Principales

### Backend (Spring Boot)
- ✅ **API REST completa** con arquitectura en capas (Controller → Service → Repository)
- ✅ **Gestión de usuarios** con autenticación por correo/contraseña
- ✅ **Categorías personalizadas** por usuario
- ✅ **Transacciones** (ingresos y gastos) con filtros avanzados
- ✅ **Resúmenes financieros** generales y por periodo
- ✅ **Validación automática** con Bean Validation
- ✅ **Manejo global de excepciones** con respuestas estructuradas
- ✅ **Documentación interactiva** con Swagger/OpenAPI 3
- ✅ **CORS configurado** dinámicamente por variables de entorno
- ✅ **Tests unitarios** con JUnit 5 y Mockito (26+ pruebas)

### Frontend (Next.js)
- 🎨 **Diseño retro-terminal** con tema neon green (#39FF14)
- 🔐 **Sistema de login** con validación de credenciales
- 📊 **Dashboard interactivo** con tabs para Resumen/Transacciones/Categorías
- 📅 **Filtros por fecha** con opciones rápidas (última semana/mes/año)
- 📈 **Estadísticas visuales** por categoría con barras de progreso
- 💸 **Gestión completa de transacciones** (crear, editar, eliminar)
- 🏷️ **Administración de categorías** personalizadas
- ⚡ **Scrollbar personalizada** con estilo retro
- 🎯 **Interfaz responsive** con efectos CRT y scanlines

---

## 🚀 Stack Tecnológico

### Backend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Java | 21 | Lenguaje principal |
| Spring Boot | 3.2.0 | Framework backend |
| Spring Data MongoDB | 3.2.0 | Persistencia NoSQL |
| Spring Validation | 3.2.0 | Validación de datos |
| SpringDoc OpenAPI | 2.3.0 | Documentación API |
| Lombok | 1.18.30 | Reducción de boilerplate |
| JUnit 5 | 5.10.1 | Framework de testing |
| Mockito | 5.7.0 | Mocking para tests |
| Maven | 3.9+ | Gestión de dependencias |

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| Next.js | 14.0.0 | Framework React |
| React | 18.2.0 | Librería UI |
| TypeScript | 5.2.2 | Tipado estático |
| Tailwind CSS | 3.3.5 | Estilos utility-first |
| Axios | 1.6.0 | Cliente HTTP |

### Base de Datos
- **MongoDB Atlas** (Cloud) - Cluster gratuito M0
- **Colecciones**: `usuarios`, `categorias`, `transacciones`

---

## 📦 Estructura del Proyecto

```
Cashify/
├── 📂 back/                              # Backend Spring Boot
│   ├── 📂 src/main/java/com/controlgastos/
│   │   ├── 📂 controller/                # 🔌 Endpoints REST
│   │   │   ├── UserController.java       # Gestión de usuarios + login
│   │   │   ├── CategoriaController.java  # CRUD de categorías
│   │   │   └── TransaccionController.java # CRUD transacciones + resúmenes
│   │   ├── 📂 service/                   # 💼 Lógica de negocio
│   │   │   ├── UserService.java          # Autenticación y usuarios
│   │   │   ├── CategoriaService.java     # Gestión de categorías
│   │   │   └── TransaccionService.java   # Gestión de transacciones
│   │   ├── 📂 repository/                # 🗄️ Acceso a MongoDB
│   │   │   ├── UserRepository.java
│   │   │   ├── CategoriaRepository.java
│   │   │   └── TransaccionRepository.java
│   │   ├── 📂 model/                     # 📊 Entidades de dominio
│   │   │   ├── User.java                 # Usuario (con refs)
│   │   │   ├── Categoria.java            # Categoría
│   │   │   ├── Transaccion.java          # Ingreso/Gasto
│   │   │   └── TipoTransaccion.java      # Enum: INGRESO/GASTO
│   │   ├── 📂 dto/                       # 📋 Data Transfer Objects
│   │   │   ├── LoginRequestDTO.java      # Credenciales de login
│   │   │   ├── UserRequestDTO.java       # Crear/actualizar usuario
│   │   │   ├── UserResponseDTO.java      # Usuario (sin password)
│   │   │   ├── CategoriaDTO.java         # Categoría
│   │   │   ├── TransaccionRequestDTO.java # Crear/actualizar transacción
│   │   │   ├── TransaccionResponseDTO.java # Transacción con nombre categoría
│   │   │   └── ResumenGastosDTO.java     # Resumen financiero
│   │   ├── 📂 exception/                 # ⚠️ Manejo de errores
│   │   │   ├── ResourceNotFoundException.java
│   │   │   ├── DuplicateResourceException.java
│   │   │   ├── UnauthorizedException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── 📂 config/                    # ⚙️ Configuraciones
│   │   │   ├── CorsConfig.java           # CORS dinámico
│   │   │   ├── MongoConfig.java          # MongoDB config
│   │   │   └── OpenAPIConfig.java        # Swagger config
│   │   └── ControlGastosApplication.java # 🚀 Main class
│   ├── 📂 src/main/resources/
│   │   ├── application.properties        # Config local
│   │   ├── application-prod.properties   # Config producción
│   │   └── application-atlas.properties  # Config MongoDB Atlas
│   ├── 📂 src/test/java/                 # 🧪 Tests unitarios
│   │   ├── UserServiceTest.java          # 9 tests
│   │   ├── CategoriaServiceTest.java     # 7 tests
│   │   └── TransaccionServiceTest.java   # 10 tests
│   ├── Dockerfile                        # 🐳 Docker multi-stage
│   ├── render.yaml                       # ☁️ Config Render
│   ├── .dockerignore                     # Exclusiones Docker
│   ├── .env.example                      # Ejemplo variables entorno
│   └── pom.xml                           # Maven config
│
├── 📂 front/                             # Frontend Next.js
│   ├── 📂 app/                           # App Router de Next.js
│   │   ├── globals.css                   # Estilos globales retro
│   │   ├── layout.tsx                    # Layout raíz
│   │   └── page.tsx                      # Página principal
│   ├── 📂 components/                    # ⚛️ Componentes React
│   │   ├── Login.tsx                     # Login con validación
│   │   ├── UserSelector.tsx              # Selección/creación usuario
│   │   ├── Dashboard.tsx                 # Dashboard principal
│   │   ├── Summary.tsx                   # Resumen con filtros de fecha
│   │   ├── TransactionManager.tsx        # CRUD transacciones
│   │   ├── CategoryManager.tsx           # CRUD categorías
│   │   └── VerticalSlider.tsx            # Slider vertical (futuro)
│   ├── 📂 lib/
│   │   └── api.ts                        # Cliente Axios + tipos
│   ├── vercel.json                       # ☁️ Config Vercel
│   ├── .env.example                      # Ejemplo variables entorno
│   ├── next.config.js                    # Config Next.js
│   ├── tailwind.config.ts                # Config Tailwind
│   ├── tsconfig.json                     # Config TypeScript
│   └── package.json                      # Dependencias npm
│
├── 📂 target/                            # Build Maven (generado)
│
├── 📄 README.md                          # Este archivo
├── 📄 GUIA_DESPLIEGUE.md                 # Guía Vercel + Render
├── 📄 COMANDOS_DESPLIEGUE.md             # Comandos rápidos
├── 📄 DEPLOYMENT.md                      # Deploy avanzado
├── 📄 MONGODB_ATLAS_GUIA.md              # Setup MongoDB Atlas
├── 📄 INICIO_RAPIDO.md                   # Quick start
├── 📄 POSTMAN_COLLECTION.md              # Testing con Postman
│
├── 🔧 run.bat                            # Iniciar backend (Windows)
├── 🔧 run.sh                             # Iniciar backend (Linux/Mac)
├── 🔧 start-backend.ps1                  # PowerShell backend
├── 🔧 start-frontend.ps1                 # PowerShell frontend
└── 🔧 setup-atlas.ps1                    # Setup MongoDB Atlas
```

---

## 🔧 Instalación y Ejecución

---

## 🔧 Instalación y Ejecución

### Requisitos Previos

| Herramienta | Versión Mínima | Verificar |
|------------|----------------|-----------|
| Java JDK | 21 | `java -version` |
| Maven | 3.9+ | `mvn -version` |
| Node.js | 18+ | `node -version` |
| npm | 9+ | `npm -version` |
| Git | 2.x | `git --version` |

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/edben110/cashify.git
cd cashify
```

### 2️⃣ Configurar MongoDB Atlas

La aplicación ya está configurada con MongoDB Atlas. Si necesitas tu propia instancia:

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster gratuito (M0)
3. Crea un usuario de base de datos
4. Permite acceso desde cualquier IP (0.0.0.0/0)
5. Copia tu connection string
6. Actualiza `back/src/main/resources/application.properties`:

```properties
spring.data.mongodb.uri=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster.mongodb.net/controlgastos
```

> 📖 **Guía detallada**: Ver `MONGODB_ATLAS_GUIA.md`

### 3️⃣ Ejecutar Backend

**Opción A: Con scripts (recomendado)**

```powershell
# Windows PowerShell
.\start-backend.ps1

# Windows CMD
.\run.bat

# Linux/Mac
./run.sh
```

**Opción B: Manualmente**

```bash
cd back
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en:
- 🔗 API Base: `http://localhost:8080/api`
- 📖 Swagger UI: `http://localhost:8080/swagger-ui.html`
- 📄 API Docs: `http://localhost:8080/api-docs`

### 4️⃣ Ejecutar Frontend

**Opción A: Con script (recomendado)**

```powershell
# Windows PowerShell
.\start-frontend.ps1
```

**Opción B: Manualmente**

```bash
cd front
npm install
npm run dev
```

El frontend estará disponible en:
- 🌐 App: `http://localhost:3000`

### 5️⃣ Verificar Instalación

1. Abre `http://localhost:3000` en tu navegador
2. Deberías ver la pantalla de login de CA$HIFY con el tema retro
3. Abre `http://localhost:8080/swagger-ui.html` para ver la documentación de la API

---

## 📚 Modelo de Datos

### Diagrama de Relaciones

```
┌─────────────┐
│    User     │
├─────────────┤
│ id          │◄────┐
│ apodo       │     │
│ correo      │     │  (userId)
│ contrasenia │     │
└─────────────┘     │
                    │
      ┌─────────────┼─────────────┐
      │             │             │
      ▼             ▼             ▼
┌─────────────┐ ┌──────────────┐
│  Categoria  │ │ Transaccion  │
├─────────────┤ ├──────────────┤
│ id          │ │ id           │
│ nombre      │◄┤ categoriaId  │ (categoriaId)
│ userId      │ │ userId       │
└─────────────┘ │ tipo         │
                │ descripcion  │
                │ monto        │
                │ fecha        │
                └──────────────┘
```

### Enumeración: TipoTransaccion
```java
enum TipoTransaccion {
    INGRESO,  // Entrada de dinero
    GASTO     // Salida de dinero
}
```

### Entidad: User
| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `id` | String | Auto-generado | ID único MongoDB |
| `apodo` | String | 3-50 chars, único | Nombre de usuario |
| `correo` | String | Email válido, único | Correo electrónico |
| `contrasenia` | String | Mínimo 6 chars | Contraseña (sin encriptar por ahora) |
| `transaccionesIds` | List<String> | - | Referencias a transacciones |
| `categoriasIds` | List<String> | - | Referencias a categorías |

### Entidad: Categoria
| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `id` | String | Auto-generado | ID único MongoDB |
| `nombre` | String | Obligatorio | Nombre de la categoría |
| `userId` | String | Obligatorio | ID del usuario propietario |

### Entidad: Transaccion
| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `id` | String | Auto-generado | ID único MongoDB |
| `tipoTransaccion` | TipoTransaccion | INGRESO/GASTO | Tipo de movimiento |
| `categoriaId` | String | Obligatorio | ID de la categoría |
| `categoriaNombre` | String | Desnormalizado | Nombre de categoría (para performance) |
| `descripcion` | String | Obligatorio | Descripción del movimiento |
| `fecha` | LocalDateTime | Obligatorio | Fecha y hora del movimiento |
| `monto` | Double | > 0, obligatorio | Cantidad de dinero |
| `userId` | String | Obligatorio | ID del usuario propietario |

---

## 🔌 API Endpoints

### 🔐 Autenticación

#### POST `/api/usuarios/login`
Autenticar usuario con correo y contraseña.

**Request Body:**
```json
{
  "correo": "usuario@example.com",
  "contraseña": "password123"
}
```

**Response (200 OK):**
```json
{
  "id": "6543abc...",
  "apodo": "usuario123",
  "correo": "usuario@example.com",
  "transaccionesIds": [],
  "categoriasIds": [],
  "totalTransacciones": 0,
  "totalCategorias": 0
}
```

---

### 👥 Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/usuarios/login` | **Autenticar usuario** (HU002) |
| POST | `/api/usuarios` | Crear nuevo usuario |
| GET | `/api/usuarios` | Listar todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| GET | `/api/usuarios/apodo/{apodo}` | Buscar usuario por apodo |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

---

### 🏷️ Categorías (`/api/categorias`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/categorias/usuario/{userId}` | Crear categoría para usuario |
| GET | `/api/categorias/usuario/{userId}` | Listar categorías del usuario |
| GET | `/api/categorias/{id}` | Obtener categoría por ID |
| PUT | `/api/categorias/{id}` | Actualizar categoría |
| DELETE | `/api/categorias/{id}` | Eliminar categoría |

---

### 💸 Transacciones (`/api/transacciones`)

#### CRUD Básico
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/transacciones/usuario/{userId}` | Crear transacción |
| GET | `/api/transacciones/usuario/{userId}` | Listar todas las transacciones |
| GET | `/api/transacciones/{id}` | Obtener transacción por ID |
| PUT | `/api/transacciones/{id}` | Actualizar transacción |
| DELETE | `/api/transacciones/{id}` | Eliminar transacción |

#### Filtros Avanzados
| Método | Endpoint | Query Params | Descripción |
|--------|----------|--------------|-------------|
| GET | `/api/transacciones/usuario/{userId}/tipo/{tipo}` | tipo: INGRESO\|GASTO | Filtrar por tipo |
| GET | `/api/transacciones/usuario/{userId}/fecha` | `fechaInicio`, `fechaFin` | Filtrar por rango de fechas |
| GET | `/api/transacciones/usuario/{userId}/categoria/{categoriaId}` | - | Filtrar por categoría |

#### Resúmenes
| Método | Endpoint | Query Params | Descripción |
|--------|----------|--------------|-------------|
| GET | `/api/transacciones/usuario/{userId}/resumen` | - | Resumen general (todos los periodos) |
| GET | `/api/transacciones/usuario/{userId}/resumen/periodo` | `fechaInicio`, `fechaFin` | Resumen por periodo específico |

---

## 📝 Ejemplos de Uso

### 1. Crear Usuario

```bash
POST http://localhost:8080/api/usuarios
Content-Type: application/json

{
  "apodo": "juan123",
  "correo": "juan@example.com",
  "contraseña": "password123"
}
```

**Respuesta:**
```json
{
  "id": "6543...",
  "apodo": "juan123",
  "correo": "juan@example.com",
  "totalTransacciones": 0,
  "totalCategorias": 0
}
```

### 2. Iniciar Sesión

```bash
POST http://localhost:8080/api/usuarios/login
Content-Type: application/json

{
  "correo": "juan@example.com",
  "contraseña": "password123"
}
```

### 3. Crear Categoría

```bash
POST http://localhost:8080/api/categorias/usuario/6543...
Content-Type: application/json

{
  "nombre": "Alimentos"
}
```

### 4. Crear Transacción (Gasto)

```bash
POST http://localhost:8080/api/transacciones/usuario/6543...
Content-Type: application/json

{
  "tipoTransaccion": "GASTO",
  "categoriaId": "cat123",
  "descripcion": "Compra de supermercado",
  "fecha": "2025-11-09T14:30:00",
  "monto": 150.50
}
```

### 5. Obtener Resumen General

```bash
GET http://localhost:8080/api/transacciones/usuario/6543.../resumen
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

### 6. Obtener Resumen por Periodo

```bash
GET http://localhost:8080/api/transacciones/usuario/6543.../resumen/periodo?fechaInicio=2025-01-01T00:00:00&fechaFin=2025-11-09T23:59:59
```

### 7. Filtrar Transacciones por Fecha

```bash
GET http://localhost:8080/api/transacciones/usuario/6543.../fecha?fechaInicio=2025-11-01T00:00:00&fechaFin=2025-11-09T23:59:59
```

---

## 🎨 Frontend - Funcionalidades

### Pantalla de Login
- ✅ Validación de correo electrónico (formato)
- ✅ Validación de contraseña (8-20 caracteres)
- ✅ Mensajes de error personalizados
- ✅ Opción para cambiar a registro de usuario

### Dashboard Principal
- ✅ **Tabs dinámicos**: Resumen | Transacciones | Categorías
- ✅ **Header de usuario**: Muestra apodo, correo y botón de logout
- ✅ **Carga de datos**: Spinner retro durante la carga

### Componente Summary (Resumen)
- ✅ **Filtros rápidos**: Última semana, último mes, último año
- ✅ **Filtro personalizado**: Selector de fecha inicio/fin
- ✅ **Tarjetas de resumen**: Ingresos, Gastos, Balance
- ✅ **Estadísticas por categoría**: Con barras de progreso visuales
- ✅ **Últimas transacciones**: Muestra las 5 más recientes
- ✅ **Indicador de filtro activo**: Muestra el periodo seleccionado

### Componente TransactionManager
- ✅ **Listado de transacciones**: Con fecha, categoría, descripción y monto
- ✅ **Crear transacción**: Formulario con validaciones
- ✅ **Editar transacción**: Inline editing
- ✅ **Eliminar transacción**: Con confirmación
- ✅ **Filtros**: Por tipo (Ingreso/Gasto)
- ✅ **Colores diferenciados**: Verde para ingresos, rojo para gastos

### Componente CategoryManager
- ✅ **Listado de categorías**: Con contador de transacciones
- ✅ **Crear categoría**: Formulario simple
- ✅ **Editar categoría**: Inline editing
- ✅ **Eliminar categoría**: Con confirmación
- ✅ **Validación**: No permite duplicados

### Tema Retro-Terminal
- 🎨 **Color principal**: Neon Green (#39FF14)
- 🎨 **Efectos CRT**: Text-shadow con múltiples capas
- 🎨 **Scanlines**: Animación de líneas de escaneo
- 🎨 **Scrollbar personalizada**: Con resplandor verde neón
- 🎨 **Tipografía**: Courier New monospace
- 🎨 **Transiciones suaves**: 300ms en todos los elementos
- 🎨 **Hover effects**: Inversión de colores y resplandor

---

## 🧪 Testing

### Ejecutar Tests Unitarios

```bash
cd back
mvn test
```

### Cobertura de Tests

| Servicio | Pruebas | Estado |
|----------|---------|--------|
| **UserService** | 9 tests | ✅ Passing |
| **CategoriaService** | 7 tests | ✅ Passing |
| **TransaccionService** | 10 tests | ✅ Passing |
| **Total** | **26 tests** | ✅ All Passing |

### Casos de Prueba Principales

#### UserServiceTest
- ✅ Crear usuario exitoso
- ✅ Validar apodo duplicado
- ✅ Validar correo duplicado
- ✅ Obtener usuario por ID
- ✅ Usuario no encontrado lanza excepción
- ✅ Listar todos los usuarios
- ✅ Actualizar usuario
- ✅ Eliminar usuario
- ✅ Eliminar usuario inexistente lanza excepción

#### CategoriaServiceTest
- ✅ Crear categoría exitosa
- ✅ Validar nombre duplicado por usuario
- ✅ Obtener categorías por usuario
- ✅ Actualizar categoría
- ✅ Eliminar categoría
- ✅ Categoría no encontrada lanza excepción

#### TransaccionServiceTest
- ✅ Crear transacción (ingreso)
- ✅ Crear transacción (gasto)
- ✅ Obtener transacciones por usuario
- ✅ Filtrar por tipo (INGRESO/GASTO)
- ✅ Filtrar por rango de fechas
- ✅ Filtrar por categoría
- ✅ Actualizar transacción
- ✅ Eliminar transacción
- ✅ Calcular resumen general
- ✅ Calcular resumen por periodo

### Ejecutar Tests Específicos

```bash
# Ejecutar solo tests de UserService
mvn test -Dtest=UserServiceTest

# Ejecutar solo tests de TransaccionService
mvn test -Dtest=TransaccionServiceTest

# Ejecutar con logs detallados
mvn test -X
```

---

## 🔐 Validaciones

### Backend (Bean Validation)

#### User
```java
@NotBlank(message = "El apodo es obligatorio")
@Size(min = 3, max = 50, message = "El apodo debe tener entre 3 y 50 caracteres")
private String apodo;

@NotBlank(message = "El correo es obligatorio")
@Email(message = "El correo debe ser válido")
private String correo;

@NotBlank(message = "La contraseña es obligatoria")
@Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
private String contrasenia;
```

#### LoginRequestDTO
```java
@NotBlank(message = "El correo electrónico es obligatorio")
@Email(message = "El correo electrónico debe ser válido")
@Size(max = 50, message = "El correo electrónico no debe superar los 50 caracteres")
private String correo;

@NotBlank(message = "La contraseña es obligatoria")
@Size(min = 8, max = 20, message = "La contraseña debe tener entre 8 y 20 caracteres")
private String contraseña;
```

#### Transaccion
```java
@NotNull(message = "El tipo de transacción es obligatorio")
private TipoTransaccion tipoTransaccion;

@Positive(message = "El monto debe ser positivo")
@NotNull(message = "El monto es obligatorio")
private Double monto;

@NotNull(message = "La fecha es obligatoria")
private LocalDateTime fecha;

@NotBlank(message = "La descripción es obligatoria")
private String descripcion;
```

### Frontend (TypeScript + Validación Manual)

#### Login
- ✅ Correo: Formato email válido
- ✅ Contraseña: 8-20 caracteres
- ✅ Mensajes de error específicos por campo

#### Transacciones
- ✅ Monto: Número positivo
- ✅ Descripción: No vacía
- ✅ Fecha: Formato válido
- ✅ Categoría: Debe existir

---

## 🛠️ Manejo de Errores

### Respuesta de Error Estructurada

Todos los errores siguen este formato:

```json
{
  "timestamp": "2025-11-09T14:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Usuario no encontrado con id: '123abc'",
  "path": "/api/usuarios/123abc"
}
```

### Códigos de Estado HTTP

| Código | Significado | Ejemplos |
|--------|-------------|----------|
| **200** | OK | GET exitoso, operación completada |
| **201** | Created | POST exitoso (usuario, categoría, transacción) |
| **204** | No Content | DELETE exitoso |
| **400** | Bad Request | Datos de validación inválidos |
| **401** | Unauthorized | Credenciales incorrectas (login) |
| **404** | Not Found | Recurso no encontrado |
| **409** | Conflict | Recurso duplicado (apodo, correo, categoría) |
| **500** | Internal Server Error | Error inesperado del servidor |

### Excepciones Personalizadas

```java
// Usuario/Categoría/Transacción no encontrado
throw new ResourceNotFoundException("Usuario", "id", "123abc");

// Apodo o correo duplicado
throw new DuplicateResourceException("Usuario", "correo", "juan@example.com");

// Credenciales incorrectas
throw new UnauthorizedException("Correo electrónico o contraseña incorrectos");
```

---

## 📖 Documentación Swagger

### Acceder a Swagger UI

Una vez que el backend esté ejecutándose, abre en tu navegador:

🔗 **http://localhost:8080/swagger-ui.html**

### Funcionalidades de Swagger

- ✅ **Explorar todos los endpoints** organizados por tags (Usuarios, Categorías, Transacciones)
- ✅ **Probar operaciones en vivo** con el botón "Try it out"
- ✅ **Ver modelos de datos** con todos los campos y validaciones
- ✅ **Consultar códigos de respuesta** para cada endpoint
- ✅ **Generar código de cliente** en múltiples lenguajes

### Tags en Swagger

| Tag | Endpoints | Descripción |
|-----|-----------|-------------|
| **Usuarios** | 7 endpoints | Gestión de usuarios y autenticación |
| **Categorías** | 5 endpoints | CRUD de categorías personalizadas |
| **Transacciones** | 10 endpoints | CRUD, filtros y resúmenes financieros |

---

## 🌐 CORS (Cross-Origin Resource Sharing)

### Configuración Dinámica

El backend acepta peticiones desde cualquier origen configurado en la variable de entorno:

```properties
# Local (application.properties)
cors.allowed.origins=http://localhost:3000

# Producción (application-prod.properties)
cors.allowed.origins=https://tu-app.vercel.app,https://otro-dominio.com
```

### Métodos HTTP Permitidos

- ✅ GET
- ✅ POST
- ✅ PUT
- ✅ DELETE
- ✅ OPTIONS

### Headers Permitidos

- ✅ `*` (Todos los headers)
- ✅ Credentials: Habilitado

---

## 🚀 Despliegue en Producción

### Opción 1: Vercel (Frontend) + Render (Backend)

📖 **Guía completa**: Ver `GUIA_DESPLIEGUE.md`

#### Quick Start

1. **Backend en Render** (Docker):
   ```bash
   # Render detecta automáticamente el Dockerfile en back/
   # Solo configura las variables de entorno
   ```

2. **Frontend en Vercel**:
   ```bash
   # Vercel detecta automáticamente Next.js
   # Configura NEXT_PUBLIC_API_URL con tu URL de Render
   ```

### Variables de Entorno Producción

#### Backend (Render)
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/controlgastos
MONGODB_DATABASE=controlgastos
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app
```

#### Frontend (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
```

### Costos (100% Gratis)

| Servicio | Plan | Costo | Limitaciones |
|----------|------|-------|--------------|
| **Vercel** | Hobby | 💵 $0/mes | Sleep after inactivity, 512MB RAM |
| **Render** | Free | 💵 $0/mes | Sleep after 15min, 512MB RAM |
| **MongoDB Atlas** | M0 | 💵 $0/mes | 512MB storage |
| **TOTAL** | - | **💵 $0/mes** | - |

---

## 📊 Estadísticas del Proyecto

```
Backend:
- 29 archivos Java
- 3 capas (Controller, Service, Repository)
- 4 entidades de dominio
- 7 DTOs
- 4 excepciones personalizadas
- 26+ tests unitarios
- 100% cobertura de servicios

Frontend:
- 7 componentes React
- 1 cliente API (Axios)
- Tema retro completamente personalizado
- Responsive design
- TypeScript con tipado estricto
```

---

## 📂 Archivos de Configuración Importantes

| Archivo | Propósito |
|---------|-----------|
| `back/pom.xml` | Dependencias Maven y plugins |
| `back/Dockerfile` | Build multi-stage para producción |
| `back/render.yaml` | Configuración de Render |
| `back/src/main/resources/application.properties` | Config local |
| `back/src/main/resources/application-prod.properties` | Config producción |
| `front/package.json` | Dependencias npm |
| `front/vercel.json` | Configuración de Vercel |
| `front/next.config.js` | Config Next.js |
| `front/tailwind.config.ts` | Config Tailwind (tema retro) |

---

## 🎯 Próximas Mejoras

### Backend
- [ ] Implementar JWT para autenticación stateless
- [ ] Encriptar contraseñas con BCrypt
- [ ] Agregar paginación a los endpoints
- [ ] Implementar caché con Redis
- [ ] Agregar rate limiting
- [ ] Implementar soft delete
- [ ] Agregar exportación a PDF/Excel

### Frontend
- [ ] Gráficos interactivos con Chart.js
- [ ] Dark/Light mode toggle
- [ ] Notificaciones toast
- [ ] Progressive Web App (PWA)
- [ ] Exportar datos a CSV
- [ ] Multi-idioma (i18n)
- [ ] Modo offline con Service Workers

### DevOps
- [ ] GitHub Actions CI/CD
- [ ] Docker Compose para desarrollo
- [ ] Monitoreo con Prometheus
- [ ] Logging centralizado
- [ ] Tests E2E con Playwright

---

## 🤝 Contribuir

¿Quieres contribuir? ¡Genial! Sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

¿Tienes preguntas o problemas?

1. 📖 Revisa la **documentación** en este README
2. 🔍 Consulta **Swagger UI**: `http://localhost:8080/swagger-ui.html`
3. 📚 Lee las **guías adicionales**:
   - `GUIA_DESPLIEGUE.md` - Deploy a producción
   - `MONGODB_ATLAS_GUIA.md` - Configurar MongoDB
   - `INICIO_RAPIDO.md` - Quick start
   - `POSTMAN_COLLECTION.md` - Testing con Postman
4. 🐛 Abre un **Issue** en GitHub

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

```
MIT License

Copyright (c) 2025 Edwar Benito

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

---

## 👨‍💻 Autor

**Edwar Benito**  
Proyecto de Ingeniería de Software y Diseño 2025-02

### Links

- 🌐 GitHub: [edben110](https://github.com/edben110)
- 📧 Email: edben110@example.com
- 💼 LinkedIn: [Edwar Benito](https://linkedin.com/in/edwar-benito)

---

## 🙏 Agradecimientos

- Spring Boot Team por el excelente framework
- MongoDB por la base de datos flexible
- Vercel y Render por el hosting gratuito
- Next.js por el increíble framework de React
- Tailwind CSS por el sistema de diseño utility-first
- Swagger/OpenAPI por la documentación automática
- Mockito y JUnit por las herramientas de testing

---

## 📜 Historial de Versiones

### v1.0.0 (2025-11-09) - Release Inicial
- ✅ Backend completo con Spring Boot 3.2
- ✅ Frontend con Next.js 14 y tema retro
- ✅ MongoDB Atlas integrado
- ✅ Sistema de login y autenticación
- ✅ CRUD completo de usuarios, categorías y transacciones
- ✅ Filtros avanzados por fecha, tipo y categoría
- ✅ Resúmenes financieros generales y por periodo
- ✅ 26 tests unitarios
- ✅ Documentación Swagger
- ✅ Guías de despliegue para Vercel y Render
- ✅ Scrollbar personalizada
- ✅ Responsive design

---

<div align="center">

**¡Listo para usar! 🚀**

Hecho con ❤️ y mucho ☕

[⬆ Volver arriba](#-cahify---sistema-de-control-de-gastos)

</div>
