"use client";

import { useState, useEffect } from "react";
import { Bell, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { getPublishedBlogs } from "@/lib/api";

const CATEGORIES = [
  { label: "Tümü", value: "" },
  { label: "İndirim Rehberi", value: "indirim-rehberi" },
  { label: "Alışveriş İpuçları", value: "alisveris-ipuclari" },
  { label: "Teknoloji", value: "teknoloji" },
  { label: "Moda", value: "moda" },
  { label: "Haberler", value: "haberler" },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    getPublishedBlogs(page, 9, undefined, activeCategory || undefined)
      .then((res) => {
        setBlogs(res.data || []);
        setTotalPages(res.pagination?.pages || 1);
      })
      .catch(() => {
        setBlogs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, activeCategory]);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* SEO meta via head */}
      <head>
        <title>İndirim Rehberi &amp; Alışveriş İpuçları | Alertix Blog</title>
        <meta
          name="description"
          content="Ürün indirimleri, gerçek indirimler ve alışveriş rehberi hakkında en güncel bilgiler. Alertix Blog ile akıllı alışveriş yapın."
        />
        <meta
          name="keywords"
          content="ürün indirimleri, gerçek indirimler, alışveriş rehberi, indirim takip, fiyat karşılaştırma"
        />
      </head>

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
            <a href="/blog" className="text-sm text-white font-medium transition">Blog</a>
            <a href="/contact" className="text-sm text-gray-400 hover:text-white transition">İletişim</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Alertix Blog</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              İndirim rehberi, alışveriş ipuçları ve akıllı tüketici olmanın yolları. Gerçek
              indirimleri kaçırmamak için takipte kalın.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat.value
                    ? "bg-[#F04E23] text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden animate-pulse">
                  <div className="h-48 bg-white/10" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                <Bell className="w-8 h-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Henüz blog yazısı yok</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Yakında indirim rehberleri, alışveriş ipuçları ve daha fazlası burada olacak.
                Takipte kalın!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <a
                  key={blog._id || blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition"
                >
                  {blog.featuredImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F04E23]/10 text-[#F04E23] border border-[#F04E23]/20"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-lg font-semibold mb-2 group-hover:text-[#F04E23] transition line-clamp-2">
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {blog.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(blog.publishedAt).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      )}
                      {blog.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.readTime} dk okuma
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && blogs.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                    p === page
                      ? "bg-[#F04E23] text-white"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
