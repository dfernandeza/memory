import { FC, ReactNode } from 'react';
import Head from 'next/head';

export const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Memory cards game!</title>
        <meta name="description" content="The memory cards game." />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <link rel="icon" type="image/png" href="favicon.png" />
      </Head>

      {children}

      <footer className="footer">
        {/* Powered by. Vercel*/}
        <p>
          Build with ❤️ by papa using{' '}
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
