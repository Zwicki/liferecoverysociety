@echo off
cd /d "%~dp0"
set GIT="%LOCALAPPDATA%\Programs\Git\cmd\git.exe"

echo ========================================================
echo   Pushing Updates to GitHub for Auto Netlify Deploy
echo ========================================================
echo.

%GIT% add .
set /p commit_msg="Enter update description (press Enter for 'Site update'): "
if "%commit_msg%"=="" set commit_msg=Site update

%GIT% commit -m "%commit_msg%"
%GIT% push origin main

echo.
echo ========================================================
echo   Pushed! Netlify is now automatically building & deploying.
echo ========================================================
pause
