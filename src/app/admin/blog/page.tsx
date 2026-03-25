"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { getAllBlogsAdmin, createBlog, updateBlog, deleteBlog } from "@/lib/api";

const BLOG_CATEGORIES = [
  { slug: "indirim-rehberi", name: "İndirim Rehberi" },
  { slug: "alisveris-ipuclari", name: "Alışveriş İpuçları" },
  { slug: "moda", name: "Moda" },
  { slug: "teknoloji", name: "Teknoloji" },
  { slug: "guzellik", name: "Güzellik" },
  { slug: "ev-yasam", name: "Ev & Yaşam" },
  { slug: "genel", name: "Genel" },
];

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editBlog, setEditBlog] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (p = 1) => {
    setLoading(true);
    try {
      const res = await getAllBlogsAdmin(p);
      setBlogs(res.data);
      setTotalPages(res.pagination.pages);
      setPage(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return;
    try {
      await deleteBlog(id);
      fetchBlogs(page);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editBlog) {
        await updateBlog(editBlog._id, data);
      } else {
        await createBlog(data);
      }
      setShowEditor(false);
      setEditBlog(null);
      fetchBlogs(1);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Blog Yazıları</h1>
        <button
          onClick={() => { setEditBlog(null); setShowEditor(true); }}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          <Plus className="w-4 h-4" />
          Yeni Yazı
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-lg">Henüz blog yazısı yok</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    {blog.featuredImage && (
                      <img src={blog.featuredImage} alt="" className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 truncate">{blog.title}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {blog.status === "published" ? "Yayında" : "Taslak"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{blog.excerpt || blog.metaDescription}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>/{blog.slug}</span>
                        {blog.category && (
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {BLOG_CATEGORIES.find(c => c.slug === blog.category)?.name || blog.category}
                          </span>
                        )}
                        {blog.viewCount > 0 && <span>{blog.viewCount} görüntülenme</span>}
                        <span>{new Date(blog.createdAt).toLocaleDateString("tr-TR")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {blog.status === "published" && (
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        className="text-gray-400 hover:text-blue-500 transition"
                        title="Görüntüle"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => { setEditBlog(blog); setShowEditor(true); }}
                      className="text-gray-400 hover:text-blue-500 transition"
                      title="Düzenle"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-gray-400 hover:text-red-500 transition"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex gap-2 mt-4 justify-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => fetchBlogs(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    page === i + 1
                      ? "bg-orange-500 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {showEditor && (
        <BlogEditor
          blog={editBlog}
          onClose={() => { setShowEditor(false); setEditBlog(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function BlogEditor({ blog, onClose, onSave }: { blog: any; onClose: () => void; onSave: (data: any) => void }) {
  const [form, setForm] = useState({
    title: blog?.title || "",
    slug: blog?.slug || "",
    content: blog?.content || "",
    excerpt: blog?.excerpt || "",
    featuredImage: blog?.featuredImage || "",
    metaTitle: blog?.metaTitle || "",
    metaDescription: blog?.metaDescription || "",
    metaKeywords: blog?.metaKeywords?.join(", ") || "",
    tags: blog?.tags?.join(", ") || "",
    category: blog?.category || "genel",
    author: blog?.author || "Alertix",
    status: blog?.status || "draft",
  });

  const [activeTab, setActiveTab] = useState<"content" | "seo" | "settings">("content");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      metaKeywords: form.metaKeywords.split(",").map((k: string) => k.trim()).filter(Boolean),
      tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
    });
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ş/g, "s")
      .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const autoSlug = () => {
    if (!form.slug || form.slug === slugify(blog?.title || "")) {
      setForm({ ...form, slug: slugify(form.title) });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {blog ? "Yazıyı Düzenle" : "Yeni Blog Yazısı"}
          </h2>
          <div className="flex items-center gap-3">
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayınla</option>
            </select>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-3 border-b border-gray-100">
          {(["content", "seo", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
                activeTab === tab
                  ? "bg-orange-50 text-orange-600 border-b-2 border-orange-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {{ content: "İçerik", seo: "SEO", settings: "Ayarlar" }[tab]}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          {activeTab === "content" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  onBlur={autoSlug}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg font-semibold"
                  placeholder="Blog yazısı başlığı"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                  <span className="text-gray-400 font-normal ml-1">(/blog/{form.slug || "..."})</span>
                </label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                  placeholder="otomatik-olusturulur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Özet (excerpt)</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={2}
                  placeholder="Blog yazısının kısa özeti (liste görünümünde ve meta description olarak kullanılır)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Öne Çıkan Görsel URL</label>
                <input
                  value={form.featuredImage}
                  onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://..."
                />
                {form.featuredImage && (
                  <img src={form.featuredImage} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İçerik (HTML)
                  <span className="text-gray-400 font-normal ml-1">HTML etiketleri kullanabilirsiniz</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                  rows={16}
                  placeholder="<h2>Alt Başlık</h2>\n<p>İçerik paragrafı...</p>"
                  required
                />
              </div>

              {/* Content Preview */}
              {form.content && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Önizleme</label>
                  <div
                    className="border border-gray-200 rounded-xl p-6 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: form.content }}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-4">
              <div className="bg-orange-50 rounded-xl p-4 text-sm text-orange-800">
                SEO alanları boş bırakılırsa, başlık ve özet otomatik olarak kullanılır.
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Title
                  <span className="text-gray-400 font-normal ml-1">({form.metaTitle.length || form.title.length}/60)</span>
                </label>
                <input
                  value={form.metaTitle}
                  onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={form.title || "SEO başlığı (60 karakter önerilir)"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description
                  <span className="text-gray-400 font-normal ml-1">({form.metaDescription.length || form.excerpt.length}/160)</span>
                </label>
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={2}
                  placeholder={form.excerpt || "SEO açıklaması (160 karakter önerilir)"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords (virgülle ayırın)</label>
                <input
                  value={form.metaKeywords}
                  onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="indirim, flaş indirim, moda indirimleri"
                />
              </div>

              {/* SEO Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Önizleme</label>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-blue-600 text-lg font-medium truncate">
                    {form.metaTitle || form.title || "Sayfa Başlığı"} | Alertix
                  </p>
                  <p className="text-green-700 text-sm">alertix.com/blog/{form.slug || "..."}</p>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {form.metaDescription || form.excerpt || "Sayfa açıklaması burada görünecek..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Yazar</label>
                  <input
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etiketler (virgülle ayırın)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="indirim, moda, teknoloji"
                />
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit as any}
            className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            {blog ? "Güncelle" : "Oluştur"}
          </button>
        </div>
      </div>
    </div>
  );
}
