import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

const CONTENT_ROOT = path.join(process.cwd(), "content", "cotor-docs");
const DOCS_ROOT = path.join(CONTENT_ROOT, "docs");
const ALLOWED_EXTENSIONS = new Set([".md", ".txt"]);

const CORE_ORDER = [
  "docs/INDEX.md",
  "docs/README.md",
  "docs/README.ko.md",
  "docs/QUICK_START.md",
  "docs/FEATURES.md",
  "docs/ARCHITECTURE.md",
  "docs/PROJECT_ANALYSIS.md",
  "docs/cookbook.md",
  "docs/USAGE_TIPS.md",
  "docs/WEB_EDITOR.md",
  "docs/CONDITION_DSL.md",
  "docs/CLAUDE_SETUP.md",
  "docs/UPGRADE_GUIDE.md",
  "docs/UPGRADE_RECOMMENDATIONS.md",
  "docs/ci-failure-analysis.md",
  "docs/IMPROVEMENT_ISSUES.md"
];

let cache = null;

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath));
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

function removeExtension(name) {
  const ext = path.extname(name);
  if (!ext) return name;
  return name.slice(0, -ext.length);
}

function normalizeSegment(segment) {
  const cleaned = removeExtension(segment)
    .normalize("NFKC")
    .replace(/[_\s]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (!cleaned) return "doc";
  return cleaned.toLowerCase();
}

function cleanupTitleText(text) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromFilename(fileName) {
  return removeExtension(fileName)
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(content, fallback) {
  const lines = content.split(/\r?\n/);
  let inCodeFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const headingMatch = line.match(/^#\s+(.+)$/);
    if (!headingMatch) continue;
    const cleaned = cleanupTitleText(headingMatch[1]);
    if (cleaned) return cleaned;
  }
  return fallback;
}

function getGroup(relativePath) {
  if (relativePath.startsWith("docs/claude/commands/")) return "Claude Commands";
  if (relativePath.startsWith("docs/claude/")) return "Claude Integration";
  if (relativePath.startsWith("docs/release/")) return "Release";
  if (relativePath.startsWith("docs/reports/")) return "Reports";
  if (relativePath.startsWith("docs/templates/")) return "Templates";
  if (relativePath.startsWith("docs/")) return "Core Docs";
  return "Project";
}

function getSortScore(relativePath) {
  const index = CORE_ORDER.indexOf(relativePath);
  if (index >= 0) return index;
  return 10_000;
}

function ensureUniqueSlug(baseSlug, seen) {
  const slug = [...baseSlug];
  let count = 2;
  while (seen.has(slug.join("/"))) {
    const head = slug.slice(0, -1);
    const last = slug.at(-1);
    slug.length = 0;
    slug.push(...head, `${last}-${count}`);
    count += 1;
  }
  seen.add(slug.join("/"));
  return slug;
}

function toDocEntry(sourcePath, relativePath, forcedSlug, seenSlugs) {
  const extension = path.extname(relativePath).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) return null;

  const content = fs.readFileSync(sourcePath, "utf8");
  const defaultSlug =
    forcedSlug ??
    relativePath
      .replace(/^docs\//, "")
      .split("/")
      .map((segment) => normalizeSegment(segment));
  const slug = ensureUniqueSlug(defaultSlug, seenSlugs);
  const fallbackTitle = titleFromFilename(path.basename(relativePath));
  const title = extractTitle(content, fallbackTitle);

  return {
    sourcePath,
    relativePath,
    extension,
    slug,
    slugKey: slug.join("/"),
    group: getGroup(relativePath),
    title,
    content
  };
}

function buildCache() {
  const seenSlugs = new Set();
  const entries = [];

  const rootReadme = path.join(CONTENT_ROOT, "README.md");
  if (fs.existsSync(rootReadme)) {
    const entry = toDocEntry(rootReadme, "README.md", ["project-readme"], seenSlugs);
    if (entry) entries.push(entry);
  }

  const rootReadmeKo = path.join(CONTENT_ROOT, "README.ko.md");
  if (fs.existsSync(rootReadmeKo)) {
    const entry = toDocEntry(rootReadmeKo, "README.ko.md", ["project-readme-ko"], seenSlugs);
    if (entry) entries.push(entry);
  }

  if (fs.existsSync(DOCS_ROOT)) {
    for (const filePath of walkFiles(DOCS_ROOT)) {
      const relativePath = path.relative(CONTENT_ROOT, filePath).replace(/\\/g, "/");
      const entry = toDocEntry(filePath, relativePath, null, seenSlugs);
      if (entry) entries.push(entry);
    }
  }

  entries.sort((a, b) => {
    if (a.group !== b.group) {
      const groupOrder = [
        "Core Docs",
        "Project",
        "Claude Integration",
        "Claude Commands",
        "Release",
        "Templates",
        "Reports"
      ];
      const aOrder = groupOrder.indexOf(a.group);
      const bOrder = groupOrder.indexOf(b.group);
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.group.localeCompare(b.group);
    }

    const aScore = getSortScore(a.relativePath);
    const bScore = getSortScore(b.relativePath);
    if (aScore !== bScore) return aScore - bScore;

    return a.relativePath.localeCompare(b.relativePath);
  });

  const bySlug = new Map(entries.map((entry) => [entry.slugKey, entry]));
  const defaultDoc =
    entries.find((entry) => entry.relativePath === "docs/INDEX.md") ??
    entries.find((entry) => entry.relativePath === "docs/README.md") ??
    entries[0];

  return {
    entries,
    bySlug,
    defaultDoc
  };
}

function getCache() {
  if (!cache) cache = buildCache();
  return cache;
}

export function getAllDocs() {
  return getCache().entries;
}

export function getDefaultDoc() {
  return getCache().defaultDoc;
}

export function getDocBySlug(slugParts) {
  const { bySlug, defaultDoc } = getCache();
  if (!slugParts || slugParts.length === 0) return defaultDoc;
  const key = slugParts.join("/");
  return bySlug.get(key) ?? null;
}

export function getGroupedDocs() {
  const groups = new Map();
  for (const entry of getAllDocs()) {
    if (!groups.has(entry.group)) groups.set(entry.group, []);
    groups.get(entry.group).push(entry);
  }
  return [...groups.entries()].map(([group, items]) => ({ group, items }));
}

export function extractHeadings(markdown) {
  const lines = markdown.split(/\r?\n/);
  const headings = [];
  const slugger = new GithubSlugger();
  let inCodeFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (!match) continue;
    const depth = match[1].length;
    const text = cleanupTitleText(match[2]);
    if (!text) continue;
    const id = slugger.slug(text);
    headings.push({ depth, text, id });
  }

  return headings;
}

export function resolveMarkdownLink(href, currentRelativePath) {
  if (!href) return href;
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#")) return href;

  const currentDir = path.posix.dirname(currentRelativePath);
  const joined = path.posix.normalize(path.posix.join(currentDir, href));
  const base = joined.split("#")[0];
  const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";

  const doc = getAllDocs().find((entry) => {
    if (entry.relativePath === base) return true;
    return entry.relativePath === `${base}.md` || entry.relativePath === `${base}.txt`;
  });

  if (!doc) return href;
  return `/docs/${doc.slug.join("/")}${hash}`;
}
