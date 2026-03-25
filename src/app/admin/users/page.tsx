"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/lib/api";

const GENDER_LABELS: Record<string, string> = {
  male: "Erkek",
  female: "Kadın",
  unspecified: "Belirtilmedi",
};

const CATEGORY_LABELS: Record<string, string> = {
  "moda-giyim": "Moda & Giyim",
  "elektronik-teknoloji": "Elektronik & Teknoloji",
  "ev-yasam": "Ev & Yaşam",
  "guzellik-kozmetik": "Güzellik & Kozmetik",
  "spor-outdoor": "Spor & Outdoor",
  "aksesuar-canta": "Aksesuar & Çanta",
};

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (p = 1) => {
    setLoading(true);
    try {
      const res = await getUsers(p);
      setUsers(res.data);
      setTotalPages(res.pagination.pages);
      setPage(p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Kullanıcılar
      </h1>

      {loading ? (
        <p className="text-gray-400">Yükleniyor...</p>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Device ID
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Ad Soyad
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    E-posta
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Telefon
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Cinsiyet
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Yaş
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Kategoriler
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Bildirim
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Kayıt
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {user.deviceId?.slice(0, 20)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.fullName || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.phone || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {GENDER_LABELS[user.gender] || user.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.ageRange}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.categories?.map((cat: string) => (
                          <span
                            key={cat}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                          >
                            {CATEGORY_LABELS[cat] || cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                          user.notificationsEnabled
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {user.notificationsEnabled ? "Açık" : "Kapalı"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("tr-TR")}
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
                  onClick={() => fetchUsers(i + 1)}
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
    </div>
  );
}
