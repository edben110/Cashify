# 🎮 CA$HIFY - Frontend Retro Neón

## ✨ ¡Frontend Completado!

He creado un frontend completo en **Next.js 14** con un estilo **retro neón verde fosforescente** increíble.

---

## 🚀 Cómo Iniciar el Frontend

### Paso 1: Navegar a la carpeta
```powershell
cd front
```

### Paso 2: Instalar dependencias (solo primera vez)
```powershell
npm install
```

### Paso 3: Iniciar servidor de desarrollo
```powershell
npm run dev
```

### Paso 4: Abrir en el navegador
```
http://localhost:3000
```

---

## 🎨 Características del Diseño

### 🌈 Paleta de Colores
- **Verde Neón**: `#39FF14` (Fosforescente brillante)
- **Negro Retro**: `#0a0a0a` (Fondo profundo)
- **Gris Oscuro**: `#1a1a1a` (Contenedores)

### ✨ Efectos Visuales
- ⚡ **Sombras Neón**: Brillos verdes alrededor de todos los elementos
- 📺 **Efecto CRT**: Simulación de monitor antiguo
- 🎭 **Animaciones Flicker**: Parpadeo estilo neón vintage
- 📡 **Scanlines**: Líneas de escaneo retro
- 💫 **Pulse Neon**: Pulso de luz continuo
- 🎪 **Glitch Effects**: Distorsiones digitales

### 🎯 Componentes Interactivos
- Todos los botones tienen hover effects con cambio de color
- Inputs con bordes neón animados al hacer focus
- Cards con sombras que se intensifican al pasar el mouse
- Transiciones suaves en todos los elementos

---

## 📱 Funcionalidades Implementadas

### 1️⃣ **Selector de Usuario**
- Ver lista de usuarios existentes
- Crear nuevos usuarios con formulario validado
- Seleccionar usuario para acceder al dashboard
- Muestra contador de transacciones y categorías

### 2️⃣ **Dashboard Principal**
- Sistema de tabs (Resumen, Transacciones, Categorías)
- Información del usuario actual
- Botón de logout
- Navegación fluida entre secciones

### 3️⃣ **Gestión de Categorías**
- Ver todas las categorías en grid responsive
- Crear nuevas categorías
- Editar categorías existentes
- Eliminar categorías (con confirmación)

### 4️⃣ **Gestión de Transacciones**
- Ver todas las transacciones ordenadas por fecha
- Filtros: Todos / Ingresos / Gastos
- Crear nueva transacción con formulario completo:
  - Tipo (Ingreso/Gasto)
  - Categoría (selector)
  - Monto (validado)
  - Fecha y hora
  - Descripción
- Editar transacciones
- Eliminar transacciones (con confirmación)
- Iconos visuales (↑ para ingresos, ↓ para gastos)
- Colores diferenciados (verde para ingresos, rojo para gastos)

### 5️⃣ **Resumen Financiero**
- **Totales**:
  - Total de Ingresos (verde)
  - Total de Gastos (rojo)
  - Balance (verde/amarillo según estado)
- **Estadísticas por Categoría**:
  - Desglose de ingresos y gastos por categoría
  - Barras de progreso proporcionales
  - Contador de transacciones por categoría
- **Últimas Transacciones**:
  - Lista de las 5 transacciones más recientes
  - Vista rápida con iconos y colores

---

## 🗂️ Estructura de Archivos Creados

```
front/
├── package.json              ✅ Dependencias del proyecto
├── tsconfig.json             ✅ Configuración TypeScript
├── next.config.js            ✅ Configuración Next.js
├── tailwind.config.ts        ✅ Tema retro personalizado
├── postcss.config.js         ✅ Configuración PostCSS
├── .env.local                ✅ Variables de entorno (API URL)
├── .gitignore                ✅ Archivos ignorados
├── README.md                 ✅ Documentación completa
│
├── app/
│   ├── layout.tsx            ✅ Layout con efectos scanline
│   ├── page.tsx              ✅ Página principal con header/footer
│   └── globals.css           ✅ Estilos globales + efectos retro
│
├── components/
│   ├── UserSelector.tsx      ✅ Selector/Creador de usuarios
│   ├── Dashboard.tsx         ✅ Dashboard con tabs
│   ├── CategoryManager.tsx   ✅ CRUD de categorías
│   ├── TransactionManager.tsx ✅ CRUD de transacciones
│   └── Summary.tsx           ✅ Resumen financiero completo
│
└── lib/
    └── api.ts                ✅ Cliente API (Axios)
```

---

## 🔌 Conexión con el Backend

El frontend se conecta automáticamente a tu API Spring Boot a través de:

**URL Base**: `http://localhost:8080/api`

### Endpoints Utilizados:

#### Usuarios
- `GET /usuarios` - Listar usuarios
- `GET /usuarios/{id}` - Obtener usuario
- `GET /usuarios/apodo/{apodo}` - Buscar por apodo
- `POST /usuarios` - Crear usuario
- `PUT /usuarios/{id}` - Actualizar usuario
- `DELETE /usuarios/{id}` - Eliminar usuario

#### Categorías
- `GET /categorias/usuario/{userId}` - Listar categorías del usuario
- `POST /categorias/usuario/{userId}` - Crear categoría
- `PUT /categorias/{id}` - Actualizar categoría
- `DELETE /categorias/{id}` - Eliminar categoría

#### Transacciones
- `GET /transacciones/usuario/{userId}` - Listar transacciones
- `GET /transacciones/usuario/{userId}/tipo/{tipo}` - Filtrar por tipo
- `GET /transacciones/usuario/{userId}/resumen` - Obtener resumen
- `POST /transacciones/usuario/{userId}` - Crear transacción
- `PUT /transacciones/{id}` - Actualizar transacción
- `DELETE /transacciones/{id}` - Eliminar transacción

---

## 🎮 Flujo de Usuario

```
1. Landing Page
   ↓
2. Seleccionar/Crear Usuario
   ↓
3. Dashboard Principal
   ├── Tab Resumen → Ver estadísticas financieras
   ├── Tab Transacciones → Gestionar ingresos/gastos
   └── Tab Categorías → Gestionar categorías
   ↓
4. Logout → Volver al inicio
```

---

## 🎨 Clases CSS Retro Personalizadas

### Contenedores
```css
.retro-container    /* Contenedor con borde neón y sombra */
.retro-card         /* Card con hover effect */
.retro-input        /* Input con borde neón y focus */
.retro-button       /* Botón verde con hover */
.retro-button-danger /* Botón rojo para acciones peligrosas */
```

### Tipografía
```css
.retro-title        /* Título grande animado (5xl) */
.retro-subtitle     /* Subtítulo retro (2xl) */
.crt-effect         /* Efecto de pantalla CRT */
```

### Animaciones
```css
.animate-pulse-neon /* Pulso de neón continuo */
.animate-flicker    /* Parpadeo retro */
.scanline           /* Efecto de líneas de escaneo */
```

### Sombras
```css
.shadow-neon        /* Sombra neón estándar */
.shadow-neon-sm     /* Sombra neón pequeña */
.shadow-neon-lg     /* Sombra neón grande */
```

---

## 📱 Diseño Responsive

### Breakpoints:
- **Mobile**: < 768px (1 columna)
- **Tablet**: 768px - 1023px (2 columnas)
- **Desktop**: > 1024px (3 columnas)

### Adaptaciones:
- Grid de usuarios: 1 → 2 columnas
- Grid de categorías: 1 → 2 → 3 columnas
- Dashboard: Stack vertical en mobile, horizontal en desktop
- Formularios: Campos apilados en mobile, grid en desktop

---

## 🚀 Cómo Probar Todo

### 1. Asegúrate que el backend esté corriendo
```powershell
# En la raíz del proyecto
mvn spring-boot:run
```

### 2. Inicia el frontend
```powershell
cd front
npm install  # Solo primera vez
npm run dev
```

### 3. Abre el navegador
```
http://localhost:3000
```

### 4. Prueba el flujo completo:

**A. Crear Usuario**
1. Click en "+ Crear Nuevo Usuario"
2. Llenar:
   - Apodo: `demo`
   - Correo: `demo@cashify.com`
   - Contraseña: `demo123`
3. Click "Crear Usuario"

**B. Crear Categorías**
1. Ir a tab "Categorías"
2. Click "+ Nueva"
3. Crear: "Salario", "Comida", "Transporte", "Entretenimiento"

**C. Crear Transacciones**
1. Ir a tab "Transacciones"
2. Click "+ Nueva"
3. Crear un ingreso:
   - Tipo: Ingreso
   - Categoría: Salario
   - Monto: 3000
   - Descripción: Salario Enero
4. Crear algunos gastos en diferentes categorías

**D. Ver Resumen**
1. Ir a tab "Resumen"
2. Ver las estadísticas:
   - Totales (Ingresos, Gastos, Balance)
   - Gráficos por categoría
   - Últimas transacciones

---

## 🎯 Características Destacadas

### 🌟 Estilo Visual Único
- **Temática Retro**: Inspirada en terminales de los 80s
- **Verde Fosforescente**: Color neón brillante #39FF14
- **Efectos CRT**: Simulación de monitores antiguos
- **Tipografía Monospace**: Courier New para look retro

### ⚡ Experiencia de Usuario
- **Responsive**: Funciona en móviles, tablets y desktop
- **Animaciones Fluidas**: Transiciones suaves en hover
- **Feedback Visual**: Colores semáforo (verde/rojo/amarillo)
- **Validación en Tiempo Real**: Formularios con validación

### 🔄 Integración con API
- **Axios HTTP Client**: Manejo robusto de peticiones
- **TypeScript**: Tipado fuerte para prevenir errores
- **Error Handling**: Mensajes de error claros
- **Loading States**: Indicadores de carga

### 📊 Visualización de Datos
- **Resumen Financiero**: Vista de alto nivel
- **Gráficos por Categoría**: Barras proporcionales
- **Filtros**: Por tipo de transacción
- **Ordenamiento**: Transacciones por fecha (más reciente primero)

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to API"
**Causa**: Backend no está corriendo o CORS no configurado

**Solución**:
```powershell
# 1. Verifica que el backend esté en puerto 8080
curl http://localhost:8080/api/usuarios

# 2. Revisa .env.local
# Debe contener: NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### ❌ "Module not found"
**Causa**: Dependencias no instaladas

**Solución**:
```powershell
cd front
rm -rf node_modules
rm package-lock.json
npm install
```

### ❌ Estilos no se aplican
**Causa**: Caché de Tailwind

**Solución**:
```powershell
# Mata el proceso y reinicia
cd front
npm run dev
```

---

## 🎨 Paleta de Colores Completa

```css
/* Colores principales */
#39FF14  /* Verde Neón - Principal */
#0a0a0a  /* Negro Retro - Fondo */
#1a1a1a  /* Gris Oscuro - Contenedores */
#2a2a0a  /* Gris Medio - Cards */

/* Colores semánticos */
#39FF14  /* Success/Ingresos */
#FF0000  /* Danger/Eliminar */
#00FF00  /* Ingresos Alt */
#FF6347  /* Gastos */
#FFFF00  /* Warning/Balance negativo */
```

---

## 📚 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 14.0.0 | Framework React |
| React | 18.2.0 | Librería UI |
| TypeScript | 5.2.2 | Tipado estático |
| Tailwind CSS | 3.3.5 | Estilos utility-first |
| Axios | 1.6.0 | Cliente HTTP |

---

## 🎁 Extras Incluidos

- ✅ **Animaciones personalizadas** (pulse-neon, flicker, scan)
- ✅ **Efectos de hover** en todos los elementos interactivos
- ✅ **Iconos visuales** (emojis para mejor UX)
- ✅ **Mensajes de error** estilizados
- ✅ **Loading states** con spinners retro
- ✅ **Confirmaciones** antes de eliminar
- ✅ **Formateo de fechas** en español
- ✅ **Formateo de moneda** con 2 decimales
- ✅ **Footer** con información del proyecto

---

## 🚀 ¡Listo para Usar!

Tu aplicación **CA$HIFY** ahora tiene:

✅ **Backend completo** (Spring Boot + MongoDB)
✅ **Frontend retro** (Next.js + Tailwind + Estilo Neón)
✅ **Integración total** (API REST funcionando)
✅ **Documentación completa** (README, instrucciones, guides)

**Comandos para iniciar:**

```powershell
# Terminal 1 - Backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd front
npm run dev

# Abrir navegador
http://localhost:3000
```

---

**¡Disfruta de tu app de control de gastos con estilo retro! 🎮💚✨**

*Powered by Spring Boot + Next.js + Love for Retro Design*
