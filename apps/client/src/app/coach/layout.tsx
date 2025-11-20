import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Coach Moteib bin Nasser AlAjmi | MINDSHIFT ARABIA",
  description: "Meet Moteib bin Nasser AlAjmi, Marshall Goldsmith certified executive coach from Saudi Arabia. Helping managers achieve balanced leadership and transform their teams.",
  alternates: {
    canonical: '/coach',
    languages: {
      'en': '/coach',
      'ar': '/ar/coach',
    },
  },
  openGraph: {
    title: "About Coach Moteib bin Nasser AlAjmi | MINDSHIFT ARABIA",
    description: "Meet Moteib bin Nasser AlAjmi, Marshall Goldsmith certified executive coach from Saudi Arabia.",
    url: 'https://mindshiftarabia.com/coach',
    type: 'profile',
  },
}

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
