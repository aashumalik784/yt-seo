import { handleSEORequest } from './handlers/seoHandler.js'
import { handleAnalyticsRequest } from './handlers/analyticsHandler.js'
import { handleVideoDetailsRequest } from './handlers/analyticsHandler.js'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      if (url.pathname === '/api/seo' && request.method === 'POST') {
        return await handleSEORequest(request, env)
      }
      
      if (url.pathname === '/api/analytics' && request.method === 'POST') {
        return await handleAnalyticsRequest(request, env)
      }

      if (url.pathname === '/api/video-details' && request.method === 'POST') {
        return await handleVideoDetailsRequest(request, env)
      }

      if (url.pathname === '/health') {
        return new Response(JSON.stringify({ status: 'ok', time: new Date().toISOString() }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
  }
}
