<<<<<<< HEAD
@echo off
cd /d "%~dp0"
echo ==========================================
echo   SQU Math Platform - CLEAN RESTART
echo ==========================================

echo.
echo [1/3] Stopping existing servers...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM python.exe >nul 2>&1
echo Stopped.

echo.
echo [2/3] Verifying Backend (Migrate & Populate)...
:: Use the virtual environment's Python explicitly
if not exist backend\venv (
    echo [ERROR] Virtual environment not found! Please run start_app.bat first.
    pause
    exit /b 1
)

backend\venv\Scripts\python.exe -m pip install -r backend\requirements.txt >nul 2>&1
echo Generating Migrations...
backend\venv\Scripts\python.exe backend\manage.py makemigrations academics resources
echo Applying Migrations...
backend\venv\Scripts\python.exe backend\manage.py migrate
if %errorlevel% neq 0 (
    echo [ERROR] Migration failed. Backend might be broken.
    pause
    exit /b 1
)
backend\venv\Scripts\python.exe backend\populate_courses.py

echo.
echo [3/3] Launching Servers...
:: Use cmd /k to keep the window open if it crashes, so we can see the error
start "Django Backend" cmd /k "backend\venv\Scripts\python.exe backend\manage.py runserver"
echo Backend started... waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo Starting Frontend...
cd frontend
start "React Frontend" "C:\Program Files\nodejs\npm.cmd" run dev

echo.
echo ==========================================
echo   RESTART COMPLETE
echo ==========================================
echo.
echo Please reload your browser!
pause
=======
@echo off
cd /d "%~dp0"
echo ==========================================
echo   SQU Math Platform - CLEAN RESTART
echo ==========================================

echo.
echo [1/3] Stopping existing servers...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM python.exe >nul 2>&1
echo Stopped.

echo.
echo [2/3] Verifying Backend (Migrate & Populate)...
:: Use the virtual environment's Python explicitly
if not exist backend\venv (
    echo [ERROR] Virtual environment not found! Please run start_app.bat first.
    pause
    exit /b 1
)

backend\venv\Scripts\python.exe -m pip install -r backend\requirements.txt >nul 2>&1
echo Generating Migrations...
backend\venv\Scripts\python.exe backend\manage.py makemigrations academics resources
echo Applying Migrations...
backend\venv\Scripts\python.exe backend\manage.py migrate
if %errorlevel% neq 0 (
    echo [ERROR] Migration failed. Backend might be broken.
    pause
    exit /b 1
)
backend\venv\Scripts\python.exe backend\populate_courses.py

echo.
echo [3/3] Launching Servers...
:: Use cmd /k to keep the window open if it crashes, so we can see the error
start "Django Backend" cmd /k "backend\venv\Scripts\python.exe backend\manage.py runserver"
echo Backend started... waiting 5 seconds...
timeout /t 5 /nobreak >nul

echo Starting Frontend...
cd frontend
start "React Frontend" "C:\Program Files\nodejs\npm.cmd" run dev

echo.
echo ==========================================
echo   RESTART COMPLETE
echo ==========================================
echo.
echo Please reload your browser!
pause
>>>>>>> 5a4be34354e7c8f47f95d348bd800444e2498a23
