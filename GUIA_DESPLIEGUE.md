# 🚀 Guía de Despliegue - Cashify

Esta guía te ayudará a desplegar el proyecto Cashify en producción usando:
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Spring Boot)
- **Base de Datos**: MongoDB Atlas (ya configurado)

---

## 📋 Pre-requisitos

✅ Cuenta en [Vercel](https://vercel.com) (gratis)  
✅ Cuenta en [Render](https://render.com) (gratis)  
✅ MongoDB Atlas configurado (ya lo tienes)  
✅ Repositorio Git (GitHub, GitLab, o Bitbucket)

---

## 🔧 Paso 1: Preparar el Repositorio

### 1.1 Subir el código a GitHub

```bash
# Inicializar Git (si no lo has hecho)
cd C:\Users\edben\OneDrive\Desktop\Cashify
git init
git add .
git commit -m "Initial commit - Cashify project"

# Crear repositorio en GitHub y conectarlo
git remote add origin https://github.com/TU_USUARIO/cashify.git
git branch -M main
git push -u origin main
```

### 1.2 Verificar estructura del proyecto

```
Cashify/
├── back/           # Backend Spring Boot
│   ├── Dockerfile
│   ├── render.yaml
│   └── src/
├── front/          # Frontend Next.js
│   ├── vercel.json
│   └── .env.example
└── README.md
```

---

## 🌐 Paso 2: Desplegar Backend en Render

### 2.1 Crear Web Service en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configuración del servicio:

   ```
   Name: cashify-backend
   Region: Oregon (US West) o la más cercana
   Branch: main
   Root Directory: back
   Environment: Docker
   ```

### 2.2 Configurar Variables de Entorno

En la sección **Environment** de Render, agrega estas variables:

```bash
MONGODB_URI=mongodb+srv://edbencashify:Sprintacos%230890@cashify.9phgblc.mongodb.net/controlgastos?retryWrites=true&w=majority&appName=Cashify

MONGODB_DATABASE=controlgastos

SERVER_PORT=8080

SPRING_PROFILES_ACTIVE=prod

CORS_ALLOWED_ORIGINS=https://tu-app.vercel.app
# ⚠️ Este valor lo actualizarás después de desplegar el frontend
```

### 2.3 Desplegar

1. Click en **"Create Web Service"**
2. Render comenzará a construir tu Docker image (5-10 minutos)
3. Una vez completado, recibirás una URL como: `https://cashify-backend-xxxx.onrender.com`

### 2.4 Verificar el despliegue

Abre en tu navegador:
```
https://cashify-backend-xxxx.onrender.com/swagger-ui.html
```

Deberías ver la documentación de Swagger UI ✅

---

## 🎨 Paso 3: Desplegar Frontend en Vercel

### 3.1 Desplegar en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub
4. Configuración del proyecto:

   ```
   Framework Preset: Next.js
   Root Directory: front
   Build Command: npm run build (auto-detectado)
   Output Directory: .next (auto-detectado)
   Install Command: npm install (auto-detectado)
   ```

### 3.2 Configurar Variable de Entorno

En **Environment Variables**, agrega:

```bash
NEXT_PUBLIC_API_URL=https://cashify-backend-xxxx.onrender.com/api
```

🔴 **IMPORTANTE**: Reemplaza `cashify-backend-xxxx.onrender.com` con tu URL real de Render del Paso 2.3

### 3.3 Desplegar

1. Click en **"Deploy"**
2. Vercel construirá y desplegará tu app (2-3 minutos)
3. Recibirás una URL como: `https://cashify-xxxx.vercel.app`

### 3.4 Actualizar CORS en Backend

Ahora que tienes la URL de Vercel, actualiza la variable `CORS_ALLOWED_ORIGINS` en Render:

1. Ve a tu servicio en Render
2. En **Environment**, edita `CORS_ALLOWED_ORIGINS`
3. Cambia a: `https://cashify-xxxx.vercel.app` (tu URL real de Vercel)
4. Guarda y espera a que se redespliegue (automático)

---

## ✅ Paso 4: Verificar el Despliegue Completo

### 4.1 Probar el Frontend

1. Abre tu app en: `https://cashify-xxxx.vercel.app`
2. Deberías ver la pantalla de login ✅

### 4.2 Probar la Conexión Backend

1. Abre las DevTools (F12) → Console
2. Intenta hacer login con un usuario existente
3. Verifica que no haya errores de CORS
4. Si ves datos, ¡funciona! 🎉

### 4.3 Probar Swagger

Visita: `https://cashify-backend-xxxx.onrender.com/swagger-ui.html`

---

## 🔄 Actualizaciones Futuras

### Para actualizar el Frontend (Vercel):

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

Vercel desplegará automáticamente en 1-2 minutos ⚡

### Para actualizar el Backend (Render):

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render reconstruirá el Docker container en 5-10 minutos ⚡

---

## 🐛 Solución de Problemas

### Error: CORS bloqueado

**Problema**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solución**:
1. Verifica que `CORS_ALLOWED_ORIGINS` en Render tenga la URL correcta de Vercel
2. Asegúrate de que NO tenga barra final: ❌ `https://app.vercel.app/` → ✅ `https://app.vercel.app`
3. Redesplegar backend después de cambiar

### Error: Cannot connect to API

**Problema**: Frontend no puede conectarse al backend

**Solución**:
1. Verifica que `NEXT_PUBLIC_API_URL` en Vercel sea correcto
2. Debe incluir `/api` al final: `https://backend.onrender.com/api`
3. Redesplegar frontend después de cambiar

### Error: MongoDB connection failed

**Problema**: Backend no puede conectarse a MongoDB

**Solución**:
1. Verifica que `MONGODB_URI` en Render sea correcta
2. Verifica que la IP de Render esté permitida en MongoDB Atlas:
   - Ve a MongoDB Atlas → Network Access
   - Agrega `0.0.0.0/0` (permitir desde cualquier IP)

### Backend tarda mucho en responder (primera carga)

**Es normal**: Render en plan gratuito pone los servicios en "sleep" después de 15 minutos de inactividad. La primera petición después del sleep puede tardar 30-60 segundos.

**Solución** (opcional):
- Actualizar a plan Render Starter ($7/mes) para evitar el sleep
- O usar un servicio de "ping" como [UptimeRobot](https://uptimerobot.com/) para mantenerlo activo

---

## 📊 Monitoreo y Logs

### Ver logs del Backend (Render):

1. Ve a tu servicio en Render Dashboard
2. Click en pestaña **"Logs"**
3. Verás logs en tiempo real de Spring Boot

### Ver logs del Frontend (Vercel):

1. Ve a tu proyecto en Vercel Dashboard
2. Click en el deployment
3. Click en **"Functions"** → Ver logs de las funciones serverless

---

## 🎯 URLs Finales

Después de completar todos los pasos, tendrás:

✅ **Frontend (Vercel)**: `https://cashify-xxxx.vercel.app`  
✅ **Backend (Render)**: `https://cashify-backend-xxxx.onrender.com`  
✅ **API Docs (Swagger)**: `https://cashify-backend-xxxx.onrender.com/swagger-ui.html`  
✅ **Base de Datos**: MongoDB Atlas (ya configurado)

---

## 💰 Costos

| Servicio | Plan | Costo |
|----------|------|-------|
| Vercel | Hobby | **GRATIS** |
| Render | Free | **GRATIS** (con sleep después de 15min inactividad) |
| MongoDB Atlas | M0 Sandbox | **GRATIS** (512MB) |
| **TOTAL** | | **$0 USD/mes** 🎉 |

---

## 🚀 Próximos Pasos Recomendados

1. **Dominio personalizado** (opcional):
   - Conectar un dominio en Vercel: `cashify.tudominio.com`
   - Actualizar `CORS_ALLOWED_ORIGINS` con el nuevo dominio

2. **Seguridad**:
   - Implementar autenticación JWT
   - Agregar rate limiting
   - Encriptar contraseñas con BCrypt

3. **Monitoreo**:
   - Configurar alertas en Render
   - Usar Vercel Analytics

4. **CI/CD**:
   - Configurar GitHub Actions para tests automáticos
   - Despliegue automático en cada push a `main`

---

## 📞 Soporte

Si tienes problemas durante el despliegue:

1. Revisa los logs en Render y Vercel
2. Verifica las variables de entorno
3. Consulta la sección de **Solución de Problemas** arriba

---

¡Felicidades! Tu aplicación Cashify está ahora en producción 🎉
