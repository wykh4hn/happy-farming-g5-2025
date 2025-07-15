# Build and Run Script for the project

Write-Host "Checking git..." -ForegroundColor Green
git pull

Write-Host "Building frontend..." -ForegroundColor Green
Set-Location -Path .\frontend
npm install
npm run build
Write-Host "Frontend build complete!" -ForegroundColor Green

Write-Host "Starting backend..." -ForegroundColor Green
Set-Location -Path ..\backend

# Check if a virtual environment exists and activate it
if (Test-Path -Path ".\Scripts\Activate.ps1") {
    Write-Host "Activating virtual environment..." -ForegroundColor Yellow
    & .\Scripts\Activate.ps1
} else {
    Write-Host "No virtual environment found. Using system Python." -ForegroundColor Yellow
}

# Install requirements if needed
Write-Host "Installing/Checking dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Run the FastAPI application using uvicorn
Write-Host "Starting FastAPI server..." -ForegroundColor Green
uvicorn app.main:app --reload