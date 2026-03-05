import "./globals.css";

export const metadata = {
  title: "Cotor Guide",
  description: "Cotor 사용법과 워크플로우를 정리한 공식 가이드 사이트",
  icons: {
    icon: "/cotor.svg",
    shortcut: "/cotor.svg",
    apple: "/cotor.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-sans antialiased transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
