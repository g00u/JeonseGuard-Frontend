#!/bin/bash

echo "📡 Fetching latest upstream info..."
git fetch upstream || exit 1

echo "🔄 Switching to develop branch..."
git checkout develop || exit 1

echo "⬇️ Pulling latest upstream develop..."
git pull upstream develop || exit 1

echo "🔀 Switching back to test branch..."
git checkout test || exit 1

echo "🔃 Merging develop into test..."
git merge develop

echo "✅ Merge complete. If there are conflicts, resolve them before committing."
