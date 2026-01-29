import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function TrafficChart() {
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [
      {
        label: 'Traffic (GB)',
        data: [4.2, 14.8, 38.5, 72.1, 55.3, 29.7, 18.4],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.25)',
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#3b82f6',
        pointHoverRadius: 10,
        pointRadius: 5,
        borderWidth: 3,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.08)' },
        ticks: { color: '#94a3b8' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.08)' },
        ticks: { color: '#94a3b8' },
      },
    },
  }

  return (
    <div className="glass p-8 neon-glow mt-8">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <FaChartLine className="text-neon-blue text-3xl" /> Traffic Trend (24h)
      </h3>
      <div className="h-80 md:h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
