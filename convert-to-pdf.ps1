# PowerShell script to convert HTML bug report to PDF
param(
    [string]$HtmlFile = "bugreport.html",
    [string]$OutputFile = "bugreport.pdf"
)

Write-Host "Converting HTML bug report to PDF..." -ForegroundColor Green

try {
    # Get full paths
    $currentPath = Get-Location
    $htmlPath = Join-Path $currentPath $HtmlFile
    $pdfPath = Join-Path $currentPath $OutputFile
    
    Write-Host "HTML file: $htmlPath" -ForegroundColor Yellow
    Write-Host "PDF output: $pdfPath" -ForegroundColor Yellow
    
    # Check if HTML file exists
    if (-not (Test-Path $htmlPath)) {
        Write-Error "HTML file not found: $htmlPath"
        exit 1
    }
    
    # Try different approaches to create PDF
    
    # Method 1: Try using Edge browser (if available) to print to PDF
    $edgePath = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
    if (-not (Test-Path $edgePath)) {
        $edgePath = "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
    }
    
    if (Test-Path $edgePath) {
        Write-Host "Using Microsoft Edge to generate PDF..." -ForegroundColor Green
        $arguments = @(
            "--headless"
            "--disable-gpu"
            "--run-all-compositor-stages-before-draw"
            "--print-to-pdf=`"$pdfPath`""
            "--print-to-pdf-no-header"
            "`"$htmlPath`""
        )
        
        Start-Process -FilePath $edgePath -ArgumentList $arguments -Wait -NoNewWindow
        
        if (Test-Path $pdfPath) {
            Write-Host "✅ PDF successfully generated at: $pdfPath" -ForegroundColor Green
            Write-Host "File size: $((Get-Item $pdfPath).Length) bytes" -ForegroundColor Cyan
            exit 0
        }
    }
    
    # Method 2: Try using Chrome (if available)
    $chromePaths = @(
        "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
        "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
        "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
    )
    
    foreach ($chromePath in $chromePaths) {
        if (Test-Path $chromePath) {
            Write-Host "Using Google Chrome to generate PDF..." -ForegroundColor Green
            $arguments = @(
                "--headless"
                "--disable-gpu"
                "--print-to-pdf=`"$pdfPath`""
                "--print-to-pdf-no-header"
                "`"$htmlPath`""
            )
            
            Start-Process -FilePath $chromePath -ArgumentList $arguments -Wait -NoNewWindow
            
            if (Test-Path $pdfPath) {
                Write-Host "✅ PDF successfully generated at: $pdfPath" -ForegroundColor Green
                Write-Host "File size: $((Get-Item $pdfPath).Length) bytes" -ForegroundColor Cyan
                exit 0
            }
            break
        }
    }
    
    # If we get here, neither Edge nor Chrome worked
    Write-Host "❌ Could not generate PDF automatically." -ForegroundColor Red
    Write-Host ""
    Write-Host "Manual Instructions:" -ForegroundColor Yellow
    Write-Host "1. Open the HTML file in your browser: $htmlPath" -ForegroundColor White
    Write-Host "2. Press Ctrl+P to open the Print dialog" -ForegroundColor White
    Write-Host "3. Select 'Microsoft Print to PDF' or 'Save as PDF'" -ForegroundColor White
    Write-Host "4. Save the file as: $pdfPath" -ForegroundColor White
    Write-Host ""
    Write-Host "The HTML file is ready for manual conversion." -ForegroundColor Green
    
} catch {
    Write-Error "An error occurred: $($_.Exception.Message)"
    exit 1
}