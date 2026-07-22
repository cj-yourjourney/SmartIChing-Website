import { Provider } from 'react-redux'
import { store } from '@/shared/redux/store'
import Navbar from '@/shared/components/Navbar'
import { GoogleTagManager } from '@next/third-parties/google'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GoogleTagManager gtmId="G-2FVTDEEQEJ" />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )
}
