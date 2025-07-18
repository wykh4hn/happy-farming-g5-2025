# Build and Run Script for the project

Write-Host "Building frontend..." -ForegroundColor Green
Set-Location -Path .\frontend
npm run build

# Check if build was successful
if (-not (Test-Path ".\build\index.html")) {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Frontend build complete!" -ForegroundColor Green

Write-Host "Starting backend..." -ForegroundColor Green
Set-Location -Path ..\backend

# Activate virtual environment
if (Test-Path -Path ".\Scripts\Activate.ps1") {
    & .\Scripts\Activate.ps1
}

# Run the FastAPI application
Write-Host "Backend running at http://localhost:8000" -ForegroundColor Green
uvicorn app.main:app --reload