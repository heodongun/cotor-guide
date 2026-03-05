"use client";

import { useEffect } from "react";

const THEME_KEY = "cotor-guide-theme";

export default function ThemeToggleButton({ className = "", iconClass = "" }) {
  useEffect(() => {
    const root = document.documentElement;
    const saved = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = saved ? saved === "dark" : prefersDark;

    root.classList.toggle("dark", shouldUseDark);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");
    root.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem(THEME_KEY, nextIsDark ? "dark" : "light");
  }

  return (
    <button type="button" aria-label="Toggle theme" onClick={toggleTheme} className={className}>
      <span className={`${iconClass} dark:hidden`}>dark_mode</span>
      <span className={`${iconClass} hidden dark:inline`}>light_mode</span>
    </button>
  );
}
