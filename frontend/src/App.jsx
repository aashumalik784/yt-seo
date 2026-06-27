import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import SEOGenerator from './pages/SEOGenerator'
import LiveAnalytics from './pages/LiveAnalytics'
import ChannelDashboard from './pages/ChannelDashboard'
import AutoTrending from './pages/AutoTrending'
import BulkSEO from './pages/BulkSEO'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">YT</span>
                </div>
                <span className="text-xl font-bold hidden sm:block">YT SEO AI</span>
              </Link>
              <div className="flex space-x-2 md:space-x-4 overflow-x-auto">
                <Link to="/" className="text-gray-300 hover:text-white px-2 py-2 text-sm whitespace-nowrap">Home</Link>
                <Link to="/bulk-seo" className="text-gray-300 hover:text-white px-2 py-2 text-sm whitespace-nowrap">Bulk SEO</Link>
                <Link to="/seo" className="text-gray-300 hover:text-white px-2 py-2 text-sm whitespace-nowrap">AI SEO</Link>
                <Link to="/my-channel" className="text-gray-300 hover:text-white px-2 py-2 text-sm whitespace-nowrap">My Channel</Link>
                <Link to="/analytics" className="text-gray-300 hover:text-white px-2 py-2 text-sm whitespace-nowrap">Analytics</Link>
                <Link to="/settings" className="text-red-400 hover:text-red-300 px-2 py-2 text-sm whitespace-nowrap font-bold">⚙️ Settings</Link>
              </div>
            </div>
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
