@echo off
echo ========================================
echo  Syncing with GitHub
echo ========================================
echo.

echo [1/4] Pulling changes from GitHub...
git pull origin main --rebase

echo [2/4] Adding all files...
git add -A

echo [3/4] Creating commit...
git commit -m "Add all project files including backend and frontend"

echo [4/4] Pushing to GitHub...
git push origin main

echo.
if errorlevel 1 (
    echo ========================================
    echo  Still having issues? Force push!
    echo ========================================
    echo.
    echo If you're SURE you want to overwrite GitHub with your local files:
    echo Run this command in Command Prompt:
    echo.
    echo git push -f origin main
    echo.
) else (
    echo ========================================
    echo  SUCCESS!
    echo ========================================
    echo.
    echo Check: https://github.com/Qussai-m5/squ-math-platform
    echo You should see backend and frontend folders now!
    echo.
)
pause
