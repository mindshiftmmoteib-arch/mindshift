import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leadership Insights Blog | MINDSHIFT ARABIA",
  description: "Discover transformative ideas and practical wisdom for leadership excellence. Articles on management, work-life balance, and executive coaching from Saudi Arabia.",
  alternates: {
    canonical: '/blog',
    languages: {
      'en': '/blog',
      'ar': '/ar/blog',
    },
  },
  openGraph: {
    title: "Leadership Insights Blog | MINDSHIFT ARABIA",
    description: "Discover transformative ideas and practical wisdom for leadership excellence.",
    url: 'https://mindshiftarabia.com/blog',
    type: 'website',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
