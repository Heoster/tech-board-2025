#!/bin/bash

echo "Starting TECH BOARD 2025 MCQ System on 192.168.31.1"
echo ""

# Start backend server in background
echo "Starting backend server..."
cd server
npm start &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 3

# Start frontend client
echo "Starting frontend client..."
cd ../client
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  TECH BOARD 2025 MCQ System Started"
echo "========================================"
echo ""
echo "Frontend: http://192.168.31.1:5173"
echo "Backend:  http://192.168.31.1:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait