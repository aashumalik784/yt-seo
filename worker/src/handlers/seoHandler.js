import { generateSEOFromAI } from '../lib/gemini.js'
import { generateSEOPrompt } from '../prompts/seoPrompt.js'

export async function handleSEORequest(request, env) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }

  try {
    const { topic, language = 'hinglish' } = await request.json()

    if (!topic || topic.trim().length < 3) {
      return new Response(JSON.stringify({ error: 'Topic is required (min 3 chars)' }), {
        status: 400,
        headers: corsHeaders
      })
    }

    const prompt = generateSEOPrompt(topic, language)
    const result = await generateSEOFromAI(prompt, env.AI_API_KEY)

    return new Response(JSON.stringify(result), {
      headers: corsHeaders
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders
    })
  }
}
