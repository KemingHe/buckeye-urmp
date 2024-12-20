#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to display an error message in red and exit.
abort() {
  echo -e "\033[0;31mFailure: $1\033[0m"
  exit 1
}

# Get the current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD) || abort "Failed to get the current branch name."

# Check if the branch is production or preview
if [ "$BRANCH" = "production" ] || [ "$BRANCH" = "preview" ]; then
  echo "Skipping versioning for $BRANCH branch"
  exit 0
fi

# Disable Husky, run release-it, and then re-enable Husky
export HUSKY=0
pnpm release-it --ci || abort "Failed to run release-it."
unset HUSKY
