# 🌐 Guía Completa: MongoDB Atlas para CA$HIFY

Esta guía te ayudará a configurar MongoDB Atlas (base de datos en la nube) para tu proyecto.

---

## 📋 ¿Qué necesitas configurar en MongoDB Atlas?

### 1️⃣ **Crear Cuenta y Cluster** (5 minutos)

1. **Registrarte en MongoDB Atlas**
   - Ve a: https://www.mongodb.com/cloud/atlas/register
   - Crea una cuenta gratuita (puedes usar Google/GitHub)

2. **Crear un Cluster GRATUITO (M0)**
   - Click en "Build a Database"
   - Selecciona **"M0 FREE"** (512MB, suficiente para desarrollo)
   - Elige tu región más cercana (ej: `us-east-1` o `eu-west-1`)
   - Nombre del cluster: `Cluster0` (o el que prefieras)
   - Click en **"Create"** (tarda 3-5 minutos)

---

### 2️⃣ **Configurar Seguridad** (3 minutos)

#### **A. Crear Usuario de Base de Datos**

1. En el panel, ve a **"Database Access"** (menú izquierdo)
2. Click en **"+ ADD NEW DATABASE USER"**
3. Configurar:
   ```
   Authentication Method: Password
   Username: cashify_admin
   Password: [Genera una contraseña segura]
   
   Ejemplo: CashifyPass2025!
   ```
   ⚠️ **IMPORTANTE**: Guarda esta contraseña, la necesitarás después
   
4. Database User Privileges: **"Atlas admin"** o **"Read and write to any database"**
5. Click en **"Add User"**

#### **B. Configurar Acceso de Red (IP Whitelist)**

1. Ve a **"Network Access"** (menú izquierdo)
2. Click en **"+ ADD IP ADDRESS"**
3. **Opción 1 (Desarrollo)**: 
   - Click en **"ALLOW ACCESS FROM ANYWHERE"**
   - IP: `0.0.0.0/0` (permite cualquier IP)
   ⚠️ Solo para desarrollo, no usar en producción
   
4. **Opción 2 (Producción)**:
   - Agrega tu IP específica
   - Click en **"ADD CURRENT IP ADDRESS"**
   
5. Click en **"Confirm"**

---

### 3️⃣ **Obtener Connection String** (2 minutos)

1. Ve a **"Database"** en el menú principal
2. En tu cluster, click en **"Connect"**
3. Selecciona **"Connect your application"**
4. Driver: **"Java"**, Version: **"4.11 or later"**
5. Copia el **Connection String**, se verá así:

```
mongodb+srv://cashify_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

### 4️⃣ **Configurar en tu Proyecto** (1 minuto)

#### **Opción A: Editar `application.properties` directamente**

Abre: `src/main/resources/application.properties`

Reemplaza esta línea:
```properties
spring.data.mongodb.uri=${MONGODB_URI:mongodb+srv://<username>:<password>@<cluster-url>/controlgastos?retryWrites=true&w=majority}
```

Con tu connection string real:
```properties
spring.data.mongodb.uri=mongodb+srv://cashify_admin:CashifyPass2025!@cluster0.abc123.mongodb.net/controlgastos?retryWrites=true&w=majority
```

**Componentes del URI:**
- `cashify_admin` → Tu usuario
- `CashifyPass2025!` → Tu contraseña
- `cluster0.abc123.mongodb.net` → Tu cluster URL
- `controlgastos` → Nombre de la base de datos

#### **Opción B: Usar Variable de Entorno (Recomendado)**

**Windows PowerShell:**
```powershell
$env:MONGODB_URI="mongodb+srv://cashify_admin:CashifyPass2025!@cluster0.abc123.mongodb.net/controlgastos?retryWrites=true&w=majority"
mvn spring-boot:run
```

**Windows CMD:**
```cmd
set MONGODB_URI=mongodb+srv://cashify_admin:CashifyPass2025!@cluster0.abc123.mongodb.net/controlgastos?retryWrites=true&w=majority
mvn spring-boot:run
```

**Linux/Mac:**
```bash
export MONGODB_URI="mongodb+srv://cashify_admin:CashifyPass2025!@cluster0.abc123.mongodb.net/controlgastos?retryWrites=true&w=majority"
mvn spring-boot:run
```

---

## 🗄️ Estructura de Base de Datos

MongoDB Atlas creará automáticamente estas colecciones cuando el backend inicie:

```
controlgastos (Database)
├── usuarios (Collection)
│   ├── _id: ObjectId
│   ├── apodo: String (unique)
│   ├── correo: String (unique)
│   ├── contraseña: String
│   ├── transaccionesIds: Array[String]
│   └── categoriasIds: Array[String]
│
├── categorias (Collection)
│   ├── _id: ObjectId
│   ├── nombre: String
│   └── userId: String (referencia)
│
└── transacciones (Collection)
    ├── _id: ObjectId
    ├── tipoTransaccion: String (INGRESO/GASTO)
    ├── categoriaId: String (referencia)
    ├── categoriaNombre: String
    ├── descripcion: String
    ├── fecha: DateTime
    ├── monto: Double
    └── userId: String (referencia)
```

### 📊 **Índices Automáticos**

El backend creará automáticamente estos índices para optimizar búsquedas:

**Colección `usuarios`:**
- Índice único en `apodo`
- Índice único en `correo`

**Colección `categorias`:**
- Índice compuesto en `userId + nombre`

**Colección `transacciones`:**
- Índice en `userId`
- Índice en `categoriaId`
- Índice en `fecha`

---

## 🚀 **Ejecutar el Backend con Atlas**

### Paso 1: Verificar Configuración

Asegúrate de tener actualizado `application.properties` con tu connection string.

### Paso 2: Iniciar Backend

```powershell
cd C:\Users\edben\OneDrive\Desktop\Cashify
mvn clean install
mvn spring-boot:run
```

### Paso 3: Verificar Conexión

Si la conexión es exitosa, verás en los logs:

```
INFO  c.c.ControlGastosApplication - Started ControlGastosApplication in X.XXX seconds
DEBUG o.s.d.m.c.MongoTemplate - Executing query: ...
```

Si hay error de conexión:
```
ERROR c.m.c.cluster : Exception in monitor thread while connecting to server
```

---

## ✅ **Verificar que Todo Funciona**

### 1. **Ver Base de Datos en Atlas**

1. Ve a tu cluster en MongoDB Atlas
2. Click en **"Browse Collections"**
3. Deberías ver la base de datos `controlgastos`
4. Al crear datos desde el frontend, verás las colecciones aparecer

### 2. **Probar Endpoints**

Abre Swagger UI: http://localhost:8080/swagger-ui.html

**Crear un usuario:**
```bash
POST http://localhost:8080/api/usuarios
Content-Type: application/json

{
  "apodo": "demo_atlas",
  "correo": "demo@atlas.com",
  "contraseña": "demo123"
}
```

**Verificar en Atlas:**
1. Ve a "Browse Collections"
2. Abre `controlgastos` → `usuarios`
3. Deberías ver tu usuario creado

---

## 🔍 **Monitorear tu Base de Datos**

### **Panel de MongoDB Atlas**

1. **Métricas**: Ve a tu cluster → Tab "Metrics"
   - Conexiones activas
   - Operaciones por segundo
   - Uso de almacenamiento

2. **Real-Time Performance**: Tab "Performance Advisor"
   - Consultas lentas
   - Recomendaciones de índices

3. **Logs**: Tab "Logs"
   - Ver logs de conexión
   - Debugging de errores

---

## 🐛 **Solución de Problemas**

### ❌ **Error: "Authentication failed"**

**Causa**: Contraseña incorrecta o usuario no existe

**Solución**:
1. Ve a "Database Access" en Atlas
2. Verifica el usuario
3. Genera nueva contraseña si es necesario
4. Actualiza el connection string

### ❌ **Error: "Connection timeout"**

**Causa**: IP no está en whitelist o firewall bloqueando

**Solución**:
1. Ve a "Network Access" en Atlas
2. Agrega `0.0.0.0/0` (desarrollo) o tu IP específica
3. Verifica firewall local (puerto 27017)

### ❌ **Error: "Server selection timeout"**

**Causa**: Cluster pausado o connection string incorrecto

**Solución**:
1. Verifica que el cluster esté activo (botón "Resume")
2. Revisa el connection string (copia y pega desde Atlas)
3. Verifica que tengas el formato correcto:
   ```
   mongodb+srv://user:pass@cluster.xxx.mongodb.net/dbname?options
   ```

### ❌ **Error: "Database name must not be empty"**

**Causa**: Falta el nombre de la base de datos en el URI

**Solución**:
Asegúrate de tener `/controlgastos` antes de `?`:
```
...@cluster0.xxx.mongodb.net/controlgastos?retryWrites=true...
                            ^^^^^^^^^^^^^ esto es importante
```

---

## 💡 **Consejos de Uso**

### **Para Desarrollo:**
```properties
# application.properties
spring.data.mongodb.uri=mongodb+srv://user:pass@cluster.net/controlgastos?retryWrites=true&w=majority
logging.level.org.springframework.data.mongodb=DEBUG
```

### **Para Producción:**
```properties
# application-prod.properties
spring.data.mongodb.uri=${MONGODB_URI}
logging.level.org.springframework.data.mongodb=INFO
```

Ejecutar en producción:
```bash
java -jar control-gastos-api-1.0.0.jar --spring.profiles.active=prod
```

---

## 📊 **Límites del Plan Gratuito (M0)**

- ✅ **Almacenamiento**: 512 MB
- ✅ **RAM**: Compartida
- ✅ **Conexiones**: 500 simultáneas
- ✅ **Backups**: No incluidos (manual)
- ✅ **Uptime**: 99.95%

**¿Es suficiente?**
Sí, para desarrollo y proyectos pequeños (< 1000 usuarios activos).

---

## 🎯 **Checklist de Configuración**

- [ ] Cuenta de MongoDB Atlas creada
- [ ] Cluster M0 (gratuito) creado
- [ ] Usuario de base de datos creado
- [ ] IP whitelist configurada (0.0.0.0/0 o tu IP)
- [ ] Connection string copiado
- [ ] `application.properties` actualizado con tu URI
- [ ] Backend iniciado con `mvn spring-boot:run`
- [ ] Logs muestran "Started ControlGastosApplication"
- [ ] Swagger UI accesible: http://localhost:8080/swagger-ui.html
- [ ] Primer usuario creado exitosamente
- [ ] Colecciones visibles en MongoDB Atlas → Browse Collections

---

## 🎉 **¡Listo!**

Una vez completados estos pasos:

1. **Backend** conectado a MongoDB Atlas ✅
2. **Base de datos** en la nube lista ✅
3. **Datos** persistentes y seguros ✅

Ahora puedes:
- Iniciar el frontend: `cd front && npm run dev`
- Acceder a: http://localhost:3000
- Crear usuarios y transacciones
- Ver datos en tiempo real en MongoDB Atlas

---

**¿Necesitas ayuda?**
- Documentación oficial: https://docs.atlas.mongodb.com/
- Support de Atlas: https://support.mongodb.com/

**¡Disfruta tu app en la nube! 🚀☁️**
