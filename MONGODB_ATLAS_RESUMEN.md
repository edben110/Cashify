# 📝 RESUMEN: Configuración MongoDB Atlas

## ✅ ¿Qué debes hacer en MongoDB Atlas?

### 1. **Crear Cluster** (GRATUITO M0)
   - Ir a: https://www.mongodb.com/cloud/atlas/register
   - Crear cuenta
   - Crear cluster M0 (512MB gratis)
   - Región: La más cercana a ti

### 2. **Configurar Usuario**
   - Database Access → Add New Database User
   - Username: `cashify_admin` (o el que prefieras)
   - Password: [Genera una segura]
   - Role: "Atlas Admin" o "Read and Write to any database"

### 3. **Configurar Red (IP Whitelist)**
   - Network Access → Add IP Address
   - **Desarrollo**: Allow Access from Anywhere (0.0.0.0/0)
   - **Producción**: Solo tu IP específica

### 4. **Obtener Connection String**
   - Database → Connect → Connect your application
   - Driver: Java 4.11+
   - Copiar el URI que se parece a:
   ```
   mongodb+srv://usuario:<password>@cluster0.xxxxx.mongodb.net/
   ```

---

## 🔧 ¿Qué debes configurar en el Proyecto?

### Opción A: Editar `application.properties`

Archivo: `src/main/resources/application.properties`

Buscar esta línea:
```properties
spring.data.mongodb.uri=${MONGODB_URI:mongodb+srv://<username>:<password>@<cluster-url>/controlgastos?retryWrites=true&w=majority}
```

Reemplazar con tu URI real:
```properties
spring.data.mongodb.uri=mongodb+srv://cashify_admin:TuPassword123@cluster0.abc123.mongodb.net/controlgastos?retryWrites=true&w=majority
```

**Componentes:**
- `cashify_admin` → Tu usuario
- `TuPassword123` → Tu contraseña
- `cluster0.abc123.mongodb.net` → URL de tu cluster
- `controlgastos` → Nombre de tu base de datos

### Opción B: Usar Script Automático

Ejecuta en PowerShell:
```powershell
.\setup-atlas.ps1
```

Este script te pedirá:
1. Usuario
2. Contraseña
3. Cluster URL
4. Nombre de la base de datos

Y automáticamente configurará todo.

---

## 🗄️ Estructura de Base de Datos (Se crea automáticamente)

```
controlgastos                    ← Base de datos
├── usuarios                     ← Colección (se crea al insertar primer usuario)
│   ├── _id: ObjectId
│   ├── apodo: String (único)
│   ├── correo: String (único)
│   ├── contraseña: String
│   └── ...
│
├── categorias                   ← Colección (se crea al insertar primera categoría)
│   ├── _id: ObjectId
│   ├── nombre: String
│   ├── userId: String
│   └── ...
│
└── transacciones               ← Colección (se crea al insertar primera transacción)
    ├── _id: ObjectId
    ├── tipoTransaccion: String
    ├── monto: Double
    ├── fecha: DateTime
    └── ...
```

**NO necesitas crear las colecciones manualmente**, Spring Data MongoDB las crea automáticamente cuando insertas el primer documento.

---

## 🚀 Iniciar el Backend

Una vez configurado el URI:

```powershell
# Compilar e instalar
mvn clean install

# Iniciar backend
mvn spring-boot:run
```

Si la conexión es exitosa verás:
```
INFO  c.c.ControlGastosApplication : Started ControlGastosApplication in X.XXX seconds
```

---

## ✅ Verificar que Funciona

### 1. Swagger UI
Abrir: http://localhost:8080/swagger-ui.html

### 2. Crear primer usuario
```bash
POST http://localhost:8080/api/usuarios
{
  "apodo": "test_atlas",
  "correo": "test@atlas.com",
  "contraseña": "test123"
}
```

### 3. Ver en MongoDB Atlas
1. Ir a tu cluster
2. Click en "Browse Collections"
3. Deberías ver:
   - Base de datos: `controlgastos`
   - Colección: `usuarios`
   - Documento: El usuario que creaste

---

## 🐛 Solución Rápida de Problemas

### ❌ "Authentication failed"
→ Verifica usuario y contraseña en Database Access

### ❌ "Connection timeout"
→ Agrega 0.0.0.0/0 en Network Access

### ❌ "Server selection timeout"
→ Verifica que el cluster esté activo (no pausado)

### ❌ "Database name must not be empty"
→ Agrega `/controlgastos` en el URI antes de `?`

---

## 📚 Documentación Completa

Ver archivo: `MONGODB_ATLAS_GUIA.md` para instrucciones detalladas paso a paso.

---

## 💡 Tips

- ✅ El plan M0 (gratuito) es suficiente para desarrollo
- ✅ Atlas tiene auto-backups cada 24h (plan pago)
- ✅ Puedes monitorear tu base de datos en el dashboard de Atlas
- ✅ Las colecciones se crean automáticamente al insertar datos
- ✅ Los índices se crean automáticamente por Spring Data

---

**¡Listo para usar MongoDB Atlas! 🎉**
