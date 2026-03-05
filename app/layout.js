import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Cotor Guide",
  description: "Cotor 사용법과 워크플로우를 정리한 공식 가이드 사이트"
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
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    primary: "#0969da",
                    secondary: "#2da44e",
                    "background-light": "#ffffff",
                    "background-dark": "#0d1117",
                    "surface-light": "#f6f8fa",
                    "surface-dark": "#161b22",
                    "border-light": "#d0d7de",
                    "border-dark": "#30363d",
                    "text-light": "#1f2328",
                    "text-dark": "#e6edf3",
                    "text-muted-light": "#656d76",
                    "text-muted-dark": "#848d97",
                    "code-bg-light": "#f6f8fa",
                    "code-bg-dark": "#161b22"
                  },
                  fontFamily: {
                    sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
                    display: ["Inter", "sans-serif"],
                    mono: ["Fira Code", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", "monospace"]
                  },
                  borderRadius: {
                    DEFAULT: "6px"
                  }
                }
              }
            };
          `}
        </Script>
        <Script
          src="https://cdn.tailwindcss.com?plugins=forms,typography,container-queries"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
