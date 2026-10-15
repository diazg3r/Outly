const API_URL = 'http://localhost:3000'

export async function checkApiHealth() {
  const response = await fetch(`${API_URL}/api/health`)

  if (!response.ok) {
    throw new Error('Failed to connect to Outly API')
  }

  return response.json()
}