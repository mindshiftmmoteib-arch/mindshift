import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/keystatic';
import { readFile } from 'fs/promises';
import { join } from 'path';
import Markdoc from '@markdoc/markdoc';
import React from 'react';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.published) {
    notFound();
  }

  // Read the markdown file directly
  // In production (Vercel), cwd is /vercel/path0/apps/client, so go up 2 levels to repo root
  const rootPath = process.env.NODE_ENV === 'production'
    ? join(process.cwd(), '../../')
    : process.cwd();
  const contentPath = join(rootPath, 'content', 'articles', slug, 'contentEn.mdoc');
  const contentString = await readFile(contentPath, 'utf-8');

  // Remove YAML frontmatter if present
  const cleanContent = contentString.replace(/^---\s*\n.*?\n---\s*\n/s, '');

  // Parse and render Markdoc
  const ast = Markdoc.parse(cleanContent);
  const content = Markdoc.transform(ast);
  const htmlContent = Markdoc.renderers.html(content);

  // Article schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.titleEn,
    "description": article.excerptEn,
    "datePublished": article.publishedDate,
    "dateModified": article.publishedDate,
    "author": {
      "@type": "Person",
      "name": "Moteib bin Nasser AlAjmi",
      "jobTitle": "Marshall Goldsmith Certified Executive Coach",
      "url": "https://mindshiftarabia.com/coach"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MINDSHIFT ARABIA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mindshiftarabia.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mindshiftarabia.com/blog/${slug}`
    },
    "keywords": "leadership coaching, management, work-life balance, Saudi Arabia, executive coaching"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <article className="p-6 sm:p-8 md:p-12">
          <header className="mb-8 pb-8 border-b-2 border-amber-500/20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              {article.titleEn}
            </h1>
            <div className="flex items-center gap-2 text-slate-600">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={article.publishedDate || undefined} className="font-medium">
                {new Date(article.publishedDate || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          <div
            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-800 prose-a:text-amber-600 hover:prose-a:text-amber-700 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <footer className="mt-12 pt-8 border-t-2 border-amber-500/20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.titleEn,
    description: article.excerptEn,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        'en': `/blog/${slug}`,
        'ar': `/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title: article.titleEn,
      description: article.excerptEn,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: ['Moteib bin Nasser AlAjmi'],
      url: `https://mindshiftarabia.com/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}
