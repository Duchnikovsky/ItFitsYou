import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider><Component {...pageProps} /></SessionProvider>
}
