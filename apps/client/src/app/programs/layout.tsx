import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Leadership Coaching Programs | MINDSHIFT ARABIA",
  description: "Choose from 6, 9, or 12-month leadership coaching programs. Personalized executive coaching for managers in Saudi Arabia. Marshall Goldsmith certified coaching.",
  alternates: {
    canonical: '/programs',
    languages: {
      'en': '/programs',
      'ar': '/ar/programs',
    },
  },
  openGraph: {
    title: "Leadership Coaching Programs | MINDSHIFT ARABIA",
    description: "Choose from 6, 9, or 12-month leadership coaching programs. Personalized executive coaching for managers in Saudi Arabia.",
    url: 'https://mindshiftarabia.com/programs',
    type: 'website',
  },
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
