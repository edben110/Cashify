# 🚀 Guía de Despliegue en Producción

Esta guía describe los pasos para desplegar la API de Control de Gastos en producción.

---

## 📋 Pre-requisitos

- ✅ MongoDB Atlas o servidor MongoDB en producción
- ✅ Servidor con Java 21 instalado
- ✅ Variable de entorno configurada
- ✅ SSL/TLS configurado (recomendado)

---

## 🔐 Configuración de Seguridad

### 1. Variables de Entorno

Crea un archivo `application-prod.properties`:

```properties
# Servidor
server.port=${PORT:8080}
spring.application.name=control-gastos-api

# MongoDB Production
spring.data.mongodb.uri=${MONGODB_URI:mongodb+srv://usuario:password@cluster.mongodb.net/controlgastos}
spring.data.mongodb.auto-index-creation=true

# Logging
logging.level.org.springframework=INFO
logging.level.com.controlgastos=INFO
logging.file.name=/var/log/controlgastos/application.log

# Swagger (opcional en producción)
springdoc.api-docs.enabled=${SWAGGER_ENABLED:false}
springdoc.swagger-ui.enabled=${SWAGGER_ENABLED:false}

# CORS (ajustar según tus dominios)
app.cors.allowed-origins=${CORS_ORIGINS:https://tudominio.com}
```

### 2. Actualizar CorsConfig

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### 3. Seguridad de Contraseñas

**IMPORTANTE**: Implementar encriptación de contraseñas con BCrypt:

```java
// Agregar a pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

```java
// UserService.java - Actualizar método crearUsuario
@Autowired
private PasswordEncoder passwordEncoder;

public UserResponseDTO crearUsuario(UserRequestDTO userRequestDTO) {
    // Encriptar contraseña
    String passwordEncriptada = passwordEncoder.encode(userRequestDTO.getContraseña());
    
    User user = new User(
            userRequestDTO.getApodo(),
            userRequestDTO.getCorreo(),
            passwordEncriptada
    );
    
    // ... resto del código
}
```

---

## 🗄️ MongoDB Atlas

### 1. Crear Cluster

1. Accede a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo cluster (free tier disponible)
4. Configura el acceso a la red (IP Whitelist)
5. Crea un usuario de base de datos

### 2. Obtener Connection String

```
mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/controlgastos?retryWrites=true&w=majority
```

### 3. Configurar en la Aplicación

```bash
export MONGODB_URI="mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/controlgastos"
```

---

## 📦 Compilación para Producción

### 1. Construir JAR

```bash
# Limpiar y compilar
mvn clean package -DskipTests

# O con tests
mvn clean package
```

El JAR se generará en: `target/control-gastos-api-1.0.0.jar`

### 2. Verificar JAR

```bash
java -jar target/control-gastos-api-1.0.0.jar --version
```

---

## ☁️ Opciones de Despliegue

### Opción 1: Heroku

#### Preparación

```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Crear app
heroku create control-gastos-api

# Configurar MongoDB
heroku addons:create mongolab:sandbox
# O usar MongoDB Atlas
heroku config:set MONGODB_URI="mongodb+srv://..."

# Desplegar
git push heroku main
```

#### Procfile

```
web: java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/control-gastos-api-1.0.0.jar
```

### Opción 2: AWS Elastic Beanstalk

```bash
# Instalar EB CLI
pip install awsebcli

# Inicializar
eb init -p java-21 control-gastos-api

# Crear entorno
eb create control-gastos-env

# Configurar variables
eb setenv MONGODB_URI="mongodb+srv://..."

# Desplegar
eb deploy
```

### Opción 3: Google Cloud Platform

```bash
# Instalar gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Crear app
gcloud app create

# Configurar app.yaml
# Ver ejemplo abajo

# Desplegar
gcloud app deploy
```

#### app.yaml

```yaml
runtime: java21
instance_class: F2

env_variables:
  MONGODB_URI: "mongodb+srv://..."
  SPRING_PROFILES_ACTIVE: "prod"

automatic_scaling:
  max_instances: 5
  min_instances: 1
```

### Opción 4: Docker + Cualquier Host

#### Dockerfile

```dockerfile
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY target/control-gastos-api-1.0.0.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - MONGODB_URI=mongodb+srv://...
      - SPRING_PROFILES_ACTIVE=prod
    restart: unless-stopped
```

#### Comandos Docker

```bash
# Construir imagen
docker build -t control-gastos-api .

# Ejecutar contenedor
docker run -d -p 8080:8080 \
  -e MONGODB_URI="mongodb+srv://..." \
  -e SPRING_PROFILES_ACTIVE=prod \
  --name control-gastos-api \
  control-gastos-api

# Ver logs
docker logs -f control-gastos-api
```

### Opción 5: VPS (DigitalOcean, Linode, etc.)

```bash
# Conectar al servidor
ssh usuario@tu-servidor.com

# Instalar Java 21
sudo apt update
sudo apt install openjdk-21-jdk

# Subir JAR
scp target/control-gastos-api-1.0.0.jar usuario@tu-servidor.com:/opt/controlgastos/

# Crear servicio systemd
sudo nano /etc/systemd/system/controlgastos.service
```

#### controlgastos.service

```ini
[Unit]
Description=Control de Gastos API
After=network.target

[Service]
Type=simple
User=appuser
WorkingDirectory=/opt/controlgastos
ExecStart=/usr/bin/java -jar -Dspring.profiles.active=prod /opt/controlgastos/control-gastos-api-1.0.0.jar
Restart=on-failure
Environment="MONGODB_URI=mongodb+srv://..."

[Install]
WantedBy=multi-user.target
```

```bash
# Iniciar servicio
sudo systemctl daemon-reload
sudo systemctl enable controlgastos
sudo systemctl start controlgastos

# Ver estado
sudo systemctl status controlgastos

# Ver logs
sudo journalctl -u controlgastos -f
```

---

## 🔒 HTTPS/SSL

### Opción 1: Let's Encrypt + Nginx

#### Nginx Config

```nginx
server {
    listen 80;
    server_name api.tudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.tudominio.com;

    ssl_certificate /etc/letsencrypt/live/api.tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.tudominio.com/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Opción 2: Spring Boot con SSL

```properties
# application-prod.properties
server.port=8443
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=tu-password
server.ssl.key-store-type=PKCS12
```

---

## 📊 Monitoreo

### 1. Spring Boot Actuator

```xml
<!-- Agregar a pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

```properties
# application-prod.properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
```

### 2. Logs

```properties
# Configurar logback-spring.xml para producción
logging.level.root=INFO
logging.file.name=/var/log/controlgastos/application.log
logging.file.max-size=10MB
logging.file.max-history=10
```

---

## ✅ Checklist de Despliegue

### Antes del Despliegue
- [ ] Tests pasando (`mvn test`)
- [ ] Variables de entorno configuradas
- [ ] MongoDB en producción configurado
- [ ] CORS configurado para dominio de producción
- [ ] Contraseñas encriptadas con BCrypt
- [ ] Swagger deshabilitado (opcional)
- [ ] Logs configurados correctamente

### Durante el Despliegue
- [ ] Compilar JAR de producción
- [ ] Subir archivos al servidor
- [ ] Configurar variables de entorno
- [ ] Iniciar aplicación
- [ ] Verificar logs de inicio

### Después del Despliegue
- [ ] Verificar endpoint de health: `/actuator/health`
- [ ] Probar endpoints principales
- [ ] Verificar conexión a MongoDB
- [ ] Configurar SSL/HTTPS
- [ ] Configurar backup de base de datos
- [ ] Configurar monitoreo
- [ ] Documentar URLs de producción

---

## 🔄 CI/CD (GitHub Actions)

### .github/workflows/deploy.yml

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 21
      uses: actions/setup-java@v2
      with:
        java-version: '21'
        distribution: 'temurin'
    
    - name: Build with Maven
      run: mvn clean package -DskipTests
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "control-gastos-api"
        heroku_email: "tu-email@example.com"
```

---

## 🆘 Solución de Problemas

### Error: Cannot connect to MongoDB
```bash
# Verificar connection string
echo $MONGODB_URI

# Verificar conectividad
telnet cluster.mongodb.net 27017

# Verificar IP whitelist en MongoDB Atlas
```

### Error: Port already in use
```bash
# Cambiar puerto en application.properties
server.port=8081

# O usar variable de entorno
export PORT=8081
```

### Error: Out of Memory
```bash
# Aumentar memoria heap
java -Xmx512m -Xms256m -jar control-gastos-api-1.0.0.jar
```

---

## 📚 Recursos Adicionales

- [Spring Boot Deployment](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Heroku Java Support](https://devcenter.heroku.com/articles/getting-started-with-java)
- [Docker Documentation](https://docs.docker.com/)

---

**¡Listo para producción! 🎉**
