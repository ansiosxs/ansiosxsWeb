@echo off
echo Iniciando servidor backend...
start "Backend" cmd /k "cd backend && node server.js"
timeout /t 3 /nobreak > nul
echo Iniciando servidor frontend...
start "Frontend" cmd /k "npm run dev"
echo Ambos servidores iniciados. Presiona cualquier tecla para cerrar esta ventana.
pause
