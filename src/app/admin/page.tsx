"use client";

import { useEffect, useState } from "react";
import { Users, Tag, Bell, TrendingUp } from "lucide-react";
import { getStats, getDeals } from "@/lib/api";

interface Stats {
  totalUsers: number;
  activeDeals: number;
  todayNotifications: number;
  totalNotifications: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentDeals, setRecentDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getStats(),
      getDeals(1, 5),
    ])
      .then(([statsRes, dealsRes]) => {
        setStats(statsRes.data);
        setRecentDeals(dealsRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: "Toplam Kullanıcı",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Aktif Fırsat",
      value: stats?.activeDeals ?? 0,
      icon: Tag,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Bugün Gönderilen Bildirim",
      value: stats?.todayNotifications ?? 0,
      icon: Bell,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Toplam Bildirim",
      value: stats?.totalNotifications ?? 0,
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Dashboard</h1>

      {loading ? (
        <div className="text-gray-400">Yükleniyor...</div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  {card.label}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <card.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-900">
                {card.value.toLocaleString("tr-TR")}
              </p>
            </div>
          ))}
        </div>

        {/* Son Eklenen Fırsatlar */}
        {recentDeals.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Son Eklenen Fırsatlar
            </h2>
            <div className="divide-y divide-gray-100">
              {recentDeals.map((deal: any) => (
                <div
                  key={deal._id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {deal.imageUrl && (
                      <img
                        src={deal.imageUrl}
                        alt=""
                        className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {deal.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {deal.brand} - {deal.store}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-lg">
                      %{deal.discountPercent}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {deal.discountedPrice}₺
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </>
      )}
    </div>
  );
}
