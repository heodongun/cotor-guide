import { JetBrains_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const bodyFont = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-body"
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const metadata = {
  title: "Cotor Guide",
  description: "Cotor 사용법과 워크플로우를 정리한 공식 가이드 사이트"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${bodyFont.variable} ${monoFont.variable}`}>{children}</body>
    </html>
  );
}
