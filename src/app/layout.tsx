import type { Metadata } from "next";
import { EnvironmentBanner } from "@/shared/components/layout/EnvironmentBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Template",
  description: "Next.jsプロジェクトテンプレート",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50">
        <EnvironmentBanner />
        {children}
      </body>
    </html>
  );
}
