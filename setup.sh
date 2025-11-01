#!/bin/bash

# EduTrack Quick Setup Script
# This script helps you set up EduTrack for development

echo "🎓 EduTrack Setup Script"
echo "========================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"
echo -e "${GREEN}✅ npm $(npm -v) detected${NC}"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Root dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install root dependencies${NC}"
    exit 1
fi
echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Server dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install server dependencies${NC}"
    exit 1
fi
cd ..
echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Client dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install client dependencies${NC}"
    exit 1
fi
cd ..
echo ""

# Check for environment files
echo "🔍 Checking environment configuration..."

# Check server .env
if [ ! -f "server/.env" ]; then
    echo -e "${YELLOW}⚠️  Server .env file not found${NC}"
    echo "Creating .env from .env.example..."
    cp server/.env.example server/.env
    echo -e "${YELLOW}⚠️  Please update server/.env with your MongoDB URI${NC}"
else
    echo -e "${GREEN}✅ Server .env file exists${NC}"
fi

# Check client .env
if [ ! -f "client/.env" ]; then
    echo -e "${YELLOW}⚠️  Client .env file not found${NC}"
    echo "Creating .env from .env.example..."
    cp client/.env.example client/.env
    echo -e "${GREEN}✅ Client .env file created${NC}"
else
    echo -e "${GREEN}✅ Client .env file exists${NC}"
fi

echo ""
echo "========================"
echo -e "${GREEN}🎉 Setup completed!${NC}"
echo ""
echo "Next steps:"
echo "1. Update server/.env with your MongoDB connection string"
echo "2. (Optional) Run 'cd server && node seedGuestAccounts.js' to create guest accounts"
echo "3. Start the backend: 'cd server && npm start'"
echo "4. Start the frontend: 'cd client && npm start'"
echo ""
echo "📚 For more information, check README.md"
echo "🚀 For deployment guide, check DEPLOYMENT.md"
echo ""
