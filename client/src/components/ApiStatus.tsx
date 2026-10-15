import { useEffect, useState } from 'react'
import { checkApiHealth } from '../services/api'

export default function ApiStatus() {
  const [status, setStatus] = useState('Connecting to API...')

  useEffect(() => {
    async function checkConnection() {
      try {
        const data = await checkApiHealth()
        setStatus(data.message)
      } catch {
        setStatus('Unable to connect to API')
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="mt-6 text-sm text-slate-500">
      Backend status: {status}
    </div>
  )
}