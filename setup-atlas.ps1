# Script para configurar y probar conexión a MongoDB Atlas
# Ejecutar en PowerShell

Write-Host "========================================" -ForegroundColor Green
Write-Host "  CONFIGURACIÓN MONGODB ATLAS" -ForegroundColor Green
Write-Host "  CA`$HIFY - Control de Gastos" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Paso 1: Solicitar información de conexión
Write-Host "[PASO 1/5] Información de MongoDB Atlas" -ForegroundColor Cyan
Write-Host ""
Write-Host "Necesito los datos de tu cluster de MongoDB Atlas:" -ForegroundColor Yellow
Write-Host ""

$username = Read-Host "Usuario de MongoDB Atlas (ej: cashify_admin)"
$password = Read-Host "Contraseña" -AsSecureString
$passwordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

Write-Host ""
Write-Host "Ejemplo de Cluster URL: cluster0.abc123.mongodb.net" -ForegroundColor Gray
$clusterUrl = Read-Host "Cluster URL (sin mongodb+srv://)"

Write-Host ""
$database = Read-Host "Nombre de la base de datos (Enter para 'controlgastos')"
if ([string]::IsNullOrWhiteSpace($database)) {
    $database = "controlgastos"
}

# Construir URI
$mongoUri = "mongodb+srv://${username}:${passwordPlain}@${clusterUrl}/${database}?retryWrites=true&w=majority"

Write-Host ""
Write-Host "[PASO 2/5] URI de Conexión Generado" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tu URI de conexión es:" -ForegroundColor Yellow
Write-Host $mongoUri -ForegroundColor White
Write-Host ""

# Paso 3: Actualizar application.properties
Write-Host "[PASO 3/5] Actualizando application.properties..." -ForegroundColor Cyan

$appPropertiesPath = "back\src\main\resources\application.properties"

if (Test-Path $appPropertiesPath) {
    # Leer contenido
    $content = Get-Content $appPropertiesPath -Raw
    
    # Reemplazar la línea del URI
    $pattern = 'spring\.data\.mongodb\.uri=.*'
    $replacement = "spring.data.mongodb.uri=$mongoUri"
    $newContent = $content -replace $pattern, $replacement
    
    # Guardar
    Set-Content -Path $appPropertiesPath -Value $newContent
    
    Write-Host "✓ application.properties actualizado" -ForegroundColor Green
} else {
    Write-Host "✗ No se encontró application.properties" -ForegroundColor Red
    Write-Host "Copia manualmente este URI:" -ForegroundColor Yellow
    Write-Host $mongoUri -ForegroundColor White
}

Write-Host ""

# Paso 4: Crear archivo .env con la URI (opcional)
Write-Host "[PASO 4/5] Creando archivo .env..." -ForegroundColor Cyan

$envContent = @"
# MongoDB Atlas Configuration
MONGODB_URI=$mongoUri

# Para usar este archivo, ejecuta:
# PowerShell: `$env:MONGODB_URI = (Get-Content .env | Where-Object {`$_ -like 'MONGODB_URI=*'}).Split('=')[1]
# CMD: for /f "tokens=2 delims==" %i in ('findstr MONGODB_URI .env') do set MONGODB_URI=%i
"@

Set-Content -Path ".env" -Value $envContent
Write-Host "✓ Archivo .env creado" -ForegroundColor Green
Write-Host ""

# Paso 5: Instrucciones finales
Write-Host "[PASO 5/5] Próximos pasos" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Verifica tu configuración en MongoDB Atlas:" -ForegroundColor Yellow
Write-Host "   • Database Access: Usuario creado ✓" -ForegroundColor White
Write-Host "   • Network Access: IP 0.0.0.0/0 permitida ✓" -ForegroundColor White
Write-Host ""
Write-Host "2. Inicia el backend:" -ForegroundColor Yellow
Write-Host "   cd back" -ForegroundColor White
Write-Host "   mvn clean install" -ForegroundColor White
Write-Host "   mvn spring-boot:run" -ForegroundColor White
Write-Host ""
Write-Host "3. Verifica la conexión:" -ForegroundColor Yellow
Write-Host "   • Si ves 'Started ControlGastosApplication' → ✓ Éxito" -ForegroundColor White
Write-Host "   • Si ves errores de conexión → Revisa la guía MONGODB_ATLAS_GUIA.md" -ForegroundColor White
Write-Host ""
Write-Host "4. Prueba la API:" -ForegroundColor Yellow
Write-Host "   http://localhost:8080/swagger-ui.html" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Configuración completada" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$start = Read-Host "¿Deseas iniciar el backend ahora? (S/N)"
if ($start -eq 'S' -or $start -eq 's') {
    Write-Host ""
    Write-Host "Iniciando backend..." -ForegroundColor Cyan
    Set-Location back
    mvn spring-boot:run
}
