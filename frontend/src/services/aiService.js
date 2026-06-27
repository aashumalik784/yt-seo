import axios from 'axios'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:8787'

export const generateSEO = async (topic, language = 'hinglish') => {
  try {
    const response = await axios.post(`${WORKER_URL}/api/seo`, {
      topic,
      language
    })
    return response.data
  } catch (error) {
    console.error('SEO generation error:', error)
    throw new Error(error.response?.data?.error || 'Failed to generate SEO')
  }
}
