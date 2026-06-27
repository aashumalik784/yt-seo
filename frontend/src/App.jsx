import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import SEOGenerator from './pages/SEOGenerator'
import LiveAnalytics from './pages/LiveAnalytics'
import ChannelDashboard from './pages/ChannelDashboard'
import AutoTrending from './pages/AutoTrending'
import BulkSEO from './pages/BulkSEO'

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
                <span className="text-xl font-bold">YT SEO AI</span>
              </Link>
              
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                <Link to="/bulk-seo" className="text-gray-300 hover:text-white">Bulk SEO</Link>
                <Link to="/seo" className="text-gray-300 hover:text-white">AI SEO</Link>
                <Link to="/my-channel" className="text-gray-300 hover:text-white">My Channel</Link>
                <Link to="/auto-trending" className="text-gray-300 hover:text-white">Trending</Link>
                <Link to="/analytics" className="text-gray-300 hover:text-white">Analytics</Link>
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
