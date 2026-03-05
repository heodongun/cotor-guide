import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "./theme-toggle-button";
import LanguageToggle from "./language-toggle";
import { getDefaultDoc, getGroupedDocs } from "../lib/docs";

function withLangPath(basePath, lang) {
  if (!basePath.startsWith("/")) return basePath;
  if (lang === "en") {
    return basePath === "/" ? "/en" : `/en${basePath}`;
  }
  return basePath;
}

function toDocHref(doc, defaultDoc, lang) {
  const base = doc.slugKey === defaultDoc.slugKey ? "/docs" : `/docs/${doc.slug.join("/")}`;
  return withLangPath(base, lang);
}

function getDocSummary(doc, lang) {
  const path = doc.relativePath;

  if (lang === "en") {
    if (path.endsWith("QUICK_START.md")) return "Fastest path from install to first pipeline run.";
    if (path.endsWith("FEATURES.md")) return "Execution modes, checkpoints, output formats, and key features.";
    if (path.endsWith("ARCHITECTURE.md")) return "Pipeline orchestration model and architecture details.";
    if (path.endsWith("cookbook.md")) return "Practical, production-style pipeline examples.";
    if (path.endsWith("USAGE_TIPS.md")) return "Common issues and debugging patterns for operations.";
    if (path.endsWith("PROJECT_ANALYSIS.md")) return "Repository and runtime analysis of the cotor project.";
    if (path.endsWith("README.ko.md")) return "Project overview and commands in Korean.";
    if (path.endsWith("README.md")) return "Project overview and command surface in English.";

    return "Synced from upstream cotor documentation.";
  }

  if (path.endsWith("QUICK_START.md")) return "설치부터 첫 실행까지 가장 빠른 경로를 안내합니다.";
  if (path.endsWith("FEATURES.md")) return "실행 모드, 체크포인트, 출력 포맷 등 핵심 기능을 정리합니다.";
  if (path.endsWith("ARCHITECTURE.md")) return "파이프라인 구조와 오케스트레이션 설계를 설명합니다.";
  if (path.endsWith("cookbook.md")) return "실무에서 바로 쓰는 예제 파이프라인 모음을 제공합니다.";
  if (path.endsWith("USAGE_TIPS.md")) return "운영 중 자주 만나는 문제와 디버깅 팁을 제공합니다.";
  if (path.endsWith("PROJECT_ANALYSIS.md")) return "cotor 저장소 구조와 운영 관점 분석을 제공합니다.";
  if (path.endsWith("README.ko.md")) return "프로젝트 개요와 명령어를 한국어로 확인할 수 있습니다.";
  if (path.endsWith("README.md")) return "프로젝트 전체 개요와 영문 문서를 확인할 수 있습니다.";

  return "원본 cotor 문서를 기반으로 동기화된 문서입니다.";
}

function pickDocs(allDocs, keys) {
  const selected = keys
    .map((key) => allDocs.find((doc) => doc.slugKey === key))
    .filter(Boolean);

  return [...new Map(selected.map((doc) => [doc.slugKey, doc])).values()];
}

const TEXT = {
  ko: {
    siteTitle: "Cotor Guide",
    docsDashboard: "Docs Dashboard",
    docsSectionTitle: "Documentation",
    heroBadge: "Cotor Official Guide",
    heroTitle: "cotor 문서를 실제 운영 흐름 기준으로 탐색하는 대시보드",
    heroDescription:
      "이 사이트는 /Users/Projects/cotor-organization/cotor/docs 문서를 기반으로 구성되어 있으며, 페이지별로 분리된 문서로 이동해 전체 내용을 확인할 수 있습니다.",
    openAllDocs: "전체 문서 열기",
    openProjectAnalysis: "프로젝트 분석 보기",
    learningPathTitle: "권장 학습/운영 경로",
    allDocsTitle: "전체 문서 페이지",
    quickLinks: "Quick Links",
    external: "External",
    repo: "cotor Repository",
    issues: "GitHub Issues",
    footerDocsDashboard: "Documentation Dashboard",
    footerProjectAnalysis: "Project Analysis",
    workflow: "init → template → validate → run → stats/doctor",
    searchPlaceholder: "Search docs by filename"
  },
  en: {
    siteTitle: "Cotor Guide",
    docsDashboard: "Docs Dashboard",
    docsSectionTitle: "Documentation",
    heroBadge: "Cotor Official Guide",
    heroTitle: "Workflow-first dashboard for cotor documentation",
    heroDescription:
      "This site mirrors /Users/Projects/cotor-organization/cotor/docs and provides fully separated pages instead of a single long document.",
    openAllDocs: "Open Full Docs",
    openProjectAnalysis: "View Project Analysis",
    learningPathTitle: "Recommended Learning & Ops Path",
    allDocsTitle: "All Documentation Pages",
    quickLinks: "Quick Links",
    external: "External",
    repo: "cotor Repository",
    issues: "GitHub Issues",
    footerDocsDashboard: "Documentation Dashboard",
    footerProjectAnalysis: "Project Analysis",
    workflow: "init → template → validate → run → stats/doctor",
    searchPlaceholder: "Search docs by filename"
  }
};

export default function HomeShell({ lang = "ko" }) {
  const t = TEXT[lang] ?? TEXT.ko;

  const groups = getGroupedDocs();
  const defaultDoc = getDefaultDoc();
  const allDocs = groups.flatMap((group) => group.items);

  const quickPathDocs = pickDocs(allDocs, [
    "quick-start",
    "features",
    "architecture",
    "cookbook",
    "usage-tips",
    "project-analysis"
  ]);

  const rightNavDocs = pickDocs(allDocs, [
    "readme-ko",
    "readme",
    "quick-start",
    "features",
    "architecture",
    "project-analysis",
    "condition-dsl",
    "web-editor"
  ]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen flex flex-col">
      <header className="border-b border-border-light dark:border-border-dark bg-background-light dark:bg-surface-dark z-50 py-3 sticky top-0">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2" href={withLangPath("/", lang)}>
              <Image src="/cotor.svg" alt="Cotor logo" width={28} height={28} />
              <span className="font-semibold text-lg tracking-tight">{t.siteTitle}</span>
            </Link>
            <div className="hidden md:flex items-center border border-border-light dark:border-border-dark rounded-md px-2 py-1 bg-surface-light dark:bg-background-dark text-sm text-text-muted-light dark:text-text-muted-dark w-72 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-[16px] mr-1">search</span>
              <input
                className="bg-transparent border-none outline-none w-full text-text-light dark:text-text-dark text-sm p-0 focus:ring-0"
                placeholder={t.searchPlaceholder}
                type="text"
                readOnly
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <LanguageToggle lang={lang} koHref="/" enHref="/en" />
            <ThemeToggleButton
              className="p-1 rounded-md text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
              iconClass="material-symbols-outlined"
            />
            <a
              className="hidden sm:block hover:text-primary transition-colors"
              href="https://github.com/heodongun/cotor"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <Link
              className="border border-border-light dark:border-border-dark bg-surface-light dark:bg-border-dark text-text-light dark:text-text-dark px-3 py-1 rounded-md hover:bg-border-light dark:hover:bg-border-dark transition-colors"
              href={withLangPath("/docs", lang)}
            >
              {t.docsDashboard}
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1500px] w-full mx-auto">
        <aside className="w-72 border-r border-border-light dark:border-border-dark hidden lg:block flex-shrink-0 bg-background-light dark:bg-background-dark py-6 px-4 overflow-y-auto sidebar-scroll">
          <h3 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider px-2 mb-3">
            {t.docsSectionTitle}
          </h3>
          <nav className="space-y-6">
            {groups.map((group) => (
              <div key={group.group}>
                <h4 className="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider px-2 mb-2">
                  {group.group}
                </h4>
                <ul className="space-y-1">
                  {group.items.map((doc) => {
                    const href = toDocHref(doc, defaultDoc, lang);
                    return (
                      <li key={`left-${doc.slugKey}`}>
                        <Link
                          className="block px-2 py-1.5 text-sm rounded-md hover:bg-surface-light dark:hover:bg-surface-dark text-text-light dark:text-text-dark transition-colors"
                          href={href}
                        >
                          {doc.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 py-6 px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <section className="border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark p-6 md:p-8 mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mb-2">
                {t.heroBadge}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t.heroTitle}</h1>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed mb-4">
                {t.heroDescription}
              </p>
              <p className="mb-6">
                <span className="workflow-chip">{t.workflow}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-1 rounded-md bg-primary text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
                  href={withLangPath("/docs", lang)}
                >
                  {t.openAllDocs}
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link
                  className="inline-flex items-center gap-1 rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-2 text-sm font-semibold hover:bg-surface-light dark:hover:bg-border-dark transition-colors"
                  href={withLangPath("/docs/project-analysis", lang)}
                >
                  {t.openProjectAnalysis}
                </Link>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{t.learningPathTitle}</h2>
              <ol className="space-y-3 list-decimal pl-6">
                {quickPathDocs.map((doc) => {
                  const href = toDocHref(doc, defaultDoc, lang);
                  return (
                    <li key={`path-${doc.slugKey}`}>
                      <Link className="font-semibold hover:text-primary transition-colors" href={href}>
                        {doc.title}
                      </Link>
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
                        {getDocSummary(doc, lang)}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">{t.allDocsTitle}</h2>
              <div className="space-y-8">
                {groups.map((group) => (
                  <div key={`main-${group.group}`}>
                    <h3 className="text-lg font-semibold mb-3">{group.group}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {group.items.map((doc) => {
                        const href = toDocHref(doc, defaultDoc, lang);
                        return (
                          <Link
                            key={`card-${doc.slugKey}`}
                            className="block rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark p-4 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
                            href={href}
                          >
                            <p className="font-semibold mb-1">{doc.title}</p>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                              {doc.relativePath}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <aside className="w-72 hidden xl:block flex-shrink-0 border-l border-border-light dark:border-border-dark py-6 px-4 overflow-y-auto sidebar-scroll">
          <h4 className="text-xs font-semibold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">
            {t.quickLinks}
          </h4>
          <ul className="text-sm space-y-2 text-text-muted-light dark:text-text-muted-dark border-l border-border-light dark:border-border-dark pl-3 mb-8">
            {rightNavDocs.map((doc) => {
              const href = toDocHref(doc, defaultDoc, lang);
              return (
                <li key={`right-${doc.slugKey}`}>
                  <Link className="hover:text-primary transition-colors block" href={href}>
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <h4 className="text-xs font-semibold text-text-light dark:text-text-dark uppercase tracking-wider mb-3">
            {t.external}
          </h4>
          <ul className="text-sm space-y-2 text-text-muted-light dark:text-text-muted-dark border-l border-border-light dark:border-border-dark pl-3">
            <li>
              <a
                className="hover:text-primary transition-colors block"
                href="https://github.com/heodongun/cotor"
                target="_blank"
                rel="noreferrer"
              >
                {t.repo}
              </a>
            </li>
            <li>
              <a
                className="hover:text-primary transition-colors block"
                href="https://github.com/heodongun/cotor/issues"
                target="_blank"
                rel="noreferrer"
              >
                {t.issues}
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <footer className="border-t border-border-light dark:border-border-dark py-8 mt-auto">
        <div className="max-w-[1500px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-text-muted-light dark:text-text-muted-dark gap-4">
          <div className="flex items-center gap-2">
            <Image src="/cotor.svg" alt="Cotor logo" width={20} height={20} className="opacity-80" />
            <span>© 2026 Cotor Guide</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link className="hover:text-primary transition-colors" href={withLangPath("/docs", lang)}>
              {t.footerDocsDashboard}
            </Link>
            <Link className="hover:text-primary transition-colors" href={withLangPath("/docs/project-analysis", lang)}>
              {t.footerProjectAnalysis}
            </Link>
            <a
              className="hover:text-primary transition-colors"
              href="https://github.com/heodongun/cotor"
              target="_blank"
              rel="noreferrer"
            >
              Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
