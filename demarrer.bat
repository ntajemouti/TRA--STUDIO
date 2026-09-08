@echo off
title TRA Studio — Lancement
echo ===================================================
echo        TRA STUDIO - PLATEFORME DE RESERVATION
echo ===================================================
echo.

cd /d "%~dp0"

if not exist "node_modules\" (
    echo [1/2] Installation des modules npm...
    call npm.cmd install
) else (
    echo [1/2] Modules deja prets.
)

echo.
echo [2/2] Lancement du serveur...
echo Ouverture de votre navigateur sur http://localhost:3000 ...
echo.

start http://localhost:3000
call npm.cmd run dev

pause
