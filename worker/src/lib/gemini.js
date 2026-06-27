export async function generateSEOFromAI(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    })
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Gemini API error: ${err}`)
  }

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) throw new Error('No response from AI')

  try {
    return JSON.parse(text)
  } catch {
    // Try to extract JSON from markdown code block
    const match = text.match(/```json\s*([\s\S]*?)\s*```/)
    if (match) return JSON.parse(match[1])
    throw new Error('Failed to parse AI response')
  }
}
