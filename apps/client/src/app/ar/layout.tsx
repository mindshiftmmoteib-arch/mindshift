import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MINDSHIFT ARABIA | تدريب القيادة",
  description: "تدريب قيادي لإدارة متوازنة. الكوتش متعب بن ناصر العجمي يساعد المديرين على بناء حياة متوازنة من خلال برامج تدريبية مُثبتة في المملكة العربية السعودية.",
  alternates: {
    canonical: '/ar',
    languages: {
      'en': '/',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: "MINDSHIFT ARABIA | تدريب القيادة",
    description: "تدريب قيادي لإدارة متوازنة. الكوتش متعب بن ناصر العجمي يساعد المديرين على بناء حياة متوازنة من خلال برامج تدريبية مُثبتة في المملكة العربية السعودية.",
    url: 'https://mindshiftarabia.com/ar',
    locale: "ar_SA",
    siteName: "MINDSHIFT ARABIA",
  },
};

export default function ArabicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

