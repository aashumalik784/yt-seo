export async function fetchVideoStats(videoId, apiKey) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`

  const response = await fetch(url)
  if (!response.ok) throw new Error('YouTube API error')

  const data = await response.json()
  
  if (!data.items || data.items.length === 0) {
    throw new Error('Video not found')
  }

  const stats = data.items[0].statistics
  return {
    views: parseInt(stats.viewCount || 0),
    likes: parseInt(stats.likeCount || 0),
    comments: parseInt(stats.commentCount || 0)
  }
}

export async function fetchVideoDetails(videoId, apiKey) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`

  const response = await fetch(url)
  if (!response.ok) throw new Error('YouTube API error')

  const data = await response.json()
  
  if (!data.items || data.items.length === 0) {
    throw new Error('Video not found')
  }

  const item = data.items[0]
  return {
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high.url,
    publishedAt: item.snippet.publishedAt,
    views: parseInt(item.statistics.viewCount || 0),
    likes: parseInt(item.statistics.likeCount || 0),
    comments: parseInt(item.statistics.commentCount || 0)
  }
}
