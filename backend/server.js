import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import fetch from 'node-fetch'

const app = express()
const PORT = process.env.PORT || 5001
const METRICS_TIMEOUT = 6000

app.use(cors())
app.use(express.json())

const SERVERS_FILE = path.join(process.cwd(), 'servers.json')

async function readServers() {
  try {
    const data = await fs.readFile(SERVERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeServers(servers) {
  await fs.writeFile(SERVERS_FILE, JSON.stringify(servers, null, 2))
}

app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }))

app.get('/api/servers', async (req, res) => {
  res.json(await readServers())
})

app.post('/api/servers', async (req, res) => {
  const { name, ip, port = 9090 } = req.body
  if (!name?.trim() || !ip?.trim()) {
    return res.status(400).json({ error: 'name and ip are required' })
  }

  const servers = await readServers()
  if (servers.some(s => s.ip === ip)) {
    return res.status(409).json({ error: 'server with this ip already exists' })
  }

  servers.push({ name: name.trim(), ip: ip.trim(), port, added: new Date().toISOString() })
  await writeServers(servers)
  res.json({ success: true })
})

app.delete('/api/servers/:ip', async (req, res) => {
  const { ip } = req.params
  let servers = await readServers()
  const initialLength = servers.length
  servers = servers.filter(s => s.ip !== ip)

  if (servers.length === initialLength) {
    return res.status(404).json({ error: 'server not found' })
  }

  await writeServers(servers)
  res.json({ success: true })
})

app.get('/api/global-stats', async (req, res) => {
  const servers = await readServers()
  let totalBytes = 0
  let totalPeers = 0

  await Promise.allSettled(servers.map(async (s) => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), METRICS_TIMEOUT)

      const resp = await fetch(`http://\( {s.ip}: \){s.port}/metrics`, {
        signal: controller.signal
      })
      clearTimeout(timeoutId)

      if (!resp.ok) return

      const text = await resp.text()
      text.split('\n').forEach(line => {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) return

        if (trimmed.startsWith('psiphon_bytes_transferred_total')) {
          const value = parseFloat(trimmed.split(/\s+/)[1])
          if (!isNaN(value)) totalBytes += value
        }
        if (trimmed.startsWith('psiphon_peers_current')) {
          const value = parseInt(trimmed.split(/\s+/)[1], 10)
          if (!isNaN(value)) totalPeers += value
        }
      })
    } catch {}
  }))

  res.json({
    totalTrafficGB: (totalBytes / (1024 ** 3)).toFixed(2),
    currentUsers: totalPeers,
    serversCount: servers.length,
    lastUpdate: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`Conduit Hub backend running at http://localhost:${PORT}`)
})
