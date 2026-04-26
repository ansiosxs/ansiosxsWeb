@echo off
echo Iniciando servidor frontend...
start "Frontend" cmd /k "npm run dev"
echo Servidor frontend iniciado. Presiona cualquier tecla para cerrar esta ventana.
pause
