import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact & Book Consultation | MINDSHIFT ARABIA",
  description: "Schedule your free consultation with Marshall Goldsmith certified coach Moteib bin Nasser AlAjmi. Start your leadership transformation journey today.",
  alternates: {
    canonical: '/contact',
    languages: {
      'en': '/contact',
      'ar': '/ar/contact',
    },
  },
  openGraph: {
    title: "Contact & Book Consultation | MINDSHIFT ARABIA",
    description: "Schedule your free consultation with Marshall Goldsmith certified coach Moteib bin Nasser AlAjmi.",
    url: 'https://mindshiftarabia.com/contact',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
