export function generateSEOPrompt(topic, language = 'hinglish') {
  return `You are an expert YouTube SEO specialist with 10+ years of experience helping creators go viral.

Video Topic: "${topic}"
Primary Language Focus: ${language}

Generate a complete SEO package in STRICT JSON format (no markdown, no explanation, only JSON):

{
  "titles": {
    "english": "One viral, click-worthy English title (50-70 chars)",
    "hindi": "One viral Hindi title in Devanagari script (50-70 chars)",
    "hinglish": "One viral Hinglish title mixing Hindi & English (50-70 chars)"
  },
  "description": "SEO-optimized description (300-500 words) including: hook in first 2 lines, topic explanation, timestamps if applicable, call-to-action, relevant keywords naturally integrated, social links placeholder",
  "hashtags": ["#hashtag1", "#hashtag2", "...total 15 high-impact hashtags"],
  "keywords": "keyword1, keyword2, keyword3, ... (20-25 backend tags, comma-separated, mix of short-tail and long-tail)"
}

Rules:
- Titles must be curiosity-inducing and high CTR
- Description must include primary keyword in first 25 words
- Tags must include misspellings and variations
- All content must be in ${language} style where applicable
- Return ONLY valid JSON, nothing else`
}
