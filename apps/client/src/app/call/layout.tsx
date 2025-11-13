import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "MINDSHIFT ARABIA Voice Call",
  description: "Premium voice calling with MINDSHIFT ARABIA",
};

export default function CallLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
