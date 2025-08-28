// src/app/layout.tsx
import type { Metadata } from "next";
import { SessionProvider } from "@/components/SessionProvider";
import { Header } from "@/components/layout/Header";
import { BookStoreIcon } from "@/components/ui/BookStoreIcon";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BookStore - Rent & Buy Books Online",
    template: "%s | BookStore",
  },
  description:
    "Discover, rent, and buy books from our extensive collection. Track your reading journey and discover trending titles.",
  keywords:
    "books, rent books, buy books, online bookstore, reading, book rental, digital library",
  authors: [{ name: "BookStore Team" }],
  creator: "BookStore",
  metadataBase: new URL("https://bookstore.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bookstore.com",
    siteName: "BookStore",
    title: "BookStore - Rent & Buy Books Online",
    description: "Discover, rent, and buy books from our extensive collection.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BookStore - Your Digital Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BookStore - Rent & Buy Books Online",
    description: "Discover, rent, and buy books from our extensive collection.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification-code-here",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://covers.openlibrary.org" />
        <link rel="dns-prefetch" href="https://covers.openlibrary.org" />
      </head>
      <body className="font-sans antialiased">
        <SessionProvider>
          <div className="min-h-screen bg-red-50">
            <Header />
            <main>{children}</main>
            <footer className="bg-white border-t border-red-100 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center space-x-3">
                  <BookStoreIcon
                    size={24}
                    variant="simple"
                    className="text-red-600"
                  />
                  <p className="text-gray-600 text-sm">
                    © 2024 BookStore. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
