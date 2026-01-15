<<<<<<< HEAD
@echo off
cd /d "%~dp0"
echo ==========================================
echo   SQU Math Platform - Startup Script
echo ==========================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Python is NOT installed or not in PATH.
    echo Backend API will NOT run. Frontend will use fallback data.
    echo.
) else (
    echo [OK] Python found.
)

:: Check for Node.js
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js executable not found at expected path.
    pause
    exit /b 1
)
echo [OK] Node.js found.

echo.
echo Setting up Backend...
cd backend
if not exist venv (
    echo Creating virtual environment...
    "C:\Users\Jx77m\AppData\Local\Programs\Python\Python314\python.exe" -m venv venv
)
:: Use the virtual environment's Python explicitly
venv\Scripts\python.exe -m pip install -r requirements.txt
venv\Scripts\python.exe manage.py migrate
venv\Scripts\python.exe populate_courses.py
start "Django Backend" venv\Scripts\python.exe manage.py runserver

echo.
echo Setting up Frontend...
cd ..\frontend
call "C:\Program Files\nodejs\npm.cmd" install
start "React Frontend" "C:\Program Files\nodejs\npm.cmd" run dev

echo.
echo ==========================================
echo   Application Launched!
echo   Backend: http://127.0.0.1:8000
echo   Frontend: http://localhost:5173
echo ==========================================
pause
=======
@echo off
cd /d "%~dp0"
echo ==========================================
echo   SQU Math Platform - Startup Script
echo ==========================================
echo.

:: Check for Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Python is NOT installed or not in PATH.
    echo Backend API will NOT run. Frontend will use fallback data.
    echo.
) else (
    echo [OK] Python found.
)

:: Check for Node.js
"C:\Program Files\nodejs\node.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js executable not found at expected path.
    pause
    exit /b 1
)
echo [OK] Node.js found.

echo.
echo Setting up Backend...
cd backend
if not exist venv (
    echo Creating virtual environment...
    "C:\Users\Jx77m\AppData\Local\Programs\Python\Python314\python.exe" -m venv venv
)
:: Use the virtual environment's Python explicitly
venv\Scripts\python.exe -m pip install -r requirements.txt
venv\Scripts\python.exe manage.py migrate
venv\Scripts\python.exe populate_courses.py
start "Django Backend" venv\Scripts\python.exe manage.py runserver

echo.
echo Setting up Frontend...
cd ..\frontend
call "C:\Program Files\nodejs\npm.cmd" install
start "React Frontend" "C:\Program Files\nodejs\npm.cmd" run dev

echo.
echo ==========================================
echo   Application Launched!
echo   Backend: http://127.0.0.1:8000
echo   Frontend: http://localhost:5173
echo ==========================================
pause
>>>>>>> 5a4be34354e7c8f47f95d348bd800444e2498a23
