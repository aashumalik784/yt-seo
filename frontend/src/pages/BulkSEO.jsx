import { useState } from 'react'
import axios from 'axios'

export default function BulkSEO() {
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [seoData, setSeoData] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const WORKER_URL = localStorage.getItem('workerUrl') || 'https://yt-seo-worker.aashumalik784.workers.dev'

  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
    return match ? match[1] : null
  }

  const handleGenerate = async () => {
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      setError('Invalid YouTube URL. Please check and try again.')
      return
    }
    setLoading(true)
    setError(null)
    setSeoData(null)
    try {
      const seoRes = await axios.post(WORKER_URL + '/api/seo', {
        topic: 'YouTube video ' + videoId,
        language: localStorage.getItem('language') || 'hinglish'
      })
      setSeoData({ ...seoRes.data.data, videoId })
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate SEO. Worker might be busy.')
    }
    setLoading(false)
  }

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const CopyBtn = ({ text, field }) => (
    <button
      onClick={() => handleCopy(text, field)}
      className="px-3 py-1 bg-gray-700 hover:bg-red-600 rounded text-xs font-bold transition flex items-center gap-1"
    >
      {copied === field ? '✓ Copied' : '📋 Copy'}
    </button>  )

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">🔍 YouTube SEO Search Box</h1>
        <p className="text-gray-400">Paste any video link below to auto-generate Title, Description, Tags, Hashtags & Thumbnail</p>
      </div>

      {/* SEARCH BOX */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-700">
        <label className="block text-white font-bold mb-3 text-lg">🔗 YouTube Video URL:</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 p-4 bg-gray-900 text-white rounded-lg border border-gray-600 focus:border-red-600 outline-none text-lg"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !videoUrl}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? '⏳ Generating...' : '🚀 Generate SEO'}
          </button>
        </div>
        {error && (
          <div className="bg-red-900/30 border border-red-600 p-4 rounded-lg mt-4">
            <p className="text-red-400 font-bold">❌ {error}</p>
          </div>
        )}
      </div>

      {/* RESULTS WITH COPY ICONS */}
      {seoData && (
        <div className="space-y-5 animate-fade-in">
          
          {/* THUMBNAIL GENERATOR / PREVIEW */}
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-red-400 font-bold text-lg">🖼️ Thumbnail Preview</h3>
              <a 
                href={`https://img.youtube.com/vi/${seoData.videoId}/maxresdefault.jpg`} 
                target="_blank" 
                rel="noreferrer"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-bold"
              >
                ⬇️ Download HD              </a>
            </div>
            <img 
              src={`https://img.youtube.com/vi/${seoData.videoId}/hqdefault.jpg`} 
              alt="Thumbnail" 
              className="w-full max-w-md mx-auto rounded-lg shadow-lg border border-gray-600"
            />
          </div>

          {/* TITLES */}
          {seoData.titles && Object.entries(seoData.titles).map(([lang, title]) => (
            <div key={lang} className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-red-400 font-bold capitalize">{lang} Title</h3>
                <CopyBtn text={title} field={`title-${lang}`} />
              </div>
              <p className="text-gray-200 text-lg">{title}</p>
            </div>
          ))}

          {/* DESCRIPTION */}
          {seoData.description && (
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-red-400 font-bold">📝 Description</h3>
                <CopyBtn text={seoData.description} field="desc" />
              </div>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{seoData.description}</p>
            </div>
          )}

          {/* HASHTAGS */}
          {seoData.hashtags && (
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-red-400 font-bold">#️⃣ Hashtags</h3>
                <CopyBtn text={seoData.hashtags.join(' ')} field="hashtags" />
              </div>
              <p className="text-blue-400 break-all">{seoData.hashtags.join(' ')}</p>
            </div>
          )}

          {/* KEYWORDS / TAGS */}
          {seoData.keywords && (
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-red-400 font-bold">🏷️ Keywords / Backend Tags</h3>
                <CopyBtn text={seoData.keywords} field="keywords" />
              </div>
              <p className="text-gray-300 break-all">{seoData.keywords}</p>            </div>
          )}
        </div>
      )}
    </div>
  )
                                                                 }
