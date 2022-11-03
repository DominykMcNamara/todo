import '../styles/globals.css'
import { supabase } from '../lib/supabaseClient'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
 

  return (
    <SessionContextProvider
      initialSession={pageProps.initialSession}
      supabaseClient={supabase}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}

export default MyApp