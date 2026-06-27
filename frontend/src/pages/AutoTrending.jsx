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
          <p className="text-gray-400">Automatically generated viral titles, hashtags, keywords & descriptions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded font-bold ${autoRefresh ? 'bg-green-600' : 'bg-gray-700'}`}
          >
            {autoRefresh ? '⏸️ Auto: ON' : '▶️ Auto: OFF'}
          </button>
          <button
            onClick={fetchAutoTrending}
            disabled={loading}
            className="bg-ytred hover:bg-red-700 px-6 py-3 rounded font-bold disabled:opacity-50"
          >            {loading ? '⏳ Generating...' : '🔄 Refresh Now'}
          </button>
        </div>
      </div>

      {lastUpdate && (
        <div className="bg-ytgray p-4 rounded-lg mb-6 flex justify-between items-center">
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
          <p className="text-sm text-gray-500 mt-2">Yeh 1-2 minute le sakta hai</p>
        </div>
      )}

      <div className="space-y-8">
        {trending.map((item, index) => (
          <div key={item.videoId} className="bg-ytgray rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-ytred to-red-700 p-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">#{index + 1}</span>
                <img src={item.thumbnail} alt={item.title} className="w-32 h-18 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-gray-200">📺 {item.category.toUpperCase()} • 👁 {item.views.toLocaleString()} views</p>
                  <p className="text-sm text-gray-300">Rank: Trending #{item.trending_rank}</p>
                </div>
              </div>
            </div>

            {item.seo ? (
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-3 gap-3">
                  <SEOCard title="🎬 English Viral Title" data={item.seo.viral_titles?.english} />
                  <SEOCard title="🎬 Hindi Viral Title" data={item.seo.viral_titles?.hindi} />
                  <SEOCard title="🎬 Hinglish Viral Title" data={item.seo.viral_titles?.hinglish} />
                </div>
                <SEOCard title="📝 Trending Description" data={item.seo.trending_description} />
                <SEOCard title="#️⃣ Viral Hashtags" data={item.seo.viral_hashtags?.join(' ')} />
                <SEOCard title="🏷️ High-Ranking Keywords" data={item.seo.high_ranking_keywords} />
                <div className="grid md:grid-cols-2 gap-4">
                  <SEOCard title="🎯 Suggested Tags" data={item.seo.suggested_tags?.join(', ')} />                  <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-bold mb-2">📊 Additional Info</h3>
                    <p className="text-gray-400">⏰ Best Time: {item.seo.best_posting_time}</p>
                    <p className="text-gray-400">👥 Target: {item.seo.target_audience}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-red-900/20">
                <p className="text-red-400">❌ SEO generation failed: {item.seoError}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
      }
