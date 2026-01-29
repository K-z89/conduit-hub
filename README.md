
# conduit-hub 🚀

Central multi-server dashboard for Psiphon Conduit nodes

A modern, dark-themed web dashboard to manage multiple Psiphon Conduit hosting instances (volunteer proxies).  
It aggregates live stats like total transferred traffic, connected users, number of active servers, and more — all from Prometheus metrics exposed by each Conduit node.

**Purpose**  
Help support open internet access in censored regions by making it easy to run and monitor multiple Conduit nodes (especially useful for people outside high-censorship countries who want to share bandwidth).

## Features
- Add / remove / list multiple Conduit servers by IP
- Real-time aggregated stats: total traffic (GB), current users, server count
- Futuristic dark UI with animations, gradients, neon effects
- Simple notification system for success/error messages
- Auto-refresh stats every ~12 seconds
- No authentication / telemetry / cloud dependency (fully self-hosted)

## Tech Stack
- **Backend**: Node.js + Express
- **Frontend**: React (Vite) + Tailwind CSS + Chart.js
- **Data Source**: Prometheus /metrics endpoint from each Conduit node (default port 9090)

## Prerequisites
- Node.js 18+ installed
- Each Conduit node must expose Prometheus metrics (usually port 9090)
  - If using official `psiphon/conduit` Docker image → publish port 9090
  - If using conduit-manager → you may need to add a sidecar or expose metrics manually

## Quick Start

### 1. Backend
```bash
cd backend
npm install
npm start
# → http://localhost:5001
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# → usually opens at http://localhost:5173
```

## Project Structure
```
conduit-nexus/
├── README.md
├── LICENSE
├── .gitignore
├── backend/
│   ├── package.json
│   ├── server.js
│   └── servers.json          # auto-created
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── components/
            ├── StatsCard.jsx
            ├── ServerCard.jsx
            └── TrafficChart.jsx
```

## Security Notes
- This dashboard only reads the public `/metrics` endpoint (no login, no SSH, no private keys)
- **Never expose the backend publicly** without adding authentication (e.g. basic auth, API key, or reverse proxy with auth)
- For production: consider using a proper Prometheus + Grafana setup instead of this simple aggregator
- Use responsibly — this is intended only for legal circumvention support and freedom of expression

## License
MIT License — feel free to fork, modify, and share (with attribution if possible)

## Contributing
Ideas and PRs are welcome!  
Possible improvements:
- Interactive world map with country heat-map
- WebSocket for real-time updates
- Per-server bandwidth/user limits
- CSV/JSON export of stats
- Authentication layer
- Docker Compose for easy deployment

Designed by Bamdad • 2026  
For freedom of the internet.

