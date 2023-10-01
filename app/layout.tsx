import "../styles/globals.css";

import localFont from "next/font/local";
import type { Metadata } from "next";

const RocherColorFont = localFont({
  src: "../public/RocherColor/RocherColor.woff2",
  variable: "--font-rocher-color",
  display: "swap",
});

const title = "Lena's games.";
const description =
  "Just some extremely simple but fun games that my daughter Lena enjoys!";
const url = "https://memory-dfernandeza.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(url),

  title,
  description,
  themeColor: "#bd4292",
  manifest: "/manifest.json",

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  openGraph: {
    title,
    description,
    url,
    siteName: "Lena's games",
    images: [
      {
        url: "/og.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.png"],
    apple: [
      { url: "/icons/192.png", type: "image/png" },
      { url: "/icons/256.png", type: "image/png", sizes: "256x256" },
      { url: "/icons/512.png", type: "image/png", sizes: "512x512" },
    ],
  },

  appleWebApp: {
    title,
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={RocherColorFont.variable}>
      <body>
        {children}

        <footer className="footer">
          <p>
            Built with ❤️ by papa using{" "}
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
      </body>
    </html>
  );
}
