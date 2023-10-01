import "../styles/globals.css";

import localFont from "next/font/local";
import type { AppProps } from "next/app";

const RocherColorFont = localFont({
  src: "../public/RocherColor/RocherColor.woff2",
  variable: "--font-rocher-color",
  display: "swap",
});

function Memory({ Component, pageProps }: AppProps) {
  return (
    <div className={RocherColorFont.variable}>
      <Component {...pageProps} />
    </div>
  );
}

export default Memory;
