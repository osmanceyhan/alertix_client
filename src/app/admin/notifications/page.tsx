"use client";

import { useEffect, useState } from "react";
import { Bell, Send, X } from "lucide-react";
import {
  getNotifications,
  getDeals,
  getUsers,
  sendDealNotification,
  sendUserNotification,
} from "@/lib/api";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState<"deal" | "user" | null>(null);

  const fetchNotifications = async (p = 1) => {
    setLoading(true);
    try {
      const res = await getNotifications(p);
      setNotifications(res.data);
      setTotalPages(res.pagination.pages);
      setPage(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Bildirimler</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal("deal")}
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-600 transition text-sm"
          >
            <Bell className="w-4 h-4" />
            Ürün Bildirimi
          </button>
          <button
            onClick={() => setShowModal("user")}
            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-600 transition text-sm"
          >
            <Send className="w-4 h-4" />
            Kullanıcı Bildirimi
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-lg">Henüz bildirim gönderilmemiş</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif._id} className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{notif.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{notif.body}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-lg">
                      {notif.sentTo} kullanıcı
                    </span>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notif.sentAt).toLocaleString("tr-TR")}
                    </p>
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
                  onClick={() => fetchNotifications(i + 1)}
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

      {showModal === "deal" && (
        <DealNotificationModal
          onClose={() => setShowModal(null)}
          onSent={() => { setShowModal(null); fetchNotifications(1); }}
        />
      )}
      {showModal === "user" && (
        <UserNotificationModal
          onClose={() => setShowModal(null)}
          onSent={() => { setShowModal(null); fetchNotifications(1); }}
        />
      )}
    </div>
  );
}

function DealNotificationModal({ onClose, onSent }: { onClose: () => void; onSent: () => void }) {
  const [deals, setDeals] = useState<any[]>([]);
  const [selectedDeal, setSelectedDeal] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    getDeals(1, 50).then((res) => setDeals(res.data));
  }, []);

  const handleSend = async () => {
    if (!selectedDeal) return;
    setSending(true);
    try {
      const res = await sendDealNotification({
        dealId: selectedDeal,
        title: title || undefined,
        body: body || undefined,
      });
      setResult(`${res.sentTo} kullanıcıya gönderildi`);
      setTimeout(onSent, 1500);
    } catch (e: any) {
      setResult("Hata: " + e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Ürün Bazlı Bildirim</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {result && (
          <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-4">{result}</div>
        )}

        <div className="space-y-4">
          <select
            value={selectedDeal}
            onChange={(e) => setSelectedDeal(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Ürün seçin...</option>
            {deals.map((d) => (
              <option key={d._id} value={d._id}>
                {d.brand} - {d.title} (%{d.discountPercent})
              </option>
            ))}
          </select>
          <input
            placeholder="Başlık (opsiyonel - otomatik oluşturulur)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            placeholder="Mesaj (opsiyonel - otomatik oluşturulur)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={2}
          />
          <p className="text-xs text-gray-400">
            Bu ürünün kategorisini seçen tüm kullanıcılara bildirim gönderilecek.
          </p>
          <button
            onClick={handleSend}
            disabled={!selectedDeal || sending}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {sending ? "Gönderiliyor..." : "Bildirim Gönder"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UserNotificationModal({ onClose, onSent }: { onClose: () => void; onSent: () => void }) {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [sendToAll, setSendToAll] = useState(true);

  useEffect(() => {
    getUsers(1, 100).then((res) => setUsers(res.data));
  }, []);

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const handleSend = async () => {
    if (!title || !body) return;
    setSending(true);
    try {
      const res = await sendUserNotification({
        userIds: sendToAll ? undefined : selectedUsers,
        title,
        body,
      });
      setResult(`${res.sentTo} kullanıcıya gönderildi`);
      setTimeout(onSent, 1500);
    } catch (e: any) {
      setResult("Hata: " + e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Kullanıcı Bildirimi</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {result && (
          <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-4">{result}</div>
        )}

        <div className="space-y-4">
          <input
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Mesaj"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            required
          />

          <div>
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={sendToAll}
                onChange={(e) => setSendToAll(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">Tüm kullanıcılara gönder</span>
            </label>

            {!sendToAll && (
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-3 space-y-2">
                {users.map((user) => (
                  <label
                    key={user._id}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleUser(user._id)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 font-mono">
                      {user.deviceId?.slice(0, 20)}...
                    </span>
                    <span className="text-xs text-gray-400">
                      {user.categories?.length} kategori
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSend}
            disabled={!title || !body || sending}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {sending ? "Gönderiliyor..." : "Bildirim Gönder"}
          </button>
        </div>
      </div>
    </div>
  );
}
