@echo off
title MasterTech Growth OS Launcher
cd /d "C:\Users\andre\mastertech-growth-os"

echo ========================================================
echo       MasterTech Growth OS - Windows Desktop Client
echo ========================================================
echo.
echo Liberando puertos en caso de instancias previas...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000') do taskkill /f /pid %%a >nul 2>&1

echo Iniciando Core Engine en segundo plano...
start /b cmd /c "npm run dev:api"

echo Esperando inicializacion del motor...
timeout /t 4 /nobreak >nul

echo Iniciando aplicacion de escritorio nativa...
start "" npx electron apps/desktop/main.js
exit
