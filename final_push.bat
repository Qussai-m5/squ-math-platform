@echo off
echo ========================================
echo  Final Deployment Push
echo ========================================
echo.

echo [1/3] Adding all resolved files...
git add -A

echo [2/3] Finalizing commit...
git commit -m "Resolve conflicts and enable production CORS"

echo [3/3] Pushing to GitHub...
git push -u origin main

echo.
if errorlevel 1 (
    echo ========================================
    echo  Push failed. Try force pushing:
    echo  git push -f origin main
    echo ========================================
) else (
    echo ========================================
    echo  SUCCESS! Changes are on GitHub.
    echo ========================================
    echo.
    echo Render will now update your backend automatically.
    echo.
)
pause
