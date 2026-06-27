import { Link } from 'react-router-dom'

export default function Home() {
  const features = [
    { icon: '🤖', title: 'AI SEO Generator', desc: 'Generate viral titles, descriptions, tags in Hindi/English/Hinglish', link: '/seo' },
    { icon: '📺', title: 'My Channel', desc: 'Auto-SEO for all your channel videos with analytics graphs', link: '/my-channel' },
    { icon: '🔥', title: 'Auto-Trending', desc: 'Trending topics ka automatic SEO (News excluded)', link: '/auto-trending' },
    { icon: '📈', title: 'Live Analytics', desc: 'Track your video views & likes in real-time', link: '/analytics' }
  ]

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-ytred">YouTube SEO</span> AI Booster
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Apni videos ko organic tarike se boost karein AI-powered SEO tools ke saath
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((f, i) => (
          <Link key={i} to={f.link} className="bg-ytgray p-6 rounded-lg card-hover block">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-r from-ytred to-ytgray rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Channel?</h2>
        <Link to="/my-channel" className="inline-block bg-white text-ytred px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
          View My Channel →
        </Link>
      </div>
    </div>
  )
}
