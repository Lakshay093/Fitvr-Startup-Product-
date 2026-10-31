@echo off
setlocal

set "ROOT=%~dp0"
cd /d "%ROOT%"

set "WEB_DIR=%ROOT%apps\web"

set "WEB_PORT=%~1"
if "%WEB_PORT%"=="" set "WEB_PORT=3000"

set "API_PORT=%~2"
if "%API_PORT%"=="" set "API_PORT=4000"

set "REQUESTED_WEB_PORT=%WEB_PORT%"
for /f %%P in ('powershell -NoProfile -ExecutionPolicy Bypass -Command "$start=[int]$env:WEB_PORT; $used=[System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners().Port; for ($p=$start; $p -le ($start + 50); $p++) { if ($used -notcontains $p) { $p; break } }"') do set "WEB_PORT=%%P"
if "%WEB_PORT%"=="" (
  echo Could not find a free web port near %REQUESTED_WEB_PORT%.
  pause
  exit /b 1
)

set "REQUESTED_API_PORT=%API_PORT%"
for /f %%P in ('powershell -NoProfile -ExecutionPolicy Bypass -Command "$start=[int]$env:API_PORT; $used=[System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners().Port; for ($p=$start; $p -le ($start + 50); $p++) { if ($used -notcontains $p) { $p; break } }"') do set "API_PORT=%%P"
if "%API_PORT%"=="" (
  echo Could not find a free API port near %REQUESTED_API_PORT%.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo   Fit.VR local launcher
echo ==========================================
if not "%WEB_PORT%"=="%REQUESTED_WEB_PORT%" echo Web port %REQUESTED_WEB_PORT% is busy. Using %WEB_PORT% instead.
if not "%API_PORT%"=="%REQUESTED_API_PORT%" echo API port %REQUESTED_API_PORT% is busy. Using %API_PORT% instead.
echo Web: http://localhost:%WEB_PORT%
echo API: http://localhost:%API_PORT%
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or not available in PATH.
  echo Install Node.js 20 LTS or 22 LTS, then run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not installed or not available in PATH.
  pause
  exit /b 1
)

if not exist "%ROOT%node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

set "NEXT_DEV_CACHE=%WEB_DIR%\.next\dev"
if exist "%NEXT_DEV_CACHE%" (
  echo Refreshing generated Next.js dev cache...
  rmdir /s /q "%NEXT_DEV_CACHE%"
  if errorlevel 1 (
    echo Could not clear the generated Next.js dev cache.
    echo Close any running Fit.VR Web window, then run this file again.
    pause
    exit /b 1
  )
)

echo Building shared package...
call npm --workspace @fitvr/shared run build
if errorlevel 1 (
  echo Shared package build failed.
  pause
  exit /b 1
)

echo Starting Fit.VR API...
start "Fit.VR API" cmd /k "cd /d ""%ROOT%"" && set PORT=%API_PORT% && set CORS_ORIGIN=http://localhost:%WEB_PORT% && npm --workspace @fitvr/api run dev"

echo Starting Fit.VR Web...
start "Fit.VR Web" cmd /k "cd /d ""%WEB_DIR%"" && node ..\..\node_modules\next\dist\bin\next dev --port %WEB_PORT%"

echo.
echo Fit.VR is starting.
echo Open this URL after the web window says Ready:
echo http://localhost:%WEB_PORT%
echo.
echo Tip: use another port if needed:
echo run-fitvr-local.bat 3020 4000
echo.

timeout /t 5 /nobreak >nul
start "" "http://localhost:%WEB_PORT%"

endlocal
