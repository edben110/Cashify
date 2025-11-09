# Script para iniciar el proyecto Cashify localmente

Write-Host "🚀 Iniciando Cashify..." -ForegroundColor Green
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "back") -or -not (Test-Path "front")) {
    Write-Host "❌ Error: Ejecuta este script desde el directorio raíz del proyecto" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Iniciando Backend (Spring Boot)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\back'; Write-Host '🔧 Backend corriendo en http://localhost:8080' -ForegroundColor Green; mvn spring-boot:run"

Write-Host "⏳ Esperando 10 segundos para que el backend inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "🎨 Iniciando Frontend (Next.js)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\front'; Write-Host '🌐 Frontend corriendo en http://localhost:3000' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "✅ Proyecto iniciado!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 URLs importantes:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend API: http://localhost:8080/api" -ForegroundColor White
Write-Host "   Swagger UI: http://localhost:8080/swagger-ui.html" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Para detener: Cierra las ventanas de PowerShell que se abrieron" -ForegroundColor Yellow
