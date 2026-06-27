import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AutoTrending() {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'https://yt-seo-worker.aashumalik784.workers.dev'

  const fetchTrending = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(WORKER_URL + '/api/auto-trending')
      if (res.data && res.data.auto_trending) {
        setTrending(res.data.auto_trending)
        setLastUpdate(new Date().toLocaleString())
      } else {
        setError('No trending data found')
      }
    } catch (err) {
      console.error('Trending error:', err)
      setError(err.response?.data?.error || err.message || 'Failed to load trending')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTrending()
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">🔥 Auto-Trending SEO</h1>
          <p className="text-gray-400">Viral titles, hashtags, keywords for trending topics</p>
        </div>
        <button
          onClick={fetchTrending}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold disabled:opacity-50"
        >
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {lastUpdate && (
        <div className="bg-gray-800 p-3 rounded mb-6">          <p className="text-gray-400 text-sm">Last Update: {lastUpdate}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900 border border-red-600 p-4 rounded-lg mb-6">
          <p className="text-red-300 font-bold">❌ Error</p>
          <p className="text-red-200 mt-2">{error}</p>
          <button onClick={fetchTrending} className="mt-3 bg-red-700 px-4 py-2 rounded text-sm">
            Try Again
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-pulse">🤖</div>
          <p className="text-xl text-gray-400">Fetching trending topics...</p>
          <p className="text-sm text-gray-500 mt-2">AI is generating SEO for trending videos</p>
        </div>
      )}

      {!loading && !error && trending.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl text-gray-400">No trending videos found</p>
        </div>
      )}

      <div className="space-y-6">
        {trending.map((item, index) => (
          <div key={item.videoId || index} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">#{index + 1}</span>
                {item.thumbnail && (
                  <img src={item.thumbnail} alt="" className="w-32 h-20 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{item.title || 'Untitled'}</h2>
                  <p className="text-gray-200 text-sm">👁 {item.views?.toLocaleString() || 0} views</p>
                </div>
              </div>
            </div>

            {item.seo ? (
              <div className="p-4 space-y-3">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-gray-900 p-3 rounded">
                    <h4 className="text-red-400 font-bold text-sm mb-1">English Title</h4>                    <p className="text-gray-300 text-sm">{item.seo.viral_titles?.english || item.seo.titles?.english || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <h4 className="text-red-400 font-bold text-sm mb-1">Hindi Title</h4>
                    <p className="text-gray-300 text-sm">{item.seo.viral_titles?.hindi || item.seo.titles?.hindi || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <h4 className="text-red-400 font-bold text-sm mb-1">Hinglish Title</h4>
                    <p className="text-gray-300 text-sm">{item.seo.viral_titles?.hinglish || item.seo.titles?.hinglish || 'N/A'}</p>
                  </div>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <h4 className="text-red-400 font-bold text-sm mb-1">Description</h4>
                  <p className="text-gray-300 text-sm">{(item.seo.trending_description || item.seo.description || 'N/A').substring(0, 200)}...</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <h4 className="text-red-400 font-bold text-sm mb-1">Hashtags</h4>
                  <p className="text-gray-300 text-sm">{(item.seo.viral_hashtags || item.seo.hashtags || []).join(' ')}</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <h4 className="text-red-400 font-bold text-sm mb-1">Keywords</h4>
                  <p className="text-gray-300 text-sm">{item.seo.high_ranking_keywords || item.seo.keywords || 'N/A'}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-900">
                <p className="text-yellow-400">⚠️ SEO not generated for this video</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
                }
