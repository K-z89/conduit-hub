export default function StatsCard({ icon, title, value, color }) {
  const colorClasses = {
    blue: 'text-neon-blue',
    green: 'text-green-400',
    purple: 'text-neon-purple',
  }

  return (
    <div className="glass p-8 text-center neon-glow hover:scale-[1.04] transition-transform duration-300">
      <div className={`text-6xl md:text-7xl mb-6 ${colorClasses[color] || 'text-gray-400'} opacity-90`}>
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-300">
        {title}
      </h3>
      <p className={`text-4xl md:text-5xl font-extrabold ${colorClasses[color] || 'text-white'} tracking-tight`}>
        {value}
      </p>
    </div>
  )
}
