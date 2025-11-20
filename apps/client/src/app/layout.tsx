import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL('https://mindshiftarabia.com'),
  title: "MINDSHIFT ARABIA | Leadership Coaching",
  description: "Leadership coaching for balanced management. Moteib bin Nasser AlAjmi helps managers build balanced lives through proven coaching programs in Saudi Arabia.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: "MINDSHIFT ARABIA | Leadership Coaching",
    description: "Leadership coaching for balanced management. Moteib bin Nasser AlAjmi helps managers build balanced lives through proven coaching programs in Saudi Arabia.",
    url: 'https://mindshiftarabia.com',
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MINDSHIFT ARABIA",
    "alternateName": "MindShift Arabia",
    "url": "https://mindshiftarabia.com",
    "logo": "https://mindshiftarabia.com/logo.png",
    "description": "Leadership coaching for balanced management helping managers build balanced lives through proven coaching programs",
    "founder": {
      "@type": "Person",
      "name": "Moteib bin Nasser AlAjmi",
      "jobTitle": "Marshall Goldsmith Certified Executive Coach",
      "description": "Certified leadership coach from Saudi Arabia helping managers transform their leadership style",
    },
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia"
    },
    "sameAs": [
      "https://calendly.com/coach_moteib"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "MINDSHIFT ARABIA",
    "image": "https://mindshiftarabia.com/logo.png",
    "description": "Leadership coaching programs for managers in Saudi Arabia. Marshall Goldsmith certified executive coaching services.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressRegion": "Saudi Arabia"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "SA"
    },
    "url": "https://mindshiftarabia.com",
    "priceRange": "$$",
    "serviceType": [
      "Executive Coaching",
      "Leadership Development",
      "Management Coaching",
      "Work-Life Balance Coaching"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Saudi Arabia"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f8f4ed] text-slate-900 min-h-screen flex flex-col`}>
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div className="flex-1 mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          {children}
        </div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
