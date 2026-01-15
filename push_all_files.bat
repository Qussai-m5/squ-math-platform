<<<<<<< HEAD
@echo off
echo ========================================
echo  Pushing ALL files to GitHub
echo ========================================
echo.

echo Adding all files (including backend folder)...
git add -A

echo Creating commit...
git commit -m "Add all project files including backend and frontend"

echo Pushing to GitHub...
git push -u origin main

echo.
if errorlevel 1 (
    echo ERROR: Something went wrong
    echo.
    echo When asked for password, use your token:
    echo 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
    echo.
) else (
    echo ========================================
    echo  SUCCESS!
    echo ========================================
    echo.
    echo Go to https://github.com/Qussai-m5/squ-math-platform
    echo You should now see the backend folder!
    echo.
    echo Then retry the Render deployment.
    echo.
)
pause
=======
@echo off
echo ========================================
echo  Pushing ALL files to GitHub
echo ========================================
echo.

echo Adding all files (including backend folder)...
git add -A

echo Creating commit...
git commit -m "Add all project files including backend and frontend"

echo Pushing to GitHub...
git push -u origin main

echo.
if errorlevel 1 (
    echo ERROR: Something went wrong
    echo.
    echo When asked for password, use your token:
    echo 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
    echo.
) else (
    echo ========================================
    echo  SUCCESS!
    echo ========================================
    echo.
    echo Go to https://github.com/Qussai-m5/squ-math-platform
    echo You should now see the backend folder!
    echo.
    echo Then retry the Render deployment.
    echo.
)
pause
>>>>>>> 5a4be34354e7c8f47f95d348bd800444e2498a23
