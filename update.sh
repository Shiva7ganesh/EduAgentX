#!/bin/bash
set -e  # exit if any command fails

# Move to the repo root
cd "$(dirname "$0")"

echo "update the server"
git pull
echo "Pulled the content successfully"

cd client
echo "Installing the packages"
npm install

echo "Building the packages"
npm run build

cp -r dist/* ../server/frontend/
echo "Moved the content successfully"

pm2 restart 0
echo "Restarted the server successfully"
