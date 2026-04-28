$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root "dist"
$build = Join-Path $root "build\UpdatedStudioSetup"
$pythonUrl = "https://www.python.org/ftp/python/3.12.10/python-3.12.10-embed-amd64.zip"
$pythonZip = Join-Path $root "build\python-embed.zip"

Remove-Item -Recurse -Force $build -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $build | Out-Null
New-Item -ItemType Directory -Force $dist | Out-Null
New-Item -ItemType Directory -Force (Join-Path $build "app") | Out-Null
New-Item -ItemType Directory -Force (Join-Path $build "runtime\python") | Out-Null

Copy-Item -Path (Join-Path $root "src\*") -Destination (Join-Path $build "app") -Recurse -Force
Copy-Item -Path (Join-Path $root "installer\setup.bat") -Destination $build -Force
Copy-Item -Path (Join-Path $root "installer\uninstall.bat") -Destination $build -Force
Copy-Item -Path (Join-Path $root "README.md") -Destination (Join-Path $build "README.txt") -Force

if (-not (Test-Path $pythonZip)) {
  Invoke-WebRequest -Uri $pythonUrl -OutFile $pythonZip
}

Expand-Archive -LiteralPath $pythonZip -DestinationPath (Join-Path $build "runtime\python") -Force

$zipPath = Join-Path $dist "updated-studio-one-click-installer.zip"
Compress-Archive -Path (Join-Path $build "*") -DestinationPath $zipPath -Force

Write-Host "Built installer: $zipPath"
