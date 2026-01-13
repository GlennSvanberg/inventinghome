import {
  defineEventHandler,
  getHeader,
  send,
  setResponseHeader,
  setResponseStatus,
} from 'h3'

export default defineEventHandler((event) => {
  const url = event.node.req.url || ''

  // Only protect /admin routes
  if (!url.startsWith('/admin')) {
    return
  }

  const authHeader = getHeader(event, 'Authorization')

  const isAuthorized = (() => {
    if (!authHeader || !authHeader.startsWith('Basic ')) return false

    try {
      const credentials = Buffer.from(
        authHeader.split(' ')[1],
        'base64',
      ).toString('utf-8')
      const [username, password] = credentials.split(':')
      return username === 'glenn' && password === 'Inventing42?'
    } catch (e) {
      return false
    }
  })()

  if (!isAuthorized) {
    setResponseStatus(event, 401)
    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="Admin"')
    return send(event, 'Unauthorized', 'text/plain')
  }
})
