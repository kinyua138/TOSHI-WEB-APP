@echo off
echo Starting Toshi Web App...
echo.

echo Installing dependencies...
call npm run install-deps

echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
