import Link from "next/link";

export default function LanguageToggle({ lang = "ko", koHref = "/", enHref = "/en", className = "" }) {
  return (
    <div className={`inline-flex items-center rounded-md border border-border-light dark:border-border-dark ${className}`}>
      <Link
        className={
          lang === "ko"
            ? "px-2 py-1 text-xs font-semibold bg-primary text-white rounded-l-md"
            : "px-2 py-1 text-xs font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
        }
        href={koHref}
      >
        KO
      </Link>
      <Link
        className={
          lang === "en"
            ? "px-2 py-1 text-xs font-semibold bg-primary text-white rounded-r-md"
            : "px-2 py-1 text-xs font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
        }
        href={enHref}
      >
        EN
      </Link>
    </div>
  );
}
