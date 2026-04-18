import type { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const webhookUrl = process.env.WEBHOOK_URL
  if (!webhookUrl) {
    return { statusCode: 500, body: 'Server misconfigured' }
  }

  try {
    const body = JSON.parse(event.body || '{}')

    // Ensure budget is always forwarded as a plain string
    if (body.budget !== undefined) {
      body.budget = String(body.budget)
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return { statusCode: 200, body: JSON.stringify(data) }
  } catch {
    return { statusCode: 500, body: 'Submission failed' }
  }
}

export { handler }
