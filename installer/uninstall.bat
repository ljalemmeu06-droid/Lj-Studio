@echo off
setlocal

set "INSTALL_DIR=%LOCALAPPDATA%\UpdatedStudioSoftware"
set "DESKTOP_SHORTCUT=%USERPROFILE%\Desktop\Updated Studio Software.lnk"

echo Uninstalling Updated Studio Software...

if exist "%DESKTOP_SHORTCUT%" del "%DESKTOP_SHORTCUT%"
if exist "%INSTALL_DIR%" rmdir /S /Q "%INSTALL_DIR%"

echo.
echo Updated Studio Software was removed.
echo.
pause
