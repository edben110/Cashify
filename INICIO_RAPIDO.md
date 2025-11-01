# 🚀 INICIO RÁPIDO - Control de Gastos API

## ⚡ Pasos para ejecutar la aplicación

### 1️⃣ Verificar Requisitos
✅ Java 21 instalado
✅ Maven instalado
✅ MongoDB ejecutándose en `localhost:27017`

Para verificar MongoDB, ejecuta:
```bash
# Windows
mongosh

# Linux/Mac
mongo
```

### 2️⃣ Iniciar MongoDB (si no está ejecutándose)

**Windows:**
```bash
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
# o
brew services start mongodb-community
```

### 3️⃣ Ejecutar la aplicación

**Opción 1 - Usando Maven:**
```bash
mvn spring-boot:run
```

**Opción 2 - Usando scripts:**
```bash
# Windows
run.bat

# Linux/Mac
chmod +x run.sh
./run.sh
```

### 4️⃣ Acceder a la aplicación

Una vez iniciada, accede a:

- **Swagger UI (Documentación interactiva):**  
  http://localhost:8080/swagger-ui.html

- **Probar un endpoint de ejemplo:**  
  http://localhost:8080/api/usuarios

## 📋 Ejemplo de Prueba Rápida

### 1. Crear un usuario
```bash
curl -X POST http://localhost:8080/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "apodo": "usuario1",
    "correo": "usuario1@example.com",
    "contraseña": "password123"
  }'
```

### 2. Crear una categoría
```bash
curl -X POST http://localhost:8080/api/categorias/usuario/{userId} \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Alimentos"
  }'
```

### 3. Crear una transacción
```bash
curl -X POST http://localhost:8080/api/transacciones/usuario/{userId} \
  -H "Content-Type: application/json" \
  -d '{
    "tipoTransaccion": "GASTO",
    "categoriaId": "{categoriaId}",
    "descripcion": "Compra de supermercado",
    "fecha": "2025-10-28T14:30:00",
    "monto": 150.50
  }'
```

### 4. Ver resumen de gastos
```bash
curl http://localhost:8080/api/transacciones/usuario/{userId}/resumen
```

## 🧪 Ejecutar Tests

```bash
mvn test
```

## 🛑 Detener la aplicación

Presiona `Ctrl + C` en la terminal donde está ejecutándose la aplicación.

## 📚 Documentación Completa

Consulta el archivo `README.md` para más información detallada.

## ⚠️ Solución de Problemas

### Error: MongoDB no está ejecutándose
```
Solución: Inicia MongoDB con el comando 'mongod'
```

### Error: Puerto 8080 en uso
```
Solución 1: Detén la aplicación que está usando el puerto 8080
Solución 2: Cambia el puerto en application.properties:
  server.port=8081
```

### Error: Java 21 no encontrado
```
Solución: Verifica la versión de Java con 'java -version'
Si no tienes Java 21, descárgalo de: https://adoptium.net/
```

## ✅ ¡Todo listo!

La API está funcionando correctamente cuando veas en la consola:

```
========================================
Control de Gastos API - Iniciada
========================================
Swagger UI: http://localhost:8080/swagger-ui.html
API Docs: http://localhost:8080/api-docs
Base URL: http://localhost:8080/api
========================================
```

**¡Ahora puedes usar la API! 🎉**
