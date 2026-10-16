import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authApi } from '@/shared/api/authFetch'
import { API_CONFIG } from '@/shared/api/config'



// How often (in milliseconds) we tell the server the user is still here: every 60 seconds.
const INTERVAL_MS = 60_000

export default function ActivityHeartbeat() {
  const signedIn = useSelector((s) => Boolean(s.auth.user))

  useEffect(() => {
    if (!signedIn) return undefined

    let timezone = ''
    try {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    } catch {}

    let lastPing = 0
    const ping = () => {
      if (document.visibilityState !== 'visible') return
      lastPing = Date.now()
      authApi.post(API_CONFIG.ENDPOINTS.HEARTBEAT, { timezone }).catch(() => {}) // never bother the user over a missed ping
    }
    // Returning to the tab pings right away, but quick tab-switching can't spam.
    const onVisible = () => {
      if (Date.now() - lastPing >= INTERVAL_MS) ping()
    }

    ping()
    const id = setInterval(ping, INTERVAL_MS)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [signedIn])

  return null
}
