# 🚀 Instrucciones de Inicio - CA$HIFY

Guía rápida para levantar el proyecto completo (Backend + Frontend)

---

## 📋 Requisitos Previos

Asegúrate de tener instalado:

- ✅ **Java 21**
- ✅ **Maven 3.8+**
- ✅ **MongoDB 4.0+** (corriendo en localhost:27017)
- ✅ **Node.js 18+** y **npm**

---

## 🎯 Inicio Rápido (2 minutos)

### Opción 1: Scripts Automáticos

#### Windows (PowerShell):
```powershell
# En la raíz del proyecto
.\run.bat

# En otra terminal, iniciar el frontend
cd front
npm install
npm run dev
```

#### Linux/Mac:
```bash
# En la raíz del proyecto
./run.sh

# En otra terminal, iniciar el frontend
cd front
npm install
npm run dev
```

### Opción 2: Manual

#### 1️⃣ Iniciar MongoDB
```bash
# Windows (como servicio)
net start MongoDB

# Linux/Mac
sudo systemctl start mongod

# O con Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### 2️⃣ Iniciar Backend (API)
```bash
# En la raíz del proyecto
mvn spring-boot:run
```

Espera a ver:
```
Started ControlGastosApplication in X seconds
```

La API estará en: **http://localhost:8080**

#### 3️⃣ Iniciar Frontend
```bash
# En otra terminal
cd front
npm install    # Solo la primera vez
npm run dev
```

La aplicación estará en: **http://localhost:3000**

---

## 🎮 Probar la Aplicación

1. **Abre el navegador**: http://localhost:3000

2. **Crea un usuario**:
   - Click en "+ Crear Nuevo Usuario"
   - Completa el formulario
   - Click en "Crear Usuario"

3. **Explora el Dashboard**:
   - Tab "Resumen": Ver estadísticas
   - Tab "Categorías": Crear categorías (ej: Comida, Transporte)
   - Tab "Transacciones": Registrar ingresos y gastos

4. **Registra transacciones**:
   - Click en "+ Nueva"
   - Selecciona tipo (Ingreso/Gasto)
   - Elige categoría
   - Ingresa monto y descripción
   - Click en "Crear"

5. **Ve las estadísticas**:
   - Vuelve a "Resumen"
   - Observa el balance, gráficos por categoría
   - Revisa las últimas transacciones

---

## 🔍 Verificar que Todo Funciona

### ✅ Backend
```bash
# Probar endpoint de salud
curl http://localhost:8080/actuator/health

# Debería responder: {"status":"UP"}
```

### ✅ MongoDB
```bash
# Conectar a MongoDB
mongosh

# Ver bases de datos
show dbs

# Ver colección de usuarios
use controlgastos
db.users.find()
```

### ✅ Frontend
```bash
# Abrir en el navegador
http://localhost:3000

# Deberías ver el título: CA$HIFY
```

### ✅ Swagger UI
```bash
# Documentación interactiva de la API
http://localhost:8080/swagger-ui.html
```

---

## 🐛 Solución de Problemas

### ❌ Backend no inicia

**Problema**: "Port 8080 already in use"
```bash
# Windows: Encontrar proceso en puerto 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

**Problema**: "Cannot connect to MongoDB"
```bash
# Verificar que MongoDB esté corriendo
# Windows
sc query MongoDB

# Linux/Mac
systemctl status mongod

# Si no está corriendo, iniciarlo
```

### ❌ Frontend no inicia

**Problema**: "Module not found"
```bash
cd front
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

**Problema**: "Port 3000 already in use"
```bash
# Usar otro puerto
PORT=3001 npm run dev
```

### ❌ Error de CORS

**Problema**: "Access-Control-Allow-Origin"

**Solución**: Verifica que en `src/main/java/com/controlgastos/config/CorsConfig.java` esté configurado:
```java
.allowedOrigins("http://localhost:3000", "http://localhost:3001")
```

### ❌ API no responde

**Problema**: 404 o 500 errors

**Solución**:
1. Revisa logs del backend en la consola
2. Verifica que MongoDB esté corriendo
3. Prueba endpoints en Swagger UI
4. Revisa que `.env.local` tenga la URL correcta

---

## 📦 Puertos Utilizados

| Servicio  | Puerto | URL                          |
|-----------|--------|------------------------------|
| Frontend  | 3000   | http://localhost:3000        |
| Backend   | 8080   | http://localhost:8080        |
| MongoDB   | 27017  | mongodb://localhost:27017    |
| Swagger   | 8080   | http://localhost:8080/swagger-ui.html |

---

## 🎨 Interfaz de Usuario

### Características del Frontend:
- 🎮 **Estilo Retro**: Verde neón + negro
- 📱 **Responsive**: Mobile, tablet, desktop
- ⚡ **Animaciones**: Efectos neón y glitch
- 📊 **Dashboard**: Resumen financiero completo
- 🔄 **Real-time**: Actualizaciones instantáneas

### Navegación:
```
┌─────────────────────────┐
│      CA$HIFY (Logo)     │
├─────────────────────────┤
│  Selector de Usuario    │ ← Inicio
└─────────────────────────┘
           ↓
┌─────────────────────────┐
│    Dashboard Usuario    │
├─────────────────────────┤
│ Tabs:                   │
│  [Resumen]              │ ← Estadísticas
│  [Transacciones]        │ ← CRUD Transacciones
│  [Categorías]           │ ← CRUD Categorías
└─────────────────────────┘
```

---

## 📚 Recursos Adicionales

### Documentación:
- 📖 **Backend**: Ver `README.md` en raíz
- 📖 **Frontend**: Ver `front/README.md`
- 📖 **API Docs**: Ver `POSTMAN_COLLECTION.md`
- 📖 **Deployment**: Ver `DEPLOYMENT.md`

### Endpoints importantes:
```bash
# API Base
http://localhost:8080/api

# Swagger UI
http://localhost:8080/swagger-ui.html

# Health Check
http://localhost:8080/actuator/health

# Frontend
http://localhost:3000
```

---

## 🧪 Datos de Prueba

### Crear usuario de prueba:
```json
POST http://localhost:8080/api/usuarios
{
  "apodo": "demo",
  "correo": "demo@cashify.com",
  "contraseña": "demo123"
}
```

### Crear categorías:
```json
POST http://localhost:8080/api/categorias/usuario/{userId}
[
  { "nombre": "Comida" },
  { "nombre": "Transporte" },
  { "nombre": "Entretenimiento" },
  { "nombre": "Salario" }
]
```

### Crear transacción:
```json
POST http://localhost:8080/api/transacciones/usuario/{userId}
{
  "tipoTransaccion": "INGRESO",
  "categoriaId": "{categoriaId}",
  "descripcion": "Salario Enero",
  "fecha": "2025-01-15T09:00:00",
  "monto": 3000.00
}
```

---

## 🔄 Desarrollo

### Hot Reload:
- ✅ **Backend**: Maven compila automáticamente
- ✅ **Frontend**: Next.js con Fast Refresh

### Comandos útiles:
```bash
# Backend: Ver logs
mvn spring-boot:run

# Backend: Tests
mvn test

# Frontend: Modo desarrollo
npm run dev

# Frontend: Build producción
npm run build
npm start
```

---

## 🎯 Checklist de Inicio

- [ ] MongoDB corriendo
- [ ] Backend iniciado (puerto 8080)
- [ ] Frontend iniciado (puerto 3000)
- [ ] Swagger UI accesible
- [ ] Crear usuario de prueba
- [ ] Crear categorías
- [ ] Registrar transacciones
- [ ] Ver resumen financiero

---

## 🆘 ¿Necesitas Ayuda?

1. **Revisa logs**: Consola del backend y browser console (F12)
2. **Swagger UI**: Prueba endpoints directamente
3. **MongoDB**: Verifica datos con `mongosh`
4. **Limpia caché**: 
   ```bash
   # Backend
   mvn clean install
   
   # Frontend
   rm -rf front/.next
   cd front && npm run dev
   ```

---

**¡Listo para usar! 🚀💚**

*CA$HIFY - Sistema de Control de Gastos Retro*
