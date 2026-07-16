#!/bin/bash
# =============================================
#  Sariga Skincare Store — Deploy Script
#  Target: /opt/sariga-app
#  Backend: 8044 | Frontend: 5044 | DB: sariga-db
# =============================================

set -e

APP_DIR="/opt/sariga-app"
SERVER_DIR="$APP_DIR/server"
CLIENT_DIR="$APP_DIR/client"

echo "🚀 Deploying Sariga Skincare Store..."
echo ""

# 1. Create directory
echo "[1/6] Creating $APP_DIR..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# 2. Copy files
echo "[2/6] Copying project files..."
cp -r ./* $APP_DIR/
cp -r ./.[!.]* $APP_DIR/ 2>/dev/null || true

# 3. Install backend deps
echo "[3/6] Installing server dependencies..."
cd $SERVER_DIR
npm install --production
cp .env.production .env

# 4. Install frontend deps & build
echo "[4/6] Installing client dependencies & building..."
cd $CLIENT_DIR
npm install
npm run build

# 5. Stop old PM2 processes
echo "[5/6] Stopping old PM2 processes..."
pm2 delete sariga-backend 2>/dev/null || true
pm2 delete sariga-frontend 2>/dev/null || true

# 6. Start with PM2
echo "[6/6] Starting with PM2..."
cd $APP_DIR
pm2 start ecosystem.config.json
pm2 save

echo ""
echo "✅ Deploy complete!"
echo ""
echo "   Backend API:  http://localhost:8044"
echo "   Frontend App: http://localhost:5044"
echo ""
echo "   pm2 status"
echo "   pm2 logs sariga-backend"
echo "   pm2 logs sariga-frontend"
