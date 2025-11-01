# Script para iniciar el Frontend de CA$HIFY
Write-Host "================================================" -ForegroundColor Green
Write-Host "   CA$HIFY - Frontend Retro Terminal" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Cambiar al directorio del frontend
Set-Location -Path "front"

# Instalar dependencias si es necesario
if (-not (Test-Path "node_modules")) {
    Write-Host "[1/2] Instalando dependencias..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Iniciar servidor de desarrollo
Write-Host "[2/2] Iniciando servidor Next.js..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Frontend disponible en: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
Write-Host ""

npm run dev
