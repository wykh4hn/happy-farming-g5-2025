# Development script that avoids unnecessary rebuilds

# Function to start a process in a new window
function Start-ProcessInNewWindow {
    param (
        [string]$WorkingDirectory,
        [string]$Command
    )
    
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$WorkingDirectory'; $Command"
}

Write-Host "Starting development environment..." -ForegroundColor Green

# Start frontend dev server (with hot reloading)
Write-Host "Starting React development server..." -ForegroundColor Blue
Start-ProcessInNewWindow -WorkingDirectory "$PSScriptRoot\frontend" -Command "npm start"

# Start backend with auto-reload
Write-Host "Starting FastAPI backend server..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\backend\wApp"

# Activate virtual environment if it exists
if (Test-Path -Path ".\Scripts\Activate.ps1") {
    & .\Scripts\Activate.ps1
    Write-Host "Virtual environment activated." -ForegroundColor Yellow
} else {
    Write-Host "Virtual environment not found. Creating one..." -ForegroundColor Yellow
    python -m venv .
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to create virtual environment!" -ForegroundColor Red
        exit 1
    }
    & .\Scripts\Activate.ps1
    Write-Host "Virtual environment created and activated." -ForegroundColor Green
}

# Run the FastAPI application with auto-reload
Write-Host "Backend running at http://localhost:8000" -ForegroundColor Green
uvicorn app.main:app --reload

# lmao