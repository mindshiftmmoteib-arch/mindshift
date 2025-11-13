import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MINDSHIFT ARABIA | تدريب القيادة",
  description: "تدريب قيادي لإدارة متوازنة. المدرب مطيب العجمي يساعد المديرين على بناء حياة متوازنة من خلال برامج تدريبية مُثبتة في المملكة العربية السعودية.",
};

export default function ArabicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

