<<<<<<< HEAD
@echo off
echo ========================================
echo  SQU Math Platform - GitHub Setup
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [1/7] Configuring Git with your name and email...
git config --global user.name "Qussai"
git config --global user.email "q.study13@gmail.com"

echo [2/7] Initializing Git repository...
git init

echo [3/7] Adding all files...
git add .

echo [4/7] Creating first commit...
git commit -m "Initial commit - SQU Math Platform"

echo [5/7] Renaming branch to main...
git branch -M main

echo.
echo [6/7] Now we need your GitHub repository URL
echo.
echo Please:
echo 1. Go to github.com and create a new repository called: squ-math-platform
echo 2. Copy the repository URL (it looks like: https://github.com/USERNAME/squ-math-platform.git)
echo.
set /p REPO_URL="Paste your GitHub repository URL here: "

echo.
echo [7/7] Connecting to GitHub and pushing code...
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ========================================
echo  SUCCESS! Your code is now on GitHub!
echo ========================================
echo.
echo Next step: Go to render.com and connect your repository
echo.
pause
=======
@echo off
echo ========================================
echo  SQU Math Platform - GitHub Setup
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [1/7] Configuring Git with your name and email...
git config --global user.name "Qussai"
git config --global user.email "q.study13@gmail.com"

echo [2/7] Initializing Git repository...
git init

echo [3/7] Adding all files...
git add .

echo [4/7] Creating first commit...
git commit -m "Initial commit - SQU Math Platform"

echo [5/7] Renaming branch to main...
git branch -M main

echo.
echo [6/7] Now we need your GitHub repository URL
echo.
echo Please:
echo 1. Go to github.com and create a new repository called: squ-math-platform
echo 2. Copy the repository URL (it looks like: https://github.com/USERNAME/squ-math-platform.git)
echo.
set /p REPO_URL="Paste your GitHub repository URL here: "

echo.
echo [7/7] Connecting to GitHub and pushing code...
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo ========================================
echo  SUCCESS! Your code is now on GitHub!
echo ========================================
echo.
echo Next step: Go to render.com and connect your repository
echo.
pause
>>>>>>> 5a4be34354e7c8f47f95d348bd800444e2498a23
