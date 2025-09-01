#!/bin/bash

echo "🚀 Starting Toshi Web App..."
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

echo "📦 Installing dependencies..."
npm run install-deps

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🔧 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting for backend to start..."
sleep 5

echo "🎨 Starting frontend server..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Both servers are starting..."
echo "🔗 Backend: http://localhost:5000"
echo "🔗 Frontend: http://localhost:3000"
echo ""
echo "📱 WhatsApp: https://api.whatsapp.com/send/?phone=%2B254713159136"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Function to cleanup processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Trap Ctrl+C
trap cleanup INT

# Wait for processes
wait
