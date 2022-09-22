import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <!-- These meta tags are Apple-specific, and set the web application to run in full-screen mode with a black status bar. Learn more at https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html--> */}
        <meta name="application-name" content="Memory" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Memory cards game" />
        <meta name="description" content="The memory cards game." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="apple-touch-icon" href="/icons/192.png" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />

        {/* <!-- Imports the manifest to represent the web application. A web app must have a manifest to be a PWA. --> */}
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
