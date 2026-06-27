import { fetchVideoStats, fetchVideoDetails } from '../lib/youtube.js'

export async function handleAnalyticsRequest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }

  try {
    const { videoId } = await request.json()

    if (!videoId || videoId.length !== 11) {
      return new Response(JSON.stringify({ error: 'Invalid video ID' }), {
        status: 400,
        headers: corsHeaders
      })
    }

    const stats = await fetchVideoStats(videoId, env.YOUTUBE_API_KEY)

    return new Response(JSON.stringify({
      views: stats.views,
      likes: stats.likes,
      comments: stats.comments,
      timestamp: new Date().toISOString()
    }), {
      headers: corsHeaders
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders
    })
  }
}

export async function handleVideoDetailsRequest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }

  try {
    const { videoId } = await request.json()
    const details = await fetchVideoDetails(videoId, env.YOUTUBE_API_KEY)

    return new Response(JSON.stringify(details), {
      headers: corsHeaders
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders
    })
  }
}
