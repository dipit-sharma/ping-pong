#!/bin/bash

# Ping Pong Game Startup Script

echo "🏓 Starting Ping Pong Multiplayer Game..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Install server dependencies if needed
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server
    npm install
    cd ..
    echo "✅ Server dependencies installed"
    echo ""
fi

# Install client dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing client dependencies..."
    npm install
    echo "✅ Client dependencies installed"
    echo ""
fi

echo "🚀 Starting the game..."
echo ""
echo "📱 The game will be available at:"
echo "   - iOS Simulator: Press 'i' after Expo starts"
echo "   - Android Emulator: Press 'a' after Expo starts"
echo "   - Web Browser: Press 'w' after Expo starts"
echo ""
echo "🌐 Server will run on: http://localhost:3001"
echo ""

# Start server in background
echo "🔧 Starting Socket.IO server..."
cd server
npm start &
SERVER_PID=$!
cd ..

# Wait a moment for server to start
sleep 2

# Start client
echo "📱 Starting React Native app..."
npm start

# Cleanup when client exits
echo ""
echo "🛑 Stopping server..."
kill $SERVER_PID 2>/dev/null
echo "✅ Game stopped" 