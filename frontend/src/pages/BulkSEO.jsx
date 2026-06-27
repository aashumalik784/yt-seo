import { useState } from 'react'
import axios from 'axios'

export default function BulkSEO() {
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [seoData, setSeoData] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const WORKER_URL = 'https://yt-seo-worker.aashumalik784.workers.dev'

  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
    return match ? match[1] : null
  }

  const handleGenerate = async () => {
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      setError('Invalid YouTube URL')
      return
    }
    setLoading(true)
    setError(null)
    setSeoData(null)
    try {
      const seoRes = await axios.post(WORKER_URL + '/api/seo', {
        topic: 'YouTube video ' + videoId,
        language: 'hinglish'
      })
      setSeoData(seoRes.data.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate SEO')
    }
    setLoading(false)
  }

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">YouTube SEO Generator</h1>
        <p className="text-gray-400">Paste any YouTube video URL - Get viral SEO instantly</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <label className="block text-white font-bold mb-2">YouTube Video URL:</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full p-4 bg-gray-900 text-white rounded border border-gray-700 focus:border-red-600 outline-none mb-4"
        />
        {error && (
          <div className="bg-red-900 border border-red-600 p-3 rounded mb-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        <button
          onClick={handleGenerate}
          disabled={loading || !videoUrl}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded font-bold text-lg disabled:opacity-50"
        >
          {loading ? 'Generating SEO...' : 'Generate SEO'}
        </button>
      </div>

      {seoData && (
        <div className="space-y-4">
          {seoData.titles && (
            <>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-red-400 font-bold">English Title</h3>
                  <button onClick={() => handleCopy(seoData.titles.english, 'en')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                    {copied === 'en' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-gray-300">{seoData.titles.english}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-red-400 font-bold">Hindi Title</h3>
                  <button onClick={() => handleCopy(seoData.titles.hindi, 'hi')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                    {copied === 'hi' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-gray-300">{seoData.titles.hindi}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-red-400 font-bold">Hinglish Title</h3>
                  <button onClick={() => handleCopy(seoData.titles.hinglish, 'hing')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                    {copied === 'hing' ? 'Copied!' : 'Copy'}                  </button>
                </div>
                <p className="text-gray-300">{seoData.titles.hinglish}</p>
              </div>
            </>
          )}
          {seoData.description && (
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-red-400 font-bold">Description</h3>
                <button onClick={() => handleCopy(seoData.description, 'desc')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                  {copied === 'desc' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{seoData.description}</p>
            </div>
          )}
          {seoData.hashtags && (
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-red-400 font-bold">Hashtags</h3>
                <button onClick={() => handleCopy(seoData.hashtags.join(' '), 'tags')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                  {copied === 'tags' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300 text-sm">{seoData.hashtags.join(' ')}</p>
            </div>
          )}
          {seoData.keywords && (
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-red-400 font-bold">Keywords / Tags</h3>
                <button onClick={() => handleCopy(seoData.keywords, 'kw')} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                  {copied === 'kw' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-gray-300 text-sm">{seoData.keywords}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
                  }
