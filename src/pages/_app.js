import { Provider } from 'react-redux'
import { store } from '@/shared/redux/store'
import Navbar from '@/shared/components/Navbar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )
}
