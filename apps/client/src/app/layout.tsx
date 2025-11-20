import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MINDSHIFT ARABIA | Leadership Coaching",
  description: "Leadership coaching for balanced management. Moteib bin Nasser AlAjmi helps managers build balanced lives through proven coaching programs in Saudi Arabia.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "MINDSHIFT ARABIA | Leadership Coaching",
    description: "Leadership coaching for balanced management. Moteib bin Nasser AlAjmi helps managers build balanced lives through proven coaching programs in Saudi Arabia.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MINDSHIFT ARABIA - Balance Minds. Build Futures.",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "MINDSHIFT ARABIA",
  },
  twitter: {
    card: "summary_large_image",
    title: "MINDSHIFT ARABIA | Leadership Coaching",
    description: "Leadership coaching for balanced management. Moteib bin Nasser AlAjmi helps managers build balanced lives through proven coaching programs in Saudi Arabia.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f4ed] text-slate-900 min-h-screen flex flex-col`}> 
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
