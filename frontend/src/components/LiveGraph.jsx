import { useState, useEffect } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function LiveGraph({ videoId, WORKER_URL }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    if (!videoId) return
    setLoading(true)
    try {
      const response = await axios.post(`${WORKER_URL}/api/analytics`, { videoId })
      setData(prev => [...prev.slice(-10), {
        ...response.data,
        time: new Date().toLocaleTimeString()
      }])
    } catch (err) {
      console.error('Analytics error:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (videoId) {
      fetchData()
      const interval = setInterval(fetchData, 30000) // 30 seconds
      return () => clearInterval(interval)
    }
  }, [videoId])

  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      {
        label: 'Views',
        data: data.map(d => d.views),
        borderColor: '#FF0000',        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        tension: 0.4
      },
      {
        label: 'Likes',
        data: data.map(d => d.likes),
        borderColor: '#00FF00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: `Video ID: ${videoId}`, color: 'white', font: { size: 18 } }
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  }

  const latestData = data[data.length - 1]

  return (
    <div>
      {latestData && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-ytgray p-4 rounded-lg text-center">
            <div className="text-gray-400 text-sm">Views</div>
            <div className="text-3xl font-bold text-ytred">{latestData.views?.toLocaleString()}</div>
          </div>
          <div className="bg-ytgray p-4 rounded-lg text-center">
            <div className="text-gray-400 text-sm">Likes</div>
            <div className="text-3xl font-bold text-green-500">{latestData.likes?.toLocaleString()}</div>
          </div>
          <div className="bg-ytgray p-4 rounded-lg text-center">
            <div className="text-gray-400 text-sm">Comments</div>
            <div className="text-3xl font-bold text-blue-500">{latestData.comments?.toLocaleString()}</div>
          </div>
        </div>
      )}

      {loading && <p className="text-center text-gray-400">⏳ Fetching data...</p>}
      {data.length > 0 && <LiveGraph data={chartData} options={options} />}
    </div>
  )}
