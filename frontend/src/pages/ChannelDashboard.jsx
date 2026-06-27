import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import SEOCard from '../components/SEOCard';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChannelDashboard() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const WORKER_URL = import.meta.env.VITE_WORKER_URL;

  const fetchChannelAutoSEO = async () => {
    setLoading(true);
    try {
      const response = await axios.get(WORKER_URL + '/api/channel-auto-seo');
      setVideos(response.data.videos);
    } catch (err) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  const fetchVideoGraph = async (videoId) => {
    try {
      const response = await axios.post(WORKER_URL + '/api/video-graph', { videoId });
      setGraphData(response.data.graph_data);
      setSelectedVideo(videoId);
    } catch (err) {
      console.error('Graph error:', err);
    }
  };

  useEffect(function() {
    if (!autoRefresh) {
      return;
    }
    fetchChannelAutoSEO();
    var interval = setInterval(fetchChannelAutoSEO, 1800000);
    return function() {
      clearInterval(interval);
    };
  }, [autoRefresh]);

  const chartOptions = {
    responsive: true,    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Video Performance (Last 7 Days)', color: 'white' }
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Channel Dashboard</h1>
          <p className="text-gray-400">Auto-SEO + Live Analytics Graphs</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={function() { setAutoRefresh(!autoRefresh); }}
            className={'px-4 py-2 rounded font-bold ' + (autoRefresh ? 'bg-green-600' : 'bg-gray-700')}
          >
            {autoRefresh ? 'Auto: ON' : 'Auto: OFF'}
          </button>
          <button
            onClick={fetchChannelAutoSEO}
            disabled={loading}
            className="bg-ytred hover:bg-red-700 px-6 py-3 rounded font-bold disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {loading && videos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">AI</div>
          <p className="text-xl text-gray-400">Generating SEO for all your videos...</p>
          <p className="text-sm text-gray-500 mt-2">Yeh 2-3 minute le sakta hai</p>
        </div>
      )}

      <div className="space-y-6 mb-8">
        {videos.map(function(video, index) {
          return (
            <div key={video.videoId} className="bg-ytgray rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-ytred to-red-700 p-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">#{index + 1}</span>
                  <img src={video.thumbnail} alt={video.title} className="w-40 h-24 object-cover rounded" />                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{video.title}</h2>
                    <div className="flex gap-4 text-sm text-gray-200 mt-1">
                      <span>Views: {video.views.toLocaleString()}</span>
                      <span>Likes: {video.likes.toLocaleString()}</span>
                      <span>Comments: {video.comments.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={function() { fetchVideoGraph(video.videoId); }}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-bold"
                  >
                    View Graph
                  </button>
                </div>
              </div>

              {selectedVideo === video.videoId && graphData && (
                <div className="p-6 bg-gray-800">
                  <h3 className="text-xl font-bold mb-4">Performance Graph</h3>
                  <Line
                    data={{
                      labels: graphData.labels,
                      datasets: [
                        { label: 'Views', data: graphData.datasets.views, borderColor: '#FF0000', backgroundColor: 'rgba(255, 0, 0, 0.1)', tension: 0.4 },
                        { label: 'Likes', data: graphData.datasets.likes, borderColor: '#00FF00', backgroundColor: 'rgba(0, 255, 0, 0.1)', tension: 0.4 }
                      ]
                    }}
                    options={chartOptions}
                  />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-700 p-3 rounded text-center">
                      <p className="text-gray-400">Growth Rate</p>
                      <p className="text-green-400 font-bold">{graphData.growth_rate.views}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded text-center">
                      <p className="text-gray-400">Likes Growth</p>
                      <p className="text-green-400 font-bold">{graphData.growth_rate.likes}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded text-center">
                      <p className="text-gray-400">Comments Growth</p>
                      <p className="text-green-400 font-bold">{graphData.growth_rate.comments}</p>
                    </div>
                  </div>
                </div>
              )}

              {video.seo && (
                <div className="p-6 space-y-3">
                  <div className="grid md:grid-cols-3 gap-3">                    <SEOCard title="English Title" data={video.seo.titles?.english} />
                    <SEOCard title="Hindi Title" data={video.seo.titles?.hindi} />
                    <SEOCard title="Hinglish Title" data={video.seo.titles?.hinglish} />
                  </div>
                  <SEOCard title="Description" data={video.seo.description} />
                  <SEOCard title="Hashtags" data={video.seo.hashtags?.join(' ')} />
                  <SEOCard title="Keywords" data={video.seo.keywords} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
                  }
