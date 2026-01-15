@echo off
echo ========================================
echo  Fix GitHub Remote URL
echo ========================================
echo.

echo Please enter your GitHub username:
set /p GITHUB_USER="GitHub username: "

echo.
echo Removing old remote...
git remote remove origin

echo Adding correct remote URL...
git remote add origin https://github.com/%GITHUB_USER%/squ-math-platform.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo  Done!
echo ========================================
pause
