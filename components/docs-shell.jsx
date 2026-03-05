import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import ThemeToggleButton from "./theme-toggle-button";
import LanguageToggle from "./language-toggle";
import {
  getAllDocs,
  getDefaultDoc,
  getDocBySlug,
  getGroupedDocs,
  resolveMarkdownLink
} from "../lib/docs";

const TEXT = {
  ko: {
    searchPlaceholder: "Search docs by filename",
    overview: "개요",
    source: "원문",
    inThisSection: "이 섹션 문서",
    noRelated: "관련 문서가 없습니다"
  },
  en: {
    searchPlaceholder: "Search docs by filename",
    overview: "Overview",
    source: "Source",
    inThisSection: "In This Section",
    noRelated: "No related pages"
  }
};

const LANGUAGE_DOC_MAP = {
  readme: { ko: "readme-ko", en: "readme" },
  "readme-ko": { ko: "readme-ko", en: "readme" },
  "project-readme": { ko: "project-readme-ko", en: "project-readme" },
  "project-readme-ko": { ko: "project-readme-ko", en: "project-readme" }
};

function withLangPath(basePath, lang) {
  if (!basePath.startsWith("/")) return basePath;
  if (lang === "en") {
    return basePath === "/" ? "/en" : `/en${basePath}`;
  }
  return basePath;
}

function isExternalLink(href) {
  return href?.startsWith("http://") || href?.startsWith("https://");
}

function toDocHref(doc, defaultDoc, lang) {
  const base = doc.slugKey === defaultDoc.slugKey ? "/docs" : `/docs/${doc.slug.join("/")}`;
  return withLangPath(base, lang);
}

function toBreadcrumb(relativePath) {
  return relativePath.split("/").filter(Boolean);
}

export default function DocsShell({ lang = "ko", slugParts = [] }) {
  const t = TEXT[lang] ?? TEXT.ko;

  const defaultDoc = getDefaultDoc();
  const initialDoc = getDocBySlug(slugParts) ?? (slugParts.length === 0 ? defaultDoc : null);

  if (!initialDoc) notFound();

  const mappedKey = LANGUAGE_DOC_MAP[initialDoc.slugKey]?.[lang];
  if (mappedKey && mappedKey !== initialDoc.slugKey) {
    const mappedDoc = getAllDocs().find((item) => item.slugKey === mappedKey);
    if (mappedDoc) redirect(toDocHref(mappedDoc, defaultDoc, lang));
  }

  const doc = initialDoc;
  const groups = getGroupedDocs();
  const currentGroup = groups.find((group) =>
    group.items.some((item) => item.slugKey === doc.slugKey)
  );
  const rightNavDocs = currentGroup?.items ?? [];
  const breadcrumb = toBreadcrumb(doc.relativePath);

  const currentDocPath = doc.slugKey === defaultDoc.slugKey ? "/docs" : `/docs/${doc.slug.join("/")}`;
  const koHref = withLangPath(currentDocPath, "ko");
  const enHref = withLangPath(currentDocPath, "en");

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
      <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-3 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <Image src="/cotor.svg" alt="Cotor logo" width={26} height={26} />
          <Link className="font-semibold text-lg tracking-tight" href={withLangPath("/", lang)}>
            Cotor
          </Link>
          <div className="hidden md:flex items-center space-x-1 ml-4 border border-border-light dark:border-border-dark rounded bg-background-light dark:bg-background-dark px-2 py-1">
            <span className="material-icons text-text-muted-light dark:text-text-muted-dark text-sm">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm text-text-light dark:text-text-dark placeholder-text-muted-light dark:placeholder-text-muted-dark w-64 p-0"
              placeholder={t.searchPlaceholder}
              type="text"
              readOnly
            />
            <span className="text-xs text-text-muted-light dark:text-text-muted-dark border border-border-light dark:border-border-dark rounded px-1">
              /
            </span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href={withLangPath("/", lang)}>
            {t.overview}
          </Link>
          <a
            className="text-sm font-medium hover:text-primary transition-colors"
            href="https://github.com/heodongun/cotor"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <div className="h-5 w-px bg-border-light dark:bg-border-dark" />
          <LanguageToggle lang={lang} koHref={koHref} enHref={enHref} />
          <ThemeToggleButton
            className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark"
            iconClass="material-icons text-base align-middle"
          />
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hidden lg:block overflow-y-auto sidebar-scroll py-6 px-4">
          <nav className="space-y-6">
            {groups.map((group) => (
              <div key={group.group}>
                <h3 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mb-2 px-2">
                  {group.group}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const href = toDocHref(item, defaultDoc, lang);
                    const active = item.slugKey === doc.slugKey;
                    return (
                      <li key={item.slugKey}>
                        <Link
                          className={
                            active
                              ? "block px-2 py-1.5 text-sm rounded bg-primary bg-opacity-10 text-primary font-medium border-l-2 border-primary"
                              : "block px-2 py-1.5 text-sm rounded hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                          }
                          href={href}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          <div className="max-w-5xl mx-auto flex">
            <article className="markdown-body flex-1 prose dark:prose-invert max-w-none">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-light dark:border-border-dark">
                <div>
                  <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark mb-2">
                    {breadcrumb.map((segment, index) => (
                      <span key={`${segment}-${index}`} className="inline-flex items-center gap-2">
                        {index > 0 && <span>/</span>}
                        <span>{segment}</span>
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl font-bold mb-0">{doc.title}</h1>
                </div>
                <div className="flex space-x-2">
                  <a
                    className="inline-flex items-center px-3 py-1 text-sm border border-border-light dark:border-border-dark rounded-md bg-surface-light dark:bg-surface-dark hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                    href={`https://github.com/heodongun/cotor/blob/main/${doc.relativePath}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-icons text-sm mr-1">open_in_new</span>
                    {t.source}
                  </a>
                </div>
              </div>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={{
                  a({ href, children }) {
                    const resolved = resolveMarkdownLink(href, doc.relativePath);
                    if (isExternalLink(resolved)) {
                      return (
                        <a href={resolved} target="_blank" rel="noreferrer">
                          {children}
                        </a>
                      );
                    }
                    const internalHref = resolved?.startsWith("/") ? withLangPath(resolved, lang) : resolved;
                    return <a href={internalHref}>{children}</a>;
                  },
                  pre({ children }) {
                    return <pre className="code-block overflow-x-auto">{children}</pre>;
                  },
                  code({ className, children, ...props }) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  table({ children }) {
                    return <table className="docs-table">{children}</table>;
                  }
                }}
              >
                {doc.content}
              </ReactMarkdown>
            </article>

            <aside className="hidden xl:block w-72 ml-10 flex-shrink-0">
              <div className="sticky top-24">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mb-4">
                  {t.inThisSection}
                </h4>
                <ul className="space-y-2 text-sm text-text-muted-light dark:text-text-muted-dark border-l-2 border-border-light dark:border-border-dark">
                  {rightNavDocs.length === 0 ? (
                    <li className="pl-3">{t.noRelated}</li>
                  ) : (
                    rightNavDocs.map((item) => {
                      const href = toDocHref(item, defaultDoc, lang);
                      const active = item.slugKey === doc.slugKey;
                      return (
                        <li
                          key={`right-${item.slugKey}`}
                          className={
                            active
                              ? "pl-3 border-l-2 border-primary"
                              : "pl-3 border-l-2 border-transparent hover:border-text-muted-light dark:hover:border-text-muted-dark"
                          }
                        >
                          <Link
                            className={
                              active
                                ? "text-primary font-medium"
                                : "hover:text-text-light dark:hover:text-text-dark transition-colors"
                            }
                            href={href}
                          >
                            {item.title}
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
