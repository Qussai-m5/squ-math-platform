@echo off
echo ========================================
echo  Pushing to GitHub for Qussai-m5
echo ========================================
echo.

echo [1/3] Removing old remote URL...
git remote remove origin

echo [2/3] Adding correct remote URL...
git remote add origin https://github.com/Qussai-m5/squ-math-platform.git

echo [3/3] Pushing code to GitHub...
git push -u origin main

echo.
if errorlevel 1 (
    echo ========================================
    echo  ERROR: Push failed!
    echo ========================================
    echo.
    echo Make sure:
    echo 1. You created the repository on GitHub: https://github.com/Qussai-m5/squ-math-platform
    echo 2. The repository is empty (no README)
    echo.
    echo When GitHub asks for credentials:
    echo - Username: Qussai-m5
    echo - Password: Use a Personal Access Token, not your GitHub password
    echo   Create one at: https://github.com/settings/tokens
    echo.
) else (
    echo ========================================
    echo  SUCCESS! Code is on GitHub!
    echo ========================================
    echo.
    echo Repository: https://github.com/Qussai-m5/squ-math-platform
    echo.
    echo Next: Go to render.com and connect this repository!
    echo.
)
pause
