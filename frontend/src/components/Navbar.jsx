import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Navbar() {
  return (
    <nav className="bg-ytgray border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-white">YT SEO AI</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-ytred transition">Home</Link>
            <Link to="/seo" className="text-gray-300 hover:text-ytred transition">SEO Generator</Link>
            <Link to="/analytics" className="text-gray-300 hover:text-ytred transition">Live Analytics</Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-ytred transition">Dashboard</Link>
          </div>
          
          <button className="md:hidden text-white">☰</button>
        </div>
      </div>
    </nav>
  )
}
