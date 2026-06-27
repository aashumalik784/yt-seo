import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import SEOGenerator from './pages/SEOGenerator'
import LiveAnalytics from './pages/LiveAnalytics'
import ChannelDashboard from './pages/ChannelDashboard'
import AutoTrending from './pages/AutoTrending'
import BulkSEO from './pages/BulkSEO'
import Settings from './pages/Settings'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setMenuOpen(false)}>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">YT</span>
                </div>
                <span className="text-xl font-bold">YT SEO AI</span>
              </Link>

              {/* Hamburger Button - Mobile */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-white p-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-4">
                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">Home</Link>
                <Link to="/bulk-seo" className="text-gray-300 hover:text-white px-3 py-2">Bulk SEO</Link>
                <Link to="/seo" className="text-gray-300 hover:text-white px-3 py-2">AI SEO</Link>
                <Link to="/my-channel" className="text-gray-300 hover:text-white px-3 py-2">My Channel</Link>
                <Link to="/auto-trending" className="text-gray-300 hover:text-white px-3 py-2">Trending</Link>
                <Link to="/analytics" className="text-gray-300 hover:text-white px-3 py-2">Analytics</Link>
                <Link to="/settings" className="text-red-400 hover:text-red-300 px-3 py-2 font-bold">Settings</Link>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
              <div className="md:hidden pb-4 space-y-2">
                <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-3 rounded hover:bg-gray-800">Home</Link>
                <Link to="/bulk-seo" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-3 rounded hover:bg-gray-800">🔍 Bulk SEO</Link>
                <Link to="/seo" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-3 rounded hover:bg-gray-800">🤖 AI SEO</Link>
                <Link to="/my-channel" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-3 rounded hover:bg-gray-800">📺 My Channel</Link>
                <Link to="/auto-trending" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-3 rounded hover:bg-gray-800">🔥 Trending</Link>
                <Link to="/analytics" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-3 rounded hover:bg-gray-800">📈 Analytics</Link>
                <Link to="/settings" onClick={() => setMenuOpen(false)} className="block text-red-400 hover:text-red-300 px-3 py-3 rounded hover:bg-gray-800 font-bold">⚙️ Settings</Link>
              </div>
            )}
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seo" element={<SEOGenerator />} />
            <Route path="/bulk-seo" element={<BulkSEO />} />
            <Route path="/analytics" element={<LiveAnalytics />} />
            <Route path="/my-channel" element={<ChannelDashboard />} />
            <Route path="/auto-trending" element={<AutoTrending />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-12">
          <div className="container mx-auto text-center text-gray-400">
            <p>© 2026 YouTube SEO AI Booster</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
