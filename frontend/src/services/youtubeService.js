import axios from 'axios'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:8787'

export const getVideoAnalytics = async (videoId) => {
  try {
    const response = await axios.post(`${WORKER_URL}/api/analytics`, { videoId })
    return response.data
  } catch (error) {
    console.error('Analytics error:', error)
    throw new Error(error.response?.data?.error || 'Failed to fetch analytics')
  }
}

export const getVideoDetails = async (videoId) => {
  try {
    const response = await axios.post(`${WORKER_URL}/api/video-details`, { videoId })
    return response.data
  } catch (error) {
    console.error('Video details error:', error)
    throw new Error('Failed to fetch video details')
  }
}
