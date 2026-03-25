"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Bell, X } from "lucide-react";
import { getDeals, createDeal, updateDeal, deleteDeal, sendDealNotification } from "@/lib/api";

const CATEGORIES = [
  { slug: "moda-giyim", name: "Moda & Giyim" },
  { slug: "elektronik-teknoloji", name: "Elektronik & Teknoloji" },
  { slug: "ev-yasam", name: "Ev & Yaşam" },
  { slug: "guzellik-kozmetik", name: "Güzellik & Kozmetik" },
  { slug: "spor-outdoor", name: "Spor & Outdoor" },
  { slug: "aksesuar-canta", name: "Aksesuar & Çanta" },
];

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editDeal, setEditDeal] = useState<any>(null);
  const [sendingNotification, setSendingNotification] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDeals = async (p = 1) => {
    setLoading(true);
    try {
      const res = await getDeals(p);
      setDeals(res.data);
      setTotalPages(res.pagination.pages);
      setPage(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu fırsatı silmek istediğinize emin misiniz?")) return;
    try {
      await deleteDeal(id);
      fetchDeals(page);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (formData: FormData) => {
    try {
      if (editDeal) {
        await updateDeal(editDeal._id, formData);
      } else {
        await createDeal(formData);
      }
      setShowModal(false);
      setEditDeal(null);
      fetchDeals(page);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendNotification = async (deal: any) => {
    if (!confirm(`"${deal.title}" için bildirim göndermek istediğinize emin misiniz?`)) return;
    setSendingNotification(deal._id);
    try {
      await sendDealNotification({ dealId: deal._id });
      alert("Bildirim başarıyla gönderildi!");
    } catch (e) {
      console.error(e);
      alert("Bildirim gönderilirken hata oluştu.");
    } finally {
      setSendingNotification(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Fırsatlar</h1>
        <button
          onClick={() => {
            setEditDeal(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          <Plus className="w-4 h-4" />
          Yeni Fırsat
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Ürün
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Kategori
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    İndirim
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Fiyat
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Bitiş
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr
                    key={deal._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {deal.imageUrl && (
                          <img
                            src={deal.imageUrl}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {deal.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {deal.brand} - {deal.store}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {CATEGORIES.find((c) => c.slug === deal.category)?.name ||
                        deal.category}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-lg">
                        %{deal.discountPercent}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="line-through text-gray-400 mr-2">
                        {deal.originalPrice}₺
                      </span>
                      <span className="font-bold text-gray-900">
                        {deal.discountedPrice}₺
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(deal.expiresAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditDeal(deal);
                            setShowModal(true);
                          }}
                          className="text-gray-400 hover:text-blue-500 transition"
                          title="Düzenle"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSendNotification(deal)}
                          disabled={sendingNotification === deal._id}
                          className="text-gray-400 hover:text-orange-500 transition disabled:opacity-50"
                          title="Bildirim Gönder"
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(deal._id)}
                          className="text-gray-400 hover:text-red-500 transition"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex gap-2 mt-4 justify-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => fetchDeals(i + 1)}
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

      {/* Create / Edit Modal */}
      {showModal && (
        <DealModal
          deal={editDeal}
          onClose={() => {
            setShowModal(false);
            setEditDeal(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function DealModal({
  deal,
  onClose,
  onSave,
}: {
  deal: any;
  onClose: () => void;
  onSave: (formData: FormData) => void;
}) {
  const [form, setForm] = useState({
    title: deal?.title || "",
    description: deal?.description || "",
    brand: deal?.brand || "",
    store: deal?.store || "",
    category: deal?.category || "moda-giyim",
    originalPrice: deal?.originalPrice?.toString() || "",
    discountedPrice: deal?.discountedPrice?.toString() || "",
    externalUrl: deal?.externalUrl || "",
    expiresAt: deal?.expiresAt ? new Date(deal.expiresAt).toISOString().slice(0, 16) : "",
    imageUrl: deal?.imageUrl || "",
    periodLowPrice: deal?.periodLowPrice?.toString() || "",
    periodHighPrice: deal?.periodHighPrice?.toString() || "",
    currentPriceOverride: deal?.currentPriceOverride?.toString() || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });
    if (imageFile) formData.append("image", imageFile);
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {deal ? "Fırsatı Düzenle" : "Yeni Fırsat"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Ürün Adı"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            placeholder="Marka"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            placeholder="Mağaza"
            value={form.store}
            onChange={(e) => setForm({ ...form, store: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Eski Fiyat (₺)"
              value={form.originalPrice}
              onChange={(e) =>
                setForm({ ...form, originalPrice: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="number"
              placeholder="Yeni Fiyat (₺)"
              value={form.discountedPrice}
              onChange={(e) =>
                setForm({ ...form, discountedPrice: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <input
            type="url"
            placeholder="Ürün Linki"
            value={form.externalUrl}
            onChange={(e) =>
              setForm({ ...form, externalUrl: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="datetime-local"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Görsel (dosya veya URL)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full text-sm"
            />
            <input
              placeholder="veya Görsel URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
            />
          </div>
          {/* Fiyat Analizi Override */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Fiyat Analizi Override (opsiyonel)</p>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                placeholder="Dönem En Düşük"
                value={form.periodLowPrice}
                onChange={(e) => setForm({ ...form, periodLowPrice: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <input
                type="number"
                placeholder="Dönem En Yüksek"
                value={form.periodHighPrice}
                onChange={(e) => setForm({ ...form, periodHighPrice: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <input
                type="number"
                placeholder="Şu Anki Fiyat"
                value={form.currentPriceOverride}
                onChange={(e) => setForm({ ...form, currentPriceOverride: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Boş bırakılırsa fiyat geçmişinden hesaplanır</p>
          </div>
          <textarea
            placeholder="Açıklama (opsiyonel)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={2}
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
          >
            {deal ? "Güncelle" : "Oluştur ve Bildirim Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}
