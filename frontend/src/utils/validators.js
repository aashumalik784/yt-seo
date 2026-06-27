export const isValidYouTubeUrl = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  return regex.test(url)
}

export const extractVideoId = (url) => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
  return match ? match[1] : null
}

export const isValidTopic = (topic) => {
  return topic && topic.trim().length >= 3 && topic.trim().length <= 200
}
