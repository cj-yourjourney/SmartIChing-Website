import { useEffect } from 'react'
import posthog from 'posthog-js'
import { Provider } from 'react-redux'
import { store } from '@/shared/redux/store'
import Navbar from '@/shared/components/Navbar'
import { GoogleTagManager } from '@next/third-parties/google'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !posthog.__loaded) {
      posthog.init('phc_RVwdiW3q1GG2KWzeAnxGuMFNPBbq53am6SgCZ5oYnJJ', {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
        loaded: (ph) => {
          ph.register({ app: 'smartiching' })
        }
      })
    }
  }, [])

  return (
    <Provider store={store}>
      <GoogleTagManager gtmId="G-2FVTDEEQEJ" />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )
}
