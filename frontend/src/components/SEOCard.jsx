import { useState } from 'react'

export default function SEOCard({ title, data, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(data)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (onCopy) onCopy()
  }

  return (
    <div className="bg-ytgray rounded-lg p-4 card-hover">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-ytred">{title}</h3>
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <div className="text-gray-200 whitespace-pre-wrap break-words">
        {data}
      </div>
    </div>
  )
}
