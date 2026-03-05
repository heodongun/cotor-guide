/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx,mdx}"
  ],
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
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        display: ["Inter", "sans-serif"],
        mono: [
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ]
      },
      borderRadius: {
        DEFAULT: "6px"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries")
  ]
};
