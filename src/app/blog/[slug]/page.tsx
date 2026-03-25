"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Bell, Calendar, Clock, Tag, ArrowLeft, Link2 } from "lucide-react";
import { getBlogBySlug } from "@/lib/api";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getBlogBySlug(slug)
      .then((res) => {
        setBlog(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.excerpt || "",
        image: blog.featuredImage || "",
        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt || blog.publishedAt,
        author: {
          "@type": "Organization",
          name: blog.author || "Alertix",
        },
        publisher: {
          "@type": "Organization",
          name: "Alertix",
          logo: {
            "@type": "ImageObject",
            url: "https://alertix.app/favicon.ico",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://alertix.app/blog/${slug}`,
        },
      }
    : null;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Dynamic head */}
      {blog && (
        <head>
          <title>{blog.title} | Alertix Blog</title>
          <meta name="description" content={blog.excerpt || ""} />
        </head>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0B]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#F04E23] rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">alertix</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/blog" className="text-sm text-gray-400 hover:text-white transition">Blog</a>
            <a href="/contact" className="text-sm text-gray-400 hover:text-white transition">İletişim</a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">Ana Sayfa</a>
              </li>
              <li>/</li>
              <li>
                <a href="/blog" className="hover:text-white transition">Blog</a>
              </li>
              <li>/</li>
              <li className="text-white truncate max-w-[200px]">{blog?.title || "..."}</li>
            </ol>
          </nav>

          {loading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
              <div className="h-64 bg-white/10 rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            </div>
          ) : error || !blog ? (
            <div className="text-center py-24">
              <h2 className="text-2xl font-semibold mb-2">Yazı bulunamadı</h2>
              <p className="text-gray-400 mb-6">
                Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.
              </p>
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F04E23] hover:bg-[#D4431E] text-white font-semibold rounded-xl transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Blog&apos;a Dön
              </a>
            </div>
          ) : (
            <article>
              {/* Header */}
              <header className="mb-8">
                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#F04E23]/10 text-[#F04E23] border border-[#F04E23]/20"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{blog.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  {blog.author && (
                    <span className="font-medium text-white">{blog.author}</span>
                  )}
                  {blog.publishedAt && (
                    <time
                      dateTime={blog.publishedAt}
                      className="flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(blog.publishedAt).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  )}
                  {blog.readTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime} dk okuma
                    </span>
                  )}
                </div>
              </header>

              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="mb-10 rounded-2xl overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-semibold prose-headings:text-white
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-[#F04E23] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-li:text-gray-300
                  prose-img:rounded-xl
                  prose-blockquote:border-[#F04E23] prose-blockquote:text-gray-400"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Footer */}
              <footer className="mt-12 pt-8 border-t border-white/10">
                {/* Share Buttons */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <a
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Tüm Yazılar
                  </a>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 mr-1">Paylaş:</span>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition"
                      aria-label="Twitter'da paylaş"
                    >
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition"
                      aria-label="LinkedIn'de paylaş"
                    >
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <button
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(shareUrl);
                        }
                      }}
                      className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition"
                      aria-label="Linki kopyala"
                    >
                      <Link2 className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Related Posts Placeholder */}
                <div className="mt-16">
                  <h2 className="text-2xl font-semibold mb-6">İlgili Yazılar</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-gray-500 text-sm">
                        İlgili yazılar yakında burada görünecek.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-gray-500 text-sm">
                        İlgili yazılar yakında burada görünecek.
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </article>
          )}
        </div>
      </main>

      {/* Site Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Alertix. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition">
              Gizlilik Politikası
            </a>
            <a href="/terms" className="text-sm text-gray-400 hover:text-white transition">
              Kullanım Şartları
            </a>
            <a href="/contact" className="text-sm text-gray-400 hover:text-white transition">
              İletişim
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
