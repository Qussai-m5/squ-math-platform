@echo off
start cmd /k "cd backend && venv\Scripts\python manage.py runserver"
start cmd /k "cd frontend && npm run dev"
echo Servers started in separate windows!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
pause
