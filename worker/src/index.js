export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors, status: 204 });
    }

    try {
      if (url.pathname === '/api/seo' && request.method === 'POST') {
        return await handleSEO(request, env, cors);
      }
      if (url.pathname === '/api/analytics' && request.method === 'POST') {
        return await handleAnalytics(request, env, cors);
      }
      if (url.pathname === '/api/channel-auto-seo' && request.method === 'GET') {
        return await handleChannelAutoSEO(request, env, cors);
      }
      if (url.pathname === '/health') {
        return new Response(JSON.stringify({ 
          status: 'ok', 
          engine: 'Groq Llama 3.3',
          time: new Date().toISOString() 
        }), { headers: { ...cors, 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }
  }
};

async function handleSEO(request, env, cors) {
  const { topic, language = 'hinglish' } = await request.json();
  if (!topic || topic.length < 3) {
    return new Response(JSON.stringify({ error: 'Topic required' }), { 
      status: 400, headers: cors 
    });  }

  const prompt = `YouTube SEO for: "${topic}" in ${language}. Return JSON: { "titles": { "english": "", "hindi": "", "hinglish": "" }, "description": "", "hashtags": [], "keywords": "" }`;
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + env.GROQ_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      response_format: { type: 'json_object' }
    })
  });

  const data = await response.json();
  const seo = JSON.parse(data.choices[0].message.content);
  
  return new Response(JSON.stringify({ success: true, data: seo }), { headers: cors });
}

async function handleAnalytics(request, env, cors) {
  const { videoId } = await request.json();
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${env.YOUTUBE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  const stats = data.items[0].statistics;
  
  return new Response(JSON.stringify({
    success: true,
    views: parseInt(stats.viewCount),
    likes: parseInt(stats.likeCount),
    comments: parseInt(stats.commentCount)
  }), { headers: cors });
}

async function handleChannelAutoSEO(request, env, cors) {
  const channelId = env.YOUTUBE_CHANNEL_ID;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=10&type=video&key=${env.YOUTUBE_API_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  const videos = [];
  for (const item of data.items.slice(0, 5)) { // Sirf 5 videos
    const videoId = item.id.videoId;    
    // SEO generate karo
    const seoPrompt = `YouTube SEO for: "${item.snippet.title}". Return JSON: { "titles": { "english": "", "hindi": "", "hinglish": "" }, "description": "", "hashtags": [], "keywords": "" }`;
    
    const seoResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.GROQ_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: seoPrompt }],
        response_format: { type: 'json_object' }
      })
    });
    
    const seoData = JSON.parse((await seoResponse.json()).choices[0].message.content);
    
    // Stats fetch karo
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${env.YOUTUBE_API_KEY}`;
    const statsData = await (await fetch(statsUrl)).json();
    const stats = statsData.items[0].statistics;
    
    videos.push({
      videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      views: parseInt(stats.viewCount),
      likes: parseInt(stats.likeCount),
      comments: parseInt(stats.commentCount),
      seo: seoData
    });
  }
  
  return new Response(JSON.stringify({
    success: true,
    channel_id: channelId,
    total_videos: videos.length,
    videos
  }), { headers: cors });
                    }
