import { useState, useEffect } from 'react'

export default function Settings() {
  const [workerUrl, setWorkerUrl] = useState('https://yt-seo-worker.aashumalik784.workers.dev')
  const [language, setLanguage] = useState('hinglish')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedUrl = localStorage.getItem('workerUrl')
    const savedLang = localStorage.getItem('language')
    if (savedUrl) setWorkerUrl(savedUrl)
    if (savedLang) setLanguage(savedLang)
  }, [])

  const handleSave = () => {
    localStorage.setItem('workerUrl', workerUrl)
    localStorage.setItem('language', language)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>
      <div className="bg-gray-800 rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-white font-bold mb-2">Worker URL</label>
          <input
            type="text"
            value={workerUrl}
            onChange={(e) => setWorkerUrl(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 outline-none focus:border-red-600"
          />
        </div>
        <div>
          <label className="block text-white font-bold mb-2">Default Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded border border-gray-700 outline-none focus:border-red-600"
          >
            <option value="hinglish">Hinglish</option>
            <option value="hindi">Hindi</option>
            <option value="english">English</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold text-lg"
        >
          {saved ? '✓ Saved Successfully!' : 'Save Settings'}
        </button>
      </div>
      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">About</h2>
        <p className="text-gray-400">YouTube SEO AI Booster v2.0</p>
        <p className="text-gray-400 mt-2">Powered by Groq AI & Cloudflare Workers</p>
      </div>
    </div>
  )
}
