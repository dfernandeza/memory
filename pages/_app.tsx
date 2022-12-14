import '../styles/globals.css';

import type { AppProps } from 'next/app';

function Memory({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Memory;
