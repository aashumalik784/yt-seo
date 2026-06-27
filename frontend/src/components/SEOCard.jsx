import { useState } from 'react'

export default function SEOCard({ title, data }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (data) {
      navigator.clipboard.writeText(data)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-ytred">{title}</h3>
        <button
          onClick={handleCopy}
          disabled={!data}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm disabled:opacity-50"
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <div className="text-gray-200 whitespace-pre-wrap break-words text-sm">
        {data || 'No data available'}
      </div>
    </div>
  )
}
