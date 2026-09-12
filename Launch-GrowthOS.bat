@echo off
title MasterTech Growth OS - Launcher
cd /d "%~dp0"

echo [MasterTech Growth OS] Iniciando servicios locales...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000') do taskkill /f /pid %%a >nul 2>&1

start /b npx tsx apps/api/src/index.ts
timeout /t 2 /nobreak >nul

if exist "apps\desktop\main.js" (
    npx electron apps/desktop/main.js
) else (
    start http://localhost:4000
)