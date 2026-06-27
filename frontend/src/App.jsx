import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SEOGenerator from './pages/SEOGenerator'
import LiveAnalytics from './pages/LiveAnalytics'
import ChannelDashboard from './pages/ChannelDashboard'
import AutoTrending from './pages/AutoTrending'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-ytdark">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seo" element={<SEOGenerator />} />
            <Route path="/analytics" element={<LiveAnalytics />} />
            <Route path="/my-channel" element={<ChannelDashboard />} />
            <Route path="/auto-trending" element={<AutoTrending />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
