import { FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export default function ServerCard({ server, onRemove }) {
 
  const isOnline = Math.random() > 0.2 

  return (
    <div className="glass p-7 neon-glow hover:scale-[1.03] transition-all duration-300">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h4 className="text-xl font-bold text-white">{server.name}</h4>
          <p className="text-sm text-gray-400 mt-1 font-mono">
            {server.ip}{server.port !== 9090 ? `:${server.port}` : ''}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Added: {new Date(server.added).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isOnline ? (
            <span className="flex items-center gap-1.5 text-green-400 text-sm font-medium">
              <FaCheckCircle /> Online
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-red-400 text-sm font-medium">
              <FaTimesCircle /> Offline
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onRemove}
        className="w-full bg-gradient-to-r from-red-600/70 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/30"
      >
        <FaTrash className="text-lg" /> Remove Server
      </button>
    </div>
  )
}
