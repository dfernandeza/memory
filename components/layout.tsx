import { FC, ReactNode } from 'react';
import Head from 'next/head';

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Memory cards game!</title>
        <meta name="description" content="The memory cards game." />

        {/* <!-- These meta tags are Apple-specific, and set the web application to run in full-screen mode with a black status bar. Learn more at https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html--> */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="PWA Starter" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        <link rel="apple-touch-icon" sizes="192x192" href="/icons/192.png" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />

        {/* <!-- Imports the manifest to represent the web application. A web app must have a manifest to be a PWA. --> */}
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {children}

      <footer className="footer">
        <p>
          Built with ❤️ by papa using{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NEXT.JS
          </a>
          .
        </p>
      </footer>
    </>
  );
};
