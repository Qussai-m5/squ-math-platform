@echo off
echo ========================================
echo  Complete Git Setup and Push
echo ========================================
echo.

echo [1/6] Configuring Git with your information...
git config --global user.name "Qussai"
git config --global user.email "q.study13@gmail.com"

echo [2/6] Pulling from GitHub...
git pull origin main --allow-unrelated-histories

echo [3/6] Adding all files...
git add -A

echo [4/6] Creating commit...
git commit -m "Add complete SQU Math Platform"

echo [5/6] Setting branch to main...
git branch -M main

echo [6/6] Pushing to GitHub...
git push -u origin main

echo.
if errorlevel 1 (
    echo ========================================
    echo  Need to force push? Run this:
    echo ========================================
    echo.
    echo git push -f origin main
    echo.
) else (
    echo ========================================
    echo  SUCCESS! All files on GitHub!
    echo ========================================
    echo.
    echo Check: https://github.com/Qussai-m5/squ-math-platform
    echo.
)
pause
