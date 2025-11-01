#!/bin/bash
# Script para iniciar la aplicación Control de Gastos

echo "========================================"
echo "Control de Gastos - API REST"
echo "========================================"
echo ""
echo "Verificando MongoDB..."
echo "MongoDB debe estar ejecutándose en localhost:27017"
echo ""
echo "Iniciando la aplicación..."
echo ""

cd back
mvn spring-boot:run

echo ""
echo "========================================"
echo "La aplicación se ha detenido"
echo "========================================"
