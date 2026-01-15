<<<<<<< HEAD
@echo off
start cmd /k "cd backend && venv\Scripts\python manage.py runserver"
start cmd /k "cd frontend && npm run dev"
echo Servers started in separate windows!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
pause
=======
@echo off
start cmd /k "cd backend && venv\Scripts\python manage.py runserver"
start cmd /k "cd frontend && npm run dev"
echo Servers started in separate windows!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
pause
>>>>>>> 5a4be34354e7c8f47f95d348bd800444e2498a23
