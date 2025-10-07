import type { Metadata } from "next";
import clsx from "clsx";
import { EnvironmentBanner } from "@/shared/components/layout/EnvironmentBanner";
import styles from "./layout.module.css";
import "./normalize.css";
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
      <body className={clsx(styles.body)}>
        <EnvironmentBanner />
        {children}
      </body>
    </html>
  );
}
