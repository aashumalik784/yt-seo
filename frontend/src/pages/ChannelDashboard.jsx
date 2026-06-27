import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ChannelDashboard() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'https://yt-seo-worker.aashumalik784.workers.dev'

  const fetchVideos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(WORKER_URL + '/api/channel-auto-seo')
      if (res.data && res.data.videos) {
        setVideos(res.data.videos)
      } else {
        setError('No videos found in response')
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.response?.data?.error || err.message || 'Failed to load videos')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">📺 My Channel Dashboard</h1>
          <p className="text-gray-400">Auto-SEO for all your channel videos</p>
        </div>
        <button
          onClick={fetchVideos}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-bold disabled:opacity-50"
        >
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-600 p-4 rounded-lg mb-6">
          <p className="text-red-300 font-bold">❌ Error</p>
          <p className="text-red-200 mt-2">{error}</p>          <button onClick={fetchVideos} className="mt-3 bg-red-700 px-4 py-2 rounded text-sm">
            Try Again
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <p className="text-xl text-gray-400">Loading your channel videos...</p>
          <p className="text-sm text-gray-500 mt-2">AI is generating SEO for each video</p>
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl text-gray-400">No videos found</p>
          <p className="text-sm text-gray-500 mt-2">Check YOUTUBE_CHANNEL_ID in Worker settings</p>
        </div>
      )}

      <div className="space-y-6">
        {videos.map((video, index) => (
          <div key={video.videoId || index} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">#{index + 1}</span>
                {video.thumbnail && (
                  <img src={video.thumbnail} alt="" className="w-32 h-20 object-cover rounded" />
                )}
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{video.title || 'Untitled'}</h2>
                  <div className="flex gap-4 text-sm text-gray-200 mt-1">
                    <span>👁 {video.views?.toLocaleString() || 0}</span>
                    <span>👍 {video.likes?.toLocaleString() || 0}</span>
                    <span>💬 {video.comments?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {video.seo ? (
              <div className="p-4 space-y-3">
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-gray-900 p-3 rounded">
                    <h4 className="text-red-400 font-bold text-sm mb-1">English Title</h4>
                    <p className="text-gray-300 text-sm">{video.seo.titles?.english || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">                    <h4 className="text-red-400 font-bold text-sm mb-1">Hindi Title</h4>
                    <p className="text-gray-300 text-sm">{video.seo.titles?.hindi || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <h4 className="text-red-400 font-bold text-sm mb-1">Hinglish Title</h4>
                    <p className="text-gray-300 text-sm">{video.seo.titles?.hinglish || 'N/A'}</p>
                  </div>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <h4 className="text-red-400 font-bold text-sm mb-1">Description</h4>
                  <p className="text-gray-300 text-sm">{video.seo.description?.substring(0, 200) || 'N/A'}...</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <h4 className="text-red-400 font-bold text-sm mb-1">Hashtags</h4>
                  <p className="text-gray-300 text-sm">{video.seo.hashtags?.join(' ') || 'N/A'}</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <h4 className="text-red-400 font-bold text-sm mb-1">Keywords</h4>
                  <p className="text-gray-300 text-sm">{video.seo.keywords || 'N/A'}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-900">
                <p className="text-yellow-400">⚠️ SEO not generated: {video.error || 'Unknown error'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
