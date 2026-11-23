import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STUDY FLOW — Plan less. Focus more.",
  description: "학생의 계획, 실행, 집중, 성장을 하나로 연결하는 학습 관리 플랫폼.",
  applicationName: "STUDY FLOW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
