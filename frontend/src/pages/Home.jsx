import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    { icon: '🎯', title: 'Bulk SEO Generator', desc: 'Paste any YouTube URL - Get instant SEO', link: '/bulk-seo' },
    { icon: '🤖', title: 'AI SEO Generator', desc: 'Generate viral titles, descriptions, tags', link: '/seo' },
    { icon: '📺', title: 'My Channel', desc: 'Auto-SEO for all your channel videos', link: '/my-channel' },
    { icon: '🔥', title: 'Auto-Trending', desc: 'Trending topics ka automatic SEO', link: '/auto-trending' },
    { icon: '📈', title: 'Live Analytics', desc: 'Track your video views and likes', link: '/analytics' }
  ]

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-red-600">YouTube SEO</span> AI Booster
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Apni videos ko viral karein AI-powered SEO tools ke saath
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((f, i) => (
          <Link key={i} to={f.link} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition block">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
