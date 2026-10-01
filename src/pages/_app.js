import { useEffect } from 'react'
import posthog from 'posthog-js'
import { Provider } from 'react-redux'
import { store } from '@/shared/redux/store'
import AuthProvider from '@/features/auth/AuthProvider'
import Navbar from '@/shared/components/Navbar'
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
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}
