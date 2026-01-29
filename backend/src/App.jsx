import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaServer, FaPlus, FaTrash, FaChartLine, FaUsers, FaGlobe } from 'react-icons/fa'
import StatsCard from './components/StatsCard'
import ServerCard from './components/ServerCard'
import TrafficChart from './components/TrafficChart'

export default function App() {
  const [servers, setServers] = useState([])
  const [stats, setStats] = useState({
    totalTrafficGB: '0.00',
    currentUsers: '0',
    serversCount: 0,
    lastUpdate: null
  })
  const [newServer, setNewServer] = useState({ name: '', ip: '' })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchData()
    const timer = setInterval(fetchData, 12000)
    return () => clearInterval(timer)
  }, [])

  const fetchData = async () => {
    try {
      const [serversRes, statsRes] = await Promise.all([
        axios.get('/api/servers'),
        axios.get('/api/global-stats')
      ])
      setServers(serversRes.data)
      setStats(statsRes.data)
      setMessage(null)
    } catch (err) {
      setMessage('Error connecting to the backend')
    }
  }

  const addServer = async (e) => {
    e.preventDefault()
    if (!newServer.name.trim() || !newServer.ip.trim()) return

    try {
      await axios.post('/api/servers', newServer)
      setNewServer({ name: '', ip: '' })
      fetchData()
      setMessage('Server added successfully')
    } catch (err) {
      setMessage('Failed to add server')
    }
  }

  const removeServer = async (ip) => {
    try {
      await axios.delete(`/api/servers/${ip}`)
      fetchData()
      setMessage('Server removed')
    } catch {
      setMessage('Failed to remove server')
    }
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {message && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl text-white font-medium shadow-2xl animate-fade-in ${
          message.includes('Error') || message.includes('Failed')
            ? 'bg-red-600/90 border border-red-400'
            : 'bg-green-600/90 border border-green-400'
        }`}>
          {message}
        </div>
      )}

      <header className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-pulse tracking-tight">
          Conduit Hub
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mt-4 font-light">
          Multi-node Conduit Management Dashboard
        </p>
      </header>

      <div className="glass p-8 mb-12 neon-glow">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
          <FaServer className="text-neon-blue text-4xl" /> Add New Server
        </h2>
        <form onSubmit={addServer} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input
            type="text"
            placeholder="Server Name (e.g. DE-Falkenstein-1)"
            value={newServer.name}
            onChange={e => setNewServer({ ...newServer, name: e.target.value })}
            className="bg-slate-800/60 border border-slate-600 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition"
          />
          <input
            type="text"
            placeholder="IP or hostname (optional :port)"
            value={newServer.ip}
            onChange={e => setNewServer({ ...newServer, ip: e.target.value })}
            className="bg-slate-800/60 border border-slate-600 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-blue hover:to-neon-pink text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 text-lg transition-all shadow-lg hover:shadow-neon-blue/50"
          >
            <FaPlus className="text-xl" /> Add Server
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <StatsCard
          icon={<FaChartLine />}
          title="Total Traffic"
          value={`${stats.totalTrafficGB} GB`}
          color="blue"
        />
        <StatsCard
          icon={<FaUsers />}
          title="Current Users"
          value={stats.currentUsers}
          color="green"
        />
        <StatsCard
          icon={<FaGlobe />}
          title="Active Servers"
          value={stats.serversCount}
          color="purple"
        />
      </div>

      <TrafficChart />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {servers.map(server => (
          <ServerCard
            key={server.ip}
            server={server}
            onRemove={() => removeServer(server.ip)}
          />
        ))}
      </div>

      <footer className="text-center mt-24 text-gray-500 text-lg">
        <p className="text-2xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
          Designed by Bamdad
        </p>
        <p className="mt-3">For internet freedom • 2026</p>
      </footer>
    </div>
  )
            }
