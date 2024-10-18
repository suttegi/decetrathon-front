import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { usePlayer } from '@/hooks/usePlayer';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { initializePlayer } = usePlayer();

  useEffect(() => {
    initializePlayer();
  }, [initializePlayer]);

  return <Component {...pageProps} />;
}

export default MyApp;