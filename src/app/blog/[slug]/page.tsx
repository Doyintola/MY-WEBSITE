import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function parseTags(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: post.coverImage
      ? { images: [{ url: post.coverImage }], title: post.title }
      : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });
  if (!post || !post.published) notFound();

  const tags = parseTags(post.tags);

  return (
    <article className="bg-paper-warm">
      {/* HEADER */}
      <header className="relative overflow-hidden border-b border-ink/15 pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-gold/15 blur-3xl" />
        <div aria-hidden className="absolute left-0 top-32 h-1 w-1/4 bg-gold md:top-40" />

        <div className="container-tight relative">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60 hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" />
              All field notes
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 font-mono text-[0.72rem] uppercase tracking-wider2 text-gold">
              {formatDate(post.publishedAt)}
            </p>
            <h1 className="display mt-6 text-balance text-4xl text-ink md:text-7xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-ink/70 md:text-xl">
                {post.excerpt}
              </p>
            )}
            {tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </header>

      {/* COVER */}
      {post.coverImage && (
        <div className="bg-paper-warm">
          <div className="container-x py-10">
            <Reveal>
              <div className="relative aspect-[16/9] overflow-hidden ring-paper">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(min-width:1024px) 80vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {/* BODY */}
      <section className="section pt-12">
        <div className="container-tight">
          <Reveal>
            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink/85 prose-a:text-gold prose-strong:text-ink prose-blockquote:border-gold prose-blockquote:text-ink/80 prose-img:rounded-md">
              <ReactMarkdown>{post.body || ""}</ReactMarkdown>
            </div>
          </Reveal>

          <div className="mt-20 border-t border-ink/15 pt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60 hover:text-ink"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to all field notes
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
