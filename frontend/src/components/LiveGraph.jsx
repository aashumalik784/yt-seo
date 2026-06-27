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

export default function LiveGraph({ data, title }) {
  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      {
        label: 'Views',
        data: data.map(d => d.views),
        borderColor: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Likes',
        data: data.map(d => d.likes),
        borderColor: '#00FF00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'white' }
      },
      title: {
        display: true,
        text: title || 'Live Video Analytics',
        color: 'white',
        font: { size: 18 }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  }

  return (
    <div className="bg-ytgray rounded-lg p-6">
      <Line data={chartData} options={options} />
    </div>
  )
}
