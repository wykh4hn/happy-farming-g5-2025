# Build and Run Script for the project

Write-Host "Building frontend..." -ForegroundColor Green
Set-Location -Path .\frontend
npm install
npm run build

# Check if build was successful
if (-not (Test-Path ".\build\index.html")) {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Frontend build complete!" -ForegroundColor Green

Write-Host "Starting backend..." -ForegroundColor Green
Set-Location -Path ..\backend\wApp

# Activate virtual environment
if (Test-Path -Path ".\Scripts\Activate.ps1") {
    & .\Scripts\Activate.ps1
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

# Run the FastAPI application
Write-Host "Backend running at http://localhost:8000" -ForegroundColor Green
uvicorn app.main:app --reload
