# 📖 API Documentation

## Base URL
Worker URL: `https://your-worker.workers.dev`

## Endpoints

### 1. Generate SEO
**POST** `/api/seo`

**Request:**
```json
{
  "topic": "iPhone 15 review",
  "language": "hinglish"
}
```

**Response:**
```json
{
  "titles": {
    "english": "...",
    "hindi": "...",
    "hinglish": "..."
  },
  "description": "...",
  "hashtags": ["#tag1", "#tag2"],
  "keywords": "tag1, tag2, tag3"
}
```

### 2. Get Video Analytics
**POST** `/api/analytics`

**Request:**
```json
{
  "videoId": "dQw4w9WgXcQ"
}
```

**Response:**
```json
{
  "views": 1234,
  "likes": 56,
  "comments": 12,
  "timestamp": "2026-06-26T10:00:00Z"
}
```
