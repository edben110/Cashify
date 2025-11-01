#  CA$HIFY - Frontend Retro

Frontend en Next.js 14 con estilo retro neón verde fosforescente para el sistema de Control de Gastos.

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
cd front
npm install
```

### 2. Configurar Variables de Entorno

Verifica que el archivo `.env.local` tenga la URL correcta de tu API:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 3. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

## 📋 Requisitos Previos

- ✅ **Node.js** 18+ instalado
- ✅ **API Backend** corriendo en http://localhost:8080
- ✅ **MongoDB** configurado y corriendo

## 🎨 Características del Diseño

### Paleta de Colores
- **Verde Neón**: `#39FF14` - Color principal
- **Negro Retro**: `#0a0a0a` - Fondo principal
- **Gris Oscuro**: `#1a1a1a` - Contenedores
- **Gris Medio**: `#2a2a2a` - Cards

### Efectos Visuales
- ✨ **Sombras Neón**: Brillos en verde fosforescente
- 📺 **Efecto CRT**: Estilo de monitor antiguo
- ⚡ **Animaciones Flicker**: Parpadeo de neón
- 📡 **Scanline**: Líneas de escaneo retro
- 🎭 **Glitch Effect**: Efectos de distorsión

### Tipografía
- Fuente: **Courier New** (monospace)
- Estilo: Mayúsculas con tracking amplio
- Efectos: Text-shadow neón

## 🗂️ Estructura del Proyecto

```
front/
├── app/
│   ├── layout.tsx          # Layout principal con efectos retro
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales con Tailwind
├── components/
│   ├── UserSelector.tsx    # Selector/Creador de usuarios
│   ├── Dashboard.tsx       # Dashboard principal con tabs
│   ├── CategoryManager.tsx # Gestión de categorías
│   ├── TransactionManager.tsx # Gestión de transacciones
│   └── Summary.tsx         # Resumen financiero
├── lib/
│   └── api.ts              # Cliente API con Axios
├── .env.local              # Variables de entorno
├── package.json            # Dependencias
└── tailwind.config.ts      # Configuración Tailwind
```

## 🔌 Conexión con la API

### Servicios Disponibles

El archivo `lib/api.ts` exporta los siguientes servicios:

#### **userService**
```typescript
- getAll()              // Obtener todos los usuarios
- getById(id)           // Obtener usuario por ID
- getByApodo(apodo)     // Obtener usuario por apodo
- create(data)          // Crear nuevo usuario
- update(id, data)      // Actualizar usuario
- delete(id)            // Eliminar usuario
```

#### **categoriaService**
```typescript
- getByUser(userId)     // Categorías de un usuario
- getById(id)           // Obtener categoría
- create(userId, data)  // Crear categoría
- update(id, data)      // Actualizar categoría
- delete(id)            // Eliminar categoría
```

#### **transaccionService**
```typescript
- getByUser(userId)                     // Todas las transacciones
- getByTipo(userId, tipo)               // Por tipo (INGRESO/GASTO)
- getByCategoria(userId, categoriaId)   // Por categoría
- getByFecha(userId, inicio, fin)       // Por rango de fechas
- getResumen(userId)                    // Resumen financiero
- getResumenPorPeriodo(userId, inicio, fin) // Resumen por periodo
- create(userId, data)                  // Crear transacción
- update(id, data)                      // Actualizar transacción
- delete(id)                            // Eliminar transacción
```

## 🎯 Componentes Principales

### 1. UserSelector
**Ubicación**: `components/UserSelector.tsx`

- Lista usuarios existentes
- Formulario para crear nuevos usuarios
- Validación de campos
- Manejo de errores

**Props**:
```typescript
{
  onUserSelect: (user: UserResponse) => void
}
```

### 2. Dashboard
**Ubicación**: `components/Dashboard.tsx`

- Muestra información del usuario actual
- Sistema de tabs (Resumen, Transacciones, Categorías)
- Carga de datos desde la API
- Botón de logout

**Props**:
```typescript
{
  user: UserResponse,
  onLogout: () => void
}
```

### 3. CategoryManager
**Ubicación**: `components/CategoryManager.tsx`

- CRUD completo de categorías
- Vista en grid responsive
- Validación de nombres únicos
- Confirmación de eliminación

**Props**:
```typescript
{
  userId: string,
  categorias: CategoriaResponse[],
  onCategoryChange: () => void
}
```

### 4. TransactionManager
**Ubicación**: `components/TransactionManager.tsx`

- CRUD completo de transacciones
- Filtros por tipo (Todos, Ingresos, Gastos)
- Ordenamiento por fecha
- Formulario con validación
- Selector de categorías

**Props**:
```typescript
{
  userId: string,
  categorias: CategoriaResponse[],
  transacciones: TransaccionResponse[],
  onTransactionChange: () => void
}
```

### 5. Summary
**Ubicación**: `components/Summary.tsx`

- Resumen financiero (Ingresos, Gastos, Balance)
- Estadísticas por categoría
- Gráficos de barras
- Últimas transacciones
- Indicadores visuales con colores

**Props**:
```typescript
{
  resumen: ResumenGastos,
  transacciones: TransaccionResponse[]
}
```

## 🎨 Clases CSS Personalizadas

### Contenedores
```css
.retro-container    // Contenedor principal con borde neón
.retro-card         // Card con hover effect
.retro-input        // Input con estilo neón
.retro-button       // Botón principal verde
.retro-button-danger // Botón de acción destructiva (rojo)
```

### Tipografía
```css
.retro-title        // Título grande animado
.retro-subtitle     // Subtítulo con estilo retro
.crt-effect         // Efecto de monitor CRT
```

### Efectos
```css
.scanline           // Líneas de escaneo
.animate-pulse-neon // Pulso de neón
.animate-flicker    // Parpadeo retro
.shadow-neon        // Sombra neón grande
.shadow-neon-sm     // Sombra neón pequeña
.shadow-neon-lg     // Sombra neón extra grande
```

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Mobile**: 320px - 767px
- 📱 **Tablet**: 768px - 1023px
- 💻 **Desktop**: 1024px+

Utiliza clases de Tailwind como:
- `md:` para tablet y superior
- `lg:` para desktop grande

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run start        # Inicia servidor de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🐛 Solución de Problemas

### Error: "Cannot connect to API"
**Solución**:
1. Verifica que el backend esté corriendo en http://localhost:8080
2. Revisa el archivo `.env.local`
3. Verifica CORS en el backend

### Error: "Module not found"
**Solución**:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### El estilo no se aplica correctamente
**Solución**:
```bash
# Reconstruir Tailwind
npm run dev
```

### Puerto 3000 en uso
**Solución**:
```bash
# Usar otro puerto
PORT=3001 npm run dev
```

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variable de entorno en Vercel
NEXT_PUBLIC_API_URL=https://tu-api.com/api
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
NEXT_PUBLIC_API_URL=https://tu-api.com/api
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Tecnologías Utilizadas

- ⚛️ **Next.js 14** - Framework React
- 🎨 **Tailwind CSS 3** - Utility-first CSS
- 📡 **Axios** - Cliente HTTP
- 🔷 **TypeScript** - Tipado estático
- 🎭 **React Hooks** - useState, useEffect

## 🎮 Flujo de Usuario

1. **Inicio**: Seleccionar o crear usuario
2. **Dashboard**: Ver resumen financiero
3. **Categorías**: Crear categorías personalizadas
4. **Transacciones**: Registrar ingresos y gastos
5. **Resumen**: Visualizar estadísticas

## 🌈 Paleta de Colores Extendida

```css
/* Principales */
--neon-green: #39FF14      /* Verde neón principal */
--retro-black: #0a0a0a     /* Fondo principal */
--retro-dark: #1a1a1a      /* Contenedores */
--retro-gray: #2a2a2a      /* Cards */

/* Semánticos */
--success: #39FF14         /* Verde neón */
--danger: #FF0000          /* Rojo para eliminaciones */
--warning: #FFFF00         /* Amarillo para alertas */
--info: #00FFFF            /* Cyan para información */
```

## 🔐 Seguridad

⚠️ **IMPORTANTE**: Esta versión NO incluye:
- Autenticación con JWT
- Encriptación de contraseñas
- Protección CSRF
- Rate limiting

Para producción, implementa:
1. Autenticación con tokens
2. HTTPS
3. Validación en el servidor
4. Sanitización de inputs

## 📞 Soporte

Si encuentras problemas:
1. Revisa la consola del navegador (F12)
2. Verifica los logs del servidor Next.js
3. Comprueba la conexión con la API

---

**¡Disfruta del estilo retro! 🎮💚**

*Powered by Next.js & Spring Boot*
