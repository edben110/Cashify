# ⚡ INICIO RÁPIDO: MongoDB Atlas (2 minutos)

## 🎯 EN MONGODB ATLAS:

### 1️⃣ Crear Cluster GRATIS
- https://www.mongodb.com/cloud/atlas/register
- "Build a Database" → M0 FREE → Create

### 2️⃣ Crear Usuario
- Database Access → Add New User
- User: `cashify_admin`
- Pass: `CashifyPass2025!` (cámbialo)
- Role: "Atlas admin"

### 3️⃣ Permitir IP
- Network Access → Add IP Address
- "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)

### 4️⃣ Copiar Connection String
- Database → Connect → Connect your application
- Copiar el URI y modificarlo:

```
mongodb+srv://cashify_admin:CashifyPass2025!@cluster0.xxxxx.mongodb.net/controlgastos?retryWrites=true&w=majority
```

---

## 💻 EN TU PROYECTO:

### Editar: `src/main/resources/application.properties`

Buscar y reemplazar:
```properties
spring.data.mongodb.uri=TU_URI_DE_ATLAS_AQUÍ
```

### Iniciar:
```powershell
mvn clean install
mvn spring-boot:run
```

---

## ✅ VERIFICAR:

- Swagger: http://localhost:8080/swagger-ui.html
- Crear usuario de prueba
- Ver en Atlas → Browse Collections

---

## 📚 MÁS AYUDA:

- **Resumen visual**: `PASOS_MONGODB_ATLAS.md`
- **Guía completa**: `MONGODB_ATLAS_GUIA.md`
- **Script automático**: `.\setup-atlas.ps1`

¡Listo! 🚀
