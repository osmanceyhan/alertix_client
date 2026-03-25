"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCat, setEditCat] = useState<any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (editCat) {
        await updateCategory(editCat._id, data);
      } else {
        await createCategory(data);
      }
      setShowModal(false);
      setEditCat(null);
      fetchCategories();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Kategoriler</h1>
        <button
          onClick={() => {
            setEditCat(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          <Plus className="w-4 h-4" />
          Yeni Kategori
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-2xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <p className="font-bold text-gray-900">{cat.name}</p>
                    <p className="text-xs text-gray-400">{cat.slug}</p>
                  </div>
                </div>
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                    cat.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {cat.isActive ? "Aktif" : "Pasif"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditCat(cat);
                      setShowModal(true);
                    }}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CategoryModal
          category={editCat}
          onClose={() => {
            setShowModal(false);
            setEditCat(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function CategoryModal({
  category,
  onClose,
  onSave,
}: {
  category: any;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({
    slug: category?.slug || "",
    name: category?.name || "",
    icon: category?.icon || "",
    color: category?.color || "#FF6B35",
    isActive: category?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {category ? "Kategori Düzenle" : "Yeni Kategori"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Slug (ör: moda-giyim)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            placeholder="İsim"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Icon (emoji)"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="w-full h-12 rounded-xl border border-gray-200 cursor-pointer"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="rounded"
            />
            Aktif
          </label>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
          >
            Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}
