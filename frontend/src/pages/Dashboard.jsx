import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalViews: 0,
    avgSEO: 0,
    trendingTopics: []
  })

  useEffect(() => {
    // Mock data - replace with real API call
    setStats({
      totalVideos: 12,
      totalViews: 45230,
      avgSEO: 87,
      trendingTopics: [
        'AI Tools 2026',
        'Budget Smartphones',
        'Street Food India',
        'Workout at Home',
        'Crypto Updates'
      ]
    })
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-ytgray p-6 rounded-lg">
          <div className="text-gray-400">Total Videos</div>
          <div className="text-4xl font-bold text-ytred mt-2">{stats.totalVideos}</div>
        </div>
        <div className="bg-ytgray p-6 rounded-lg">
          <div className="text-gray-400">Total Views</div>
          <div className="text-4xl font-bold text-green-500 mt-2">{stats.totalViews.toLocaleString()}</div>
        </div>
        <div className="bg-ytgray p-6 rounded-lg">
          <div className="text-gray-400">Avg SEO Score</div>
          <div className="text-4xl font-bold text-blue-500 mt-2">{stats.avgSEO}%</div>
        </div>
      </div>

      <div className="bg-ytgray rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending Topics</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {stats.trendingTopics.map((topic, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded flex justify-between items-center">
              <span>{topic}</span>
              <span className="text-green-500 text-sm">↑ Trending</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
