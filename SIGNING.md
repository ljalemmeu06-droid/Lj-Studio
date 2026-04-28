# Signing the Updated Studio installer

Windows may warn customers when an installer is not signed. The proper fix is to sign the installer with a real code-signing certificate.

## What you need

- A code-signing certificate from a trusted certificate authority.
- Windows SDK SignTool (`signtool.exe`).
- The installer ZIP or installer EXE you want to distribute.

## Recommended signing target

For best customer experience, create a real `.exe` or `.msi` installer, then sign that file.

The current package is a ZIP containing `setup.bat`, the app files, and a bundled runtime. ZIP files can be shared, but Windows SmartScreen trust is much better with a signed installer executable.

## Sign with SignTool

After you have a certificate installed in your Windows certificate store, run:

```powershell
powershell -ExecutionPolicy Bypass -File signing/sign-installer.ps1 -InstallerPath "public-app-downloads-only/updated-studio-one-click-installer.zip"
```

If you create a `.exe` installer later, replace the path with that installer path.

## Important

Do not bypass or disable Windows security warnings for customers. Signing proves the file came from you and helps customers install it safely.
