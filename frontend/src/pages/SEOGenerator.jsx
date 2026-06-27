import { useState } from 'react'
import axios from 'axios'

export default function SEOGenerator() {
  const [topic, setTopic] = useState('')
  const [language, setLanguage] = useState('hinglish')
  const [seoData, setSeoData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const WORKER_URL = 'https://yt-seo-worker.aashumalik784.workers.dev'

  const handleGenerate = async () => {
    if (!topic || topic.trim().length < 3) {
      setError('Topic kam se kam 3 characters ka hona chahiye')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(WORKER_URL + '/api/seo', {
        topic: topic.trim(),
        language: language
      })
      setSeoData(response.data.data)
    } catch (err) {
      console.error('Error:', err)
      if (err.response) {
        setError('Error ' + err.response.status + ': ' + (err.response.data.error || 'Request failed'))
      } else {
        setError('Network error. Check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-900 rounded-lg p-6">
        <h1 className="text-4xl font-bold text-white mb-6">AI SEO Generator</h1>
        
        <div className="mb-6">
          <label className="block text-white text-lg font-bold mb-2">Video Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., iPhone 15 Pro review"
            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700"
          />        </div>

        <div className="mb-6">
          <label className="block text-white text-lg font-bold mb-2">Language:</label>
          <div className="flex gap-3">
            <button
              onClick={() => setLanguage('english')}
              className={'px-6 py-2 rounded ' + (language === 'english' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300')}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hindi')}
              className={'px-6 py-2 rounded ' + (language === 'hindi' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300')}
            >
              Hindi
            </button>
            <button
              onClick={() => setLanguage('hinglish')}
              className={'px-6 py-2 rounded ' + (language === 'hinglish' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300')}
            >
              Hinglish
            </button>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold disabled:opacity-50"
        >
          {loading ? 'Generating...' : '🚀 Generate SEO'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-600 rounded">
            <p className="text-red-400">❌ {error}</p>
          </div>
        )}

        {seoData && (
          <div className="mt-6 space-y-4">
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-white font-bold mb-2">English Title:</h3>
              <p className="text-gray-300">{seoData.titles?.english}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-white font-bold mb-2">Hindi Title:</h3>
              <p className="text-gray-300">{seoData.titles?.hindi}</p>
            </div>            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-white font-bold mb-2">Hinglish Title:</h3>
              <p className="text-gray-300">{seoData.titles?.hinglish}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-white font-bold mb-2">Description:</h3>
              <p className="text-gray-300">{seoData.description}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-white font-bold mb-2">Hashtags:</h3>
              <p className="text-gray-300">{seoData.hashtags?.join(' ')}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-white font-bold mb-2">Keywords:</h3>
              <p className="text-gray-300">{seoData.keywords}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
