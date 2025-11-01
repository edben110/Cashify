# Script para iniciar el backend de CA$HIFY

Write-Host "========================================" -ForegroundColor Green
Write-Host "  CA`$HIFY - Backend" -ForegroundColor Green
Write-Host "  Spring Boot + MongoDB Atlas" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Cambiar a directorio back
Set-Location back

Write-Host "Iniciando servidor backend..." -ForegroundColor Cyan
Write-Host "Puerto: 8080" -ForegroundColor Yellow
Write-Host "Swagger UI: http://localhost:8080/swagger-ui.html" -ForegroundColor Yellow
Write-Host ""

# Iniciar Spring Boot
mvn spring-boot:run
