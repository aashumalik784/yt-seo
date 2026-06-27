import { useState } from 'react'
import axios from 'axios'
import SEOCard from '../components/SEOCard'

export default function SEOGenerator() {
  const [topic, setTopic] = useState('')
  const [language, setLanguage] = useState('hinglish')
  const [seoData, setSeoData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const WORKER_URL = import.meta.env.VITE_WORKER_URL

  const handleGenerate = async () => {
    if (!topic || topic.trim().length < 3) {
      setError('Topic kam se kam 3 characters ka hona chahiye')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post(`${WORKER_URL}/api/seo`, {
        topic: topic.trim(),
        language
      })
      setSeoData(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">🤖 AI SEO Generator</h1>
      
      <div className="bg-ytgray rounded-lg p-6 mb-6">
        <label className="block mb-2 font-bold">Video Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., iPhone 15 Pro review, Best biryani recipe"
          className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:border-ytred outline-none"
        />

        <label className="block mt-4 mb-2 font-bold">Language:</label>
        <div className="flex gap-3">
          {['english', 'hindi', 'hinglish'].map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded ${language === lang ? 'bg-ytred' : 'bg-gray-700'}`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 w-full bg-ytred hover:bg-red-700 py-3 rounded font-bold disabled:opacity-50"
        >
          {loading ? '⏳ Generating...' : '🚀 Generate SEO'}
        </button>

        {error && <p className="mt-4 text-red-400">❌ {error}</p>}
      </div>

      {seoData && (
        <div className="space-y-4">
          <SEOCard title="🎬 English Title" data={seoData.titles?.english} />
          <SEOCard title="🎬 Hindi Title" data={seoData.titles?.hindi} />
          <SEOCard title="🎬 Hinglish Title" data={seoData.titles?.hinglish} />
          <SEOCard title="📝 Description" data={seoData.description} />
          <SEOCard title="#️⃣ Hashtags" data={seoData.hashtags?.join(' ')} />
          <SEOCard title="🏷️ Keywords/Tags" data={seoData.keywords} />
        </div>
      )}
    </div>
  )
}
