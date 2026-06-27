import { useState, useEffect } from 'react'
import axios from 'axios'
import SEOCard from '../components/SEOCard'

export default function AutoTrending() {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const WORKER_URL = import.meta.env.VITE_WORKER_URL

  const fetchAutoTrending = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${WORKER_URL}/api/auto-trending`)
      setTrending(response.data.auto_trending)
      setLastUpdate(new Date(response.data.fetched_at).toLocaleString())
    } catch (err) {
      alert('Error: ' + err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (autoRefresh) {
      fetchAutoTrending()
      const interval = setInterval(fetchAutoTrending, 10 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">🔥 Auto-Trending SEO</h1>
          <p className="text-gray-400">Automatically generated viral titles, hashtags, keywords</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded font-bold ${autoRefresh ? 'bg-green-600' : 'bg-gray-700'}`}
          >
            {autoRefresh ? '️ Auto: ON' : '▶️ Auto: OFF'}
          </button>
          <button
            onClick={fetchAutoTrending}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold disabled:opacity-50"
          >            {loading ? '⏳ Generating...' : '🔄 Refresh Now'}
          </button>
        </div>
      </div>

      {lastUpdate && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6 flex justify-between items-center">
          <p className="text-gray-400">Last Auto-Update: <span className="text-white">{lastUpdate}</span></p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Live Updating</span>
          </div>
        </div>
      )}

      {loading && trending.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-xl text-gray-400">AI generating viral SEO for trending topics...</p>
        </div>
      )}

      <div className="space-y-8">
        {trending.map((item, index) => (
          <div key={item.videoId} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">#{index + 1}</span>
                <img src={item.thumbnail} alt={item.title} className="w-32 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-gray-200"> {item.category.toUpperCase()} • 👁 {item.views.toLocaleString()} views</p>
                </div>
              </div>
            </div>

            {item.seo && (
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-3 gap-3">
                  <SEOCard title="🎬 English Title" data={item.seo.viral_titles?.english} />
                  <SEOCard title=" Hindi Title" data={item.seo.viral_titles?.hindi} />
                  <SEOCard title="🎬 Hinglish Title" data={item.seo.viral_titles?.hinglish} />
                </div>
                <SEOCard title="📝 Description" data={item.seo.trending_description} />
                <SEOCard title="#️⃣ Hashtags" data={item.seo.viral_hashtags?.join(' ')} />
                <SEOCard title="🏷️ Keywords" data={item.seo.high_ranking_keywords} />
              </div>
            )}
          </div>
        ))}      </div>
    </div>
  )
}
