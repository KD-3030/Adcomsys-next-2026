# Production Pre-flight Checklist Script
# Run this before deploying to production

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AdComSys 2026 - Production Pre-flight Check" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$allPassed = $true

# Check 1: Environment file
Write-Host "1. Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "   ✓ .env.local exists" -ForegroundColor Green
    
    $envContent = Get-Content ".env.local" -Raw
    $requiredVars = @(
        "NEXT_PUBLIC_SITE_URL",
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "SUPABASE_SERVICE_ROLE_KEY"
    )
    
    foreach ($var in $requiredVars) {
        if ($envContent -match $var) {
            Write-Host "   ✓ $var is set" -ForegroundColor Green
        } else {
            Write-Host "   ✗ $var is missing" -ForegroundColor Red
            $allPassed = $false
        }
    }
} else {
    Write-Host "   ✗ .env.local not found" -ForegroundColor Red
    $allPassed = $false
}

# Check 2: Required files
Write-Host "`n2. Checking required files..." -ForegroundColor Yellow

$requiredFiles = @{
    "public/robots.txt" = "Robots.txt"
    "next-sitemap.config.js" = "Sitemap config"
    "public/site.webmanifest" = "Web manifest"
    "src/lib/metadata.ts" = "Metadata helper"
    "src/components/layout/StructuredData.tsx" = "Structured data"
}

foreach ($file in $requiredFiles.Keys) {
    if (Test-Path $file) {
        Write-Host "   ✓ $($requiredFiles[$file]) exists" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $($requiredFiles[$file]) missing" -ForegroundColor Red
        $allPassed = $false
    }
}

# Check 3: Favicon files (warning only)
Write-Host "`n3. Checking favicon files..." -ForegroundColor Yellow

$faviconFiles = @(
    "public/favicon.ico",
    "public/favicon-16x16.png",
    "public/favicon-32x32.png",
    "public/apple-touch-icon.png"
)

$missingFavicons = @()
foreach ($file in $faviconFiles) {
    if (Test-Path $file) {
        Write-Host "   ✓ $(Split-Path $file -Leaf) exists" -ForegroundColor Green
    } else {
        Write-Host "   ⚠ $(Split-Path $file -Leaf) missing (recommended)" -ForegroundColor Yellow
        $missingFavicons += $file
    }
}

# Check 4: OG Image (warning only)
Write-Host "`n4. Checking Open Graph image..." -ForegroundColor Yellow
if (Test-Path "public/og-image.png") {
    Write-Host "   ✓ OG image exists" -ForegroundColor Green
    $ogImage = Get-Item "public/og-image.png"
    $sizeMB = [math]::Round($ogImage.Length / 1MB, 2)
    Write-Host "   → Size: $sizeMB MB" -ForegroundColor Cyan
    if ($sizeMB -gt 1) {
        Write-Host "   ⚠ Image size > 1MB (optimize recommended)" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⚠ OG image missing (recommended)" -ForegroundColor Yellow
}

# Check 5: Build test
Write-Host "`n5. Testing production build..." -ForegroundColor Yellow
Write-Host "   → Running 'npm run build'..." -ForegroundColor Cyan

$buildOutput = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Build successful" -ForegroundColor Green
} else {
    Write-Host "   ✗ Build failed" -ForegroundColor Red
    Write-Host "`nBuild output:" -ForegroundColor Yellow
    Write-Host $buildOutput
    $allPassed = $false
}

# Check 6: Dependencies
Write-Host "`n6. Checking dependencies..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" | ConvertFrom-Json

$criticalDeps = @("next", "react", "next-sitemap", "@supabase/supabase-js")
foreach ($dep in $criticalDeps) {
    if ($packageJson.dependencies.$dep) {
        Write-Host "   ✓ $dep installed" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $dep missing" -ForegroundColor Red
        $allPassed = $false
    }
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if ($allPassed) {
    Write-Host "✓ All critical checks passed!" -ForegroundColor Green
    Write-Host "`nYour app is ready for production deployment.`n" -ForegroundColor Green
    
    if ($missingFavicons.Count -gt 0) {
        Write-Host "Recommendations:" -ForegroundColor Yellow
        Write-Host "- Create favicon files using https://realfavicongenerator.net/" -ForegroundColor Yellow
        Write-Host "- Create OG image (1200x630px) for social sharing" -ForegroundColor Yellow
    }
    
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. Review PRODUCTION_DEPLOYMENT.md" -ForegroundColor White
    Write-Host "2. Set production environment variables in Vercel" -ForegroundColor White
    Write-Host "3. Deploy: git push or use Vercel CLI" -ForegroundColor White
    Write-Host "4. Verify deployment and submit sitemap to search engines`n" -ForegroundColor White
} else {
    Write-Host "✗ Some critical checks failed!" -ForegroundColor Red
    Write-Host "`nPlease fix the issues above before deploying.`n" -ForegroundColor Red
}

Write-Host "For detailed deployment instructions, see:" -ForegroundColor Cyan
Write-Host "- PRODUCTION_DEPLOYMENT.md" -ForegroundColor White
Write-Host "- SEO_PRODUCTION_SUMMARY.md`n" -ForegroundColor White
