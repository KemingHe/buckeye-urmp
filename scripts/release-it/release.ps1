#!/usr/bin/env pwsh

# Exit immediately if a command exits with a non-zero status.
$ErrorActionPreference = "Stop"

# Function to display an error message in red and exit.
function Abort {
    param (
        [string]$message
    )
    Write-Host "Failure: $message" -ForegroundColor Red
    exit 1
}

try {
    # Get the current branch name
    $BRANCH = git rev-parse --abbrev-ref HEAD

    # Check if the branch is production or preview
    if ($BRANCH -eq "production" -or $BRANCH -eq "preview") {
        Write-Host "Skipping versioning for $BRANCH branch"
        exit 0
    }

    # Disable Husky, run release-it, and then re-enable Husky
    $env:HUSKY = 0
    pnpm release-it --ci
    Remove-Item Env:HUSKY
} catch {
    Abort $_.Exception.Message
}
