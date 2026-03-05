import DocsShell from "../../../../components/docs-shell";
import { getAllDocs, getDefaultDoc, getDocBySlug } from "../../../../lib/docs";

export function generateStaticParams() {
  const docs = getAllDocs();
  return [{ slug: [] }, ...docs.map((doc) => ({ slug: doc.slug }))];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slugParts = resolvedParams?.slug ?? [];
  const doc = getDocBySlug(slugParts) ?? getDefaultDoc();
  return {
    title: `${doc.title} | Cotor Docs`
  };
}

export default async function DocsEnPage({ params }) {
  const resolvedParams = await params;
  const slugParts = resolvedParams?.slug ?? [];
  return <DocsShell lang="en" slugParts={slugParts} />;
}
