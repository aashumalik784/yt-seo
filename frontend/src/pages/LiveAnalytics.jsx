import { useState } from 'react'
import LiveGraph from '../components/LiveGraph'
import { useYouTubeData } from '../hooks/useYouTubeData'
import { extractVideoId, isValidYouTubeUrl } from '../utils/validators'
import { formatNumber } from '../utils/formatters'

export default function LiveAnalytics() {
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [error, setError] = useState(null)

  const { data, loading, error: fetchError, reset } = useYouTubeData(videoId, 30000)

  const handleStart = () => {
    if (!isValidYouTubeUrl(videoUrl)) {
      setError('Please enter a valid YouTube URL')
      return
    }
    const id = extractVideoId(videoUrl)
    if (id) {
      setVideoId(id)
      setError(null)
    }
  }

  const handleStop = () => {
    setVideoId('')
    reset()
  }

  const latestData = data[data.length - 1]

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

      {latestData && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-ytgray p-4 rounded-lg text-center">
            <div className="text-gray-400 text-sm">Views</div>
            <div className="text-3xl font-bold text-ytred">{formatNumber(latestData.views)}</div>
          </div>
          <div className="bg-ytgray p-4 rounded-lg text-center">
            <div className="text-gray-400 text-sm">Likes</div>
            <div className="text-3xl font-bold text-green-500">{formatNumber(latestData.likes)}</div>
          </div>
          <div className="bg-ytgray p-4 rounded-lg text-center">
            <div className="text-gray-400 text-sm">Comments</div>
            <div className="text-3xl font-bold text-blue-500">{formatNumber(latestData.comments)}</div>
          </div>
        </div>
      )}

      {loading && <p className="text-center text-gray-400">⏳ Fetching data...</p>}
      {fetchError && <p className="text-red-400 text-center">❌ {fetchError}</p>}

      {data.length > 0 && (
        <LiveGraph data={data} title={`Video ID: ${videoId}`} />
      )}
    </div>
  )
}
