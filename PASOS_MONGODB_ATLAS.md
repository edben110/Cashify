# 🎯 PASOS EXACTOS: MongoDB Atlas para CA$HIFY

## 📋 LO QUE DEBES CONFIGURAR EN MONGODB ATLAS

### ═══════════════════════════════════════════════
### PASO 1: CREAR CUENTA Y CLUSTER (5 min)
### ═══════════════════════════════════════════════

1. **Ir a MongoDB Atlas**
   ```
   https://www.mongodb.com/cloud/atlas/register
   ```

2. **Registrarse** (puedes usar Google/GitHub)

3. **Crear Cluster GRATUITO**
   - Click en "Build a Database"
   - Seleccionar **"M0 FREE"** (el que dice "FOREVER FREE")
   - Cloud Provider: AWS (recomendado)
   - Region: Elegir la más cercana a ti
   - Cluster Name: Dejar "Cluster0" o poner "CashifyCluster"
   - Click en **"Create"** (espera 3-5 minutos)

### ═══════════════════════════════════════════════
### PASO 2: CREAR USUARIO DE BASE DE DATOS (2 min)
### ═══════════════════════════════════════════════

1. **En el menú izquierdo → "Database Access"**

2. **Click en "+ ADD NEW DATABASE USER"**

3. **Configurar usuario:**
   ```
   Authentication Method: [Password]
   
   Username: cashify_admin
   Password: [Generar automático o crear una]
   
   ⚠️ COPIA Y GUARDA LA CONTRASEÑA
   Ejemplo: CashifyPass2025!
   ```

4. **Database User Privileges:**
   - Seleccionar: **"Built-in Role"**
   - Elegir: **"Atlas admin"** o **"Read and write to any database"**

5. **Click en "Add User"**

### ═══════════════════════════════════════════════
### PASO 3: CONFIGURAR ACCESO DE RED (2 min)
### ═══════════════════════════════════════════════

1. **En el menú izquierdo → "Network Access"**

2. **Click en "+ ADD IP ADDRESS"**

3. **Para DESARROLLO:**
   - Click en **"ALLOW ACCESS FROM ANYWHERE"**
   - IP Address: `0.0.0.0/0`
   - Description: "Acceso de desarrollo"
   - Click en **"Confirm"**

4. **Para PRODUCCIÓN (más seguro):**
   - Click en **"ADD CURRENT IP ADDRESS"**
   - Agrega tu IP específica

### ═══════════════════════════════════════════════
### PASO 4: OBTENER CONNECTION STRING (2 min)
### ═══════════════════════════════════════════════

1. **Volver a "Database" (menú principal)**

2. **En tu cluster, click en botón "Connect"**

3. **Seleccionar "Connect your application"**

4. **Configuración:**
   ```
   Driver: Java
   Version: 4.11 or later
   ```

5. **COPIAR el Connection String que aparece:**
   ```
   mongodb+srv://cashify_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **MODIFICAR el Connection String:**
   - Reemplazar `<password>` con tu contraseña real
   - Agregar `/controlgastos` después de `.net/` y antes de `?`
   
   **RESULTADO FINAL:**
   ```
   mongodb+srv://cashify_admin:CashifyPass2025!@cluster0.abc123.mongodb.net/controlgastos?retryWrites=true&w=majority
   ```

---

## 🔧 LO QUE DEBES CONFIGURAR EN TU PROYECTO

### ═══════════════════════════════════════════════
### OPCIÓN A: CONFIGURACIÓN MANUAL
### ═══════════════════════════════════════════════

**Archivo:** `src/main/resources/application.properties`

1. **Abrir el archivo**

2. **Buscar esta línea:**
   ```properties
   spring.data.mongodb.uri=${MONGODB_URI:mongodb+srv://<username>:<password>@<cluster-url>/controlgastos?retryWrites=true&w=majority}
   ```

3. **Reemplazar con tu URI completo:**
   ```properties
   spring.data.mongodb.uri=mongodb+srv://cashify_admin:CashifyPass2025!@cluster0.abc123.mongodb.net/controlgastos?retryWrites=true&w=majority
   ```

4. **Guardar el archivo**

### ═══════════════════════════════════════════════
### OPCIÓN B: USAR SCRIPT AUTOMÁTICO
### ═══════════════════════════════════════════════

**En PowerShell:**

```powershell
cd C:\Users\edben\OneDrive\Desktop\Cashify
.\setup-atlas.ps1
```

El script te pedirá:
- Usuario: `cashify_admin`
- Contraseña: `CashifyPass2025!`
- Cluster URL: `cluster0.abc123.mongodb.net`
- Database: `controlgastos`

Y configurará todo automáticamente.

---

## 🚀 INICIAR EL BACKEND

```powershell
cd C:\Users\edben\OneDrive\Desktop\Cashify

# Limpiar y compilar
mvn clean install

# Iniciar
mvn spring-boot:run
```

### ✅ **SI FUNCIONA, verás:**
```
INFO  c.c.ControlGastosApplication : Started ControlGastosApplication in X.XXX seconds
```

### ❌ **SI HAY ERROR, verás:**
```
ERROR c.m.c.cluster : Exception in monitor thread while connecting to server
```

→ Revisa los pasos anteriores

---

## 🗄️ ESTRUCTURA DE BASE DE DATOS

### NO necesitas crear nada manualmente en Atlas

Spring Boot creará automáticamente:

```
controlgastos (Base de datos)
│
├── usuarios (Colección)
│   └── Se crea al registrar el primer usuario
│
├── categorias (Colección)
│   └── Se crea al crear la primera categoría
│
└── transacciones (Colección)
    └── Se crea al crear la primera transacción
```

**Los índices también se crean automáticamente:**
- `usuarios`: índices únicos en `apodo` y `correo`
- `categorias`: índice en `userId`
- `transacciones`: índices en `userId`, `categoriaId`, `fecha`

---

## ✅ VERIFICAR QUE TODO FUNCIONA

### 1. **Abrir Swagger UI**
```
http://localhost:8080/swagger-ui.html
```

### 2. **Crear un usuario de prueba**

En Swagger, buscar **"User Controller"** → **POST /api/usuarios**

Click en "Try it out" y pegar:
```json
{
  "apodo": "test_atlas",
  "correo": "test@atlas.com",
  "contraseña": "test123"
}
```

Click en "Execute"

**Respuesta esperada (200 OK):**
```json
{
  "id": "67401234567890abcdef1234",
  "apodo": "test_atlas",
  "correo": "test@atlas.com",
  "totalTransacciones": 0,
  "totalCategorias": 0
}
```

### 3. **Ver en MongoDB Atlas**

1. Ir a tu cluster en Atlas
2. Click en **"Browse Collections"**
3. Deberías ver:
   ```
   controlgastos
   └── usuarios (1 documento)
       └── {
             "_id": ObjectId(...),
             "apodo": "test_atlas",
             "correo": "test@atlas.com",
             ...
           }
   ```

---

## 🎮 INICIAR FRONTEND

Una vez que el backend esté funcionando:

```powershell
# Nueva terminal
cd C:\Users\edben\OneDrive\Desktop\Cashify\front
npm install
npm run dev
```

Abrir: http://localhost:3000

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ "MongoSocketOpenException: Exception opening socket"
**Causa:** IP no está en whitelist
**Solución:** Network Access → Add 0.0.0.0/0

### ❌ "MongoSecurityException: Exception authenticating"
**Causa:** Usuario o contraseña incorrectos
**Solución:** Database Access → Verifica usuario o crea nuevo

### ❌ "MongoTimeoutException: Timed out after 30000 ms"
**Causa:** Cluster pausado o URL incorrecta
**Solución:** 
- Verifica que el cluster esté activo
- Revisa el connection string

### ❌ "IllegalArgumentException: The database name must not be null"
**Causa:** Falta `/controlgastos` en el URI
**Solución:** Asegúrate de tener:
```
...@cluster0.xxx.mongodb.net/controlgastos?retryWrites=true...
                            ^^^^^^^^^^^^^ esto es importante
```

---

## 📊 EJEMPLO COMPLETO DE URI

**PLANTILLA:**
```
mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/<DATABASE>?retryWrites=true&w=majority
```

**EJEMPLO REAL:**
```
mongodb+srv://cashify_admin:CashifyPass2025!@cluster0.abc123.mongodb.net/controlgastos?retryWrites=true&w=majority
```

**COMPONENTES:**
- **cashify_admin** → Tu usuario de Database Access
- **CashifyPass2025!** → La contraseña que creaste
- **cluster0.abc123.mongodb.net** → URL de tu cluster (la da Atlas)
- **controlgastos** → Nombre de tu base de datos

---

## 📝 CHECKLIST FINAL

- [ ] ✅ Cuenta de MongoDB Atlas creada
- [ ] ✅ Cluster M0 (gratuito) creado y activo
- [ ] ✅ Usuario `cashify_admin` creado en Database Access
- [ ] ✅ Contraseña copiada y guardada
- [ ] ✅ IP 0.0.0.0/0 agregada en Network Access
- [ ] ✅ Connection String copiado y modificado
- [ ] ✅ `/controlgastos` agregado al URI
- [ ] ✅ `application.properties` actualizado
- [ ] ✅ Backend compilado: `mvn clean install`
- [ ] ✅ Backend iniciado: `mvn spring-boot:run`
- [ ] ✅ Logs muestran "Started ControlGastosApplication"
- [ ] ✅ Swagger UI accesible: http://localhost:8080/swagger-ui.html
- [ ] ✅ Usuario de prueba creado exitosamente
- [ ] ✅ Usuario visible en MongoDB Atlas → Browse Collections
- [ ] ✅ Frontend iniciado: `cd front && npm run dev`
- [ ] ✅ Aplicación accesible: http://localhost:3000

---

## 🎉 ¡LISTO!

Tu aplicación CA$HIFY ahora está usando MongoDB Atlas (base de datos en la nube).

**Ventajas:**
- ✅ No necesitas instalar MongoDB localmente
- ✅ Datos seguros y con backup
- ✅ Accesible desde cualquier lugar
- ✅ Gratis hasta 512MB

**Próximos pasos:**
1. Crear usuarios desde el frontend
2. Crear categorías
3. Registrar transacciones
4. Ver estadísticas

---

**¿Dudas? Consulta:** `MONGODB_ATLAS_GUIA.md` (guía completa detallada)

**¡Disfruta tu app en la nube! 🚀☁️💚**
