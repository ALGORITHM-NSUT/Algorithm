#!/bin/bash

# Start frontend in background
cd frontend && npm run dev &

# Get the frontend process ID (PID)
frontend_pid=$!

# Start backend in background
cd backend && nodemon &

# Get the backend process ID (PID)
backend_pid=$!

# Function to kill the processes when the script exits
cleanup() {
    echo "Killing frontend and backend processes..."
    kill $frontend_pid
    kill $backend_pid
}

# Set the cleanup function to be called on exit
trap cleanup EXIT

# Wait for all background processes to finish
wait

