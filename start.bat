@echo off
setlocal

echo ===============================================
echo   GlowCare Skincare Store - Server Launcher
echo ===============================================
echo.

:: Try to find npm in common locations
set "NPM_CMD="

:: Check if npm is already in PATH
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set "NPM_CMD=npm"
    goto :found
)

:: Check Program Files
if exist "C:\Program Files\nodejs\npm.cmd" (
    set "NPM_CMD=C:\Program Files\nodejs\npm.cmd"
    goto :found
)

:: Check Program Files (x86)
if exist "C:\Program Files (x86)\nodejs\npm.cmd" (
    set "NPM_CMD=C:\Program Files (x86)\nodejs\npm.cmd"
    goto :found
)

:: Check AppData nvm
if exist "%APPDATA%\nvm\npm.cmd" (
    set "NPM_CMD=%APPDATA%\nvm\npm.cmd"
    goto :found
)

:: Check AppData fnm
for /d %%i in ("%APPDATA%\..\Local\fnm_multishells\*") do (
    if exist "%%i\npm.cmd" (
        set "NPM_CMD=%%i\npm.cmd"
        goto :found
    )
)

echo ERROR: npm not found! Please install Node.js.
echo Download from: https://nodejs.org
pause
exit /b 1

:found
echo Using npm: %NPM_CMD%
echo.

:: Install server dependencies
echo [1/2] Installing server dependencies...
cd /d "%~dp0server"
call "%NPM_CMD%" install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install server dependencies
    pause
    exit /b 1
)
echo.

:: Install client dependencies
echo [2/2] Installing client dependencies...
cd /d "%~dp0client"
call "%NPM_CMD%" install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install client dependencies
    pause
    exit /b 1
)
echo.

echo ===============================================
echo   Starting Servers
echo ===============================================
echo.
echo Backend API:  http://localhost:5000
echo Frontend App: http://localhost:5173
echo.

echo Starting Backend Server...
cd /d "%~dp0server"
start "GlowCare Backend" cmd /k "cd /d %~dp0server && %NPM_CMD% run dev"

timeout /t 4 /nobreak >nul

echo Starting Frontend Server...
cd /d "%~dp0client"
start "GlowCare Frontend" cmd /k "cd /d %~dp0client && %NPM_CMD% run dev"

echo.
echo Both servers launching in separate windows...
echo Open http://localhost:5173 in your browser once the frontend starts.
echo.

timeout /t 3 /nobreak >nul
