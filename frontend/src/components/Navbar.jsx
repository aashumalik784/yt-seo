import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-ytgray border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-ytred rounded-full flex items-center justify-center">
              <span className="text-white font-bold">▶</span>
            </div>
            <span className="text-xl font-bold text-white">YT SEO AI</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-ytred transition">Home</Link>
            <Link to="/seo" className="text-gray-300 hover:text-ytred transition">AI SEO</Link>
            <Link to="/my-channel" className="text-gray-300 hover:text-ytred transition">📺 My Channel</Link>
            <Link to="/auto-trending" className="text-gray-300 hover:text-ytred transition">🔥 Trending</Link>
            <Link to="/analytics" className="text-gray-300 hover:text-ytred transition">Analytics</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
