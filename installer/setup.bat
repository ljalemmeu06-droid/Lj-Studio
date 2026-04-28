@echo off
setlocal

set "APP_NAME=Updated Studio Software"
set "INSTALL_DIR=%LOCALAPPDATA%\UpdatedStudioSoftware"
set "SOURCE_DIR=%~dp0app"
set "RUNTIME_DIR=%~dp0runtime"
set "LAUNCHER=%INSTALL_DIR%\Start Updated Studio.bat"
set "DESKTOP_SHORTCUT=%USERPROFILE%\Desktop\Updated Studio Software.lnk"

echo Installing %APP_NAME%...

if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"
xcopy "%SOURCE_DIR%\*" "%INSTALL_DIR%\" /E /I /Y >nul
xcopy "%RUNTIME_DIR%\*" "%INSTALL_DIR%\runtime\" /E /I /Y >nul

(
  echo @echo off
  echo cd /d "%%LOCALAPPDATA%%\UpdatedStudioSoftware"
  echo if not exist "runtime\python\python.exe" ^(
  echo   echo The bundled app runtime is missing.
  echo   echo Please reinstall Updated Studio Software.
  echo   pause
  echo   exit /b 1
  echo ^)
  echo start "Updated Studio Server" /min "runtime\python\python.exe" studio_server.py
  echo timeout /t 2 /nobreak ^>nul
  echo start "" "http://127.0.0.1:4174/"
) > "%LAUNCHER%"

powershell -NoProfile -ExecutionPolicy Bypass -Command "$shell = New-Object -ComObject WScript.Shell; $shortcut = $shell.CreateShortcut('%DESKTOP_SHORTCUT%'); $shortcut.TargetPath = '%LAUNCHER%'; $shortcut.WorkingDirectory = '%INSTALL_DIR%'; $shortcut.IconLocation = '%SystemRoot%\System32\shell32.dll,220'; $shortcut.Save()"

echo.
echo %APP_NAME% was installed to:
echo %INSTALL_DIR%
echo.
echo A desktop shortcut was created.
echo Double-click "Updated Studio Software" on the desktop to launch the app.
echo.
pause
