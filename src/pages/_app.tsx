import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { telegram } from '@/utils/telegram';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (telegram) {
      telegram.ready();
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;