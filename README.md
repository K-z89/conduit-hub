# conduit-hub

Central multi-server dashboard for Psiphon Conduit nodes  
A futuristic UI to manage multiple Conduit hosting instances, aggregate live stats (traffic, users, etc.), and help censored users access the open internet.

**Purpose**: Volunteer-based proxy relays (Conduit) to support free internet access, especially in high-censorship regions.

## Features
- Add/remove/manage multiple servers (VPS or personal machines)
- Aggregate real stats from Prometheus metrics endpoint (port 9090)
- Dark, cyberpunk-style dashboard with animations, live charts
- Simple backend for collecting metrics (no SSH, just public /metrics)
- Fully local, no telemetry or cloud dependency

## Tech Stack
- **Backend**: Node.js + Express
- **Frontend**: React + Vite + Tailwind CSS + Chart.js
- **Data Source**: Prometheus-compatible metrics from each Conduit node

## Quick Setup

### Backend
```bash
cd backend
npm install
npm start
# Runs on http://localhost:5001
