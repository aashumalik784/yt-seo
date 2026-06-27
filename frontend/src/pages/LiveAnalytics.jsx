import { useState } from 'react'
import axios from 'axios'

export default function LiveAnalytics() {
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'https://yt-seo-worker.aashumalik784.workers.dev'

  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
    return match ? match[1] : null
  }

  const handleStart = async () => {
    const id = extractVideoId(videoUrl)
    if (!id) {
      setError('Invalid YouTube URL. Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      return
    }
    setVideoId(id)
    setError(null)
    setLoading(true)
    try {
      const res = await axios.post(WORKER_URL + '/api/analytics', { videoId: id })
      setStats(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch analytics')
    }
    setLoading(false)
  }

  const handleStop = () => {
    setVideoId('')
    setStats(null)
    setError(null)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📈 Live Video Analytics</h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <label className="block mb-2 font-bold">YouTube Video URL:</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full p-3 bg-gray-900 rounded border border-gray-700 focus:border-red-600 outline-none text-white"
        />

        {error && (
          <div className="bg-red-900 border border-red-600 p-3 rounded mt-4">
            <p className="text-red-300">❌ {error}</p>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          {!videoId ? (
            <button
              onClick={handleStart}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold disabled:opacity-50"
            >
              {loading ? 'Loading...' : '▶️ Start Tracking'}
            </button>
          ) : (
            <button onClick={handleStop} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold">
              ⏹️ Stop Tracking
            </button>
          )}
        </div>
      </div>

      {videoId && !stats && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Enter a valid YouTube URL above</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-pulse">📊</div>
          <p className="text-xl text-gray-400">Fetching analytics...</p>
        </div>
      )}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-gray-400 text-sm mb-2">Total Views</div>
            <div className="text-4xl font-bold text-red-500">{stats.views?.toLocaleString() || 0}</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-gray-400 text-sm mb-2">Total Likes</div>
            <div className="text-4xl font-bold text-green-500">{stats.likes?.toLocaleString() || 0}</div>
          </div>          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-gray-400 text-sm mb-2">Total Comments</div>
            <div className="text-4xl font-bold text-blue-500">{stats.comments?.toLocaleString() || 0}</div>
          </div>
        </div>
      )}
    </div>
  )
}
