// Centralized router (currently handled in index.js)
// Can be expanded for more complex routing
export const routes = {
  '/api/seo': 'POST',
  '/api/analytics': 'POST',
  '/api/video-details': 'POST',
  '/health': 'GET'
}

export const matchRoute = (pathname, method) => {
  return routes[pathname] === method
}
