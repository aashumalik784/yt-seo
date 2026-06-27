import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-red-600">YouTube SEO</span> AI Booster
        </h1>
        <p className="text-xl text-gray-300">Apni videos ko viral karein AI-powered SEO tools ke saath</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/seo" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700">
          <h3 className="text-xl font-bold text-red-400">AI SEO Generator</h3>
          <p className="text-gray-400 text-sm">Generate viral titles, descriptions, tags</p>
        </Link>
        
        <Link to="/my-channel" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700">
          <h3 className="text-xl font-bold text-red-400">My Channel</h3>
          <p className="text-gray-400 text-sm">Auto-SEO for all your channel videos</p>
        </Link>
        
        <Link to="/auto-trending" className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700">
          <h3 className="text-xl font-bold text-red-400">Auto-Trending</h3>
          <p className="text-gray-400 text-sm">Trending topics ka automatic SEO</p>
        </Link>
      </div>
    </div>
  )
}
