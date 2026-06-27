import { useState, useEffect, useRef } from 'react'
import { getVideoAnalytics } from '../services/youtubeService'

export const useYouTubeData = (videoId, intervalMs = 60000) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const intervalRef = useRef(null)

  const fetchData = async () => {
    if (!videoId) return
    setLoading(true)
    try {
      const result = await getVideoAnalytics(videoId)
      setData(prev => [...prev, {
        ...result,
        time: new Date().toLocaleTimeString()
      }])
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (videoId) {
      fetchData()
      intervalRef.current = setInterval(fetchData, intervalMs)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [videoId, intervalMs])

  const reset = () => {
    setData([])
    setError(null)
  }

  return { data, loading, error, reset, refetch: fetchData }
}
