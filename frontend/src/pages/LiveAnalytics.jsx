import { useState } from 'react'
import LiveGraph from '../components/LiveGraph'

export default function LiveAnalytics() {
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [error, setError] = useState(null)

  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
    return match ? match[1] : null
  }

  const handleStart = () => {
    const id = extractVideoId(videoUrl)
    if (id) {
      setVideoId(id)
      setError(null)
    } else {
      setError('Please enter a valid YouTube URL')
    }
  }

  const handleStop = () => {
    setVideoId('')
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📈 Live Video Analytics</h1>

      <div className="bg-ytgray rounded-lg p-6 mb-6">
        <label className="block mb-2 font-bold">YouTube Video URL:</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:border-ytred outline-none"
        />
        {error && <p className="text-red-400 mt-2">❌ {error}</p>}
        
        <div className="flex gap-3 mt-4">
          {!videoId ? (
            <button onClick={handleStart} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold">
              ▶️ Start Tracking
            </button>
          ) : (
            <button onClick={handleStop} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold">
              ⏹️ Stop Tracking
            </button>
          )}
        </div>
      </div>

      {videoId && <LiveGraph videoId={videoId} />}
    </div>
  )
}
