const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
    }
    throw new Error("Oturum süresi doldu");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Bir hata oluştu");
  }

  return res.json();
}

// Auth
export const adminLogin = (email: string, password: string) =>
  request<{ success: boolean; token: string }>("/api/auth/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

// Stats
export const getStats = () =>
  request<{
    success: boolean;
    data: {
      totalUsers: number;
      activeDeals: number;
      todayNotifications: number;
      totalNotifications: number;
    };
  }>("/api/stats");

// Deals
export const getDeals = (page = 1, limit = 20) =>
  request<{
    success: boolean;
    data: any[];
    pagination: { page: number; limit: number; total: number; pages: number };
  }>(`/api/deals/admin?page=${page}&limit=${limit}`);

export const createDeal = (formData: FormData) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  return fetch(`${API_BASE}/api/deals`, {
    method: "POST",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  }).then((r) => r.json());
};

export const updateDeal = (id: string, formData: FormData) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  return fetch(`${API_BASE}/api/deals/${id}`, {
    method: "PUT",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  }).then((r) => r.json());
};

export const deleteDeal = (id: string) =>
  request<{ success: boolean }>(`/api/deals/${id}`, { method: "DELETE" });

// Users
export const getUsers = (page = 1, limit = 20) =>
  request<{
    success: boolean;
    data: any[];
    pagination: { page: number; limit: number; total: number; pages: number };
  }>(`/api/me/all?page=${page}&limit=${limit}`);

// Categories
export const getCategories = () =>
  request<{ success: boolean; data: any[] }>("/api/categories/all");

export const createCategory = (data: any) =>
  request<{ success: boolean; data: any }>("/api/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCategory = (id: string, data: any) =>
  request<{ success: boolean; data: any }>(`/api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteCategory = (id: string) =>
  request<{ success: boolean }>(`/api/categories/${id}`, { method: "DELETE" });

// Notifications
export const getNotifications = (page = 1, limit = 20) =>
  request<{
    success: boolean;
    data: any[];
    pagination: { page: number; limit: number; total: number; pages: number };
  }>(`/api/notifications?page=${page}&limit=${limit}`);

export const sendDealNotification = (data: { dealId: string; title?: string; body?: string }) =>
  request<{ success: boolean; sentTo: number }>("/api/notifications/deal", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const sendUserNotification = (data: {
  userIds?: string[];
  title: string;
  body: string;
  dealId?: string;
}) =>
  request<{ success: boolean; sentTo: number }>("/api/notifications/user", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Blog
export const getPublishedBlogs = (page = 1, limit = 10, tag?: string, category?: string) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (tag) params.set("tag", tag);
  if (category) params.set("category", category);
  return request<{
    success: boolean;
    data: any[];
    pagination: { page: number; limit: number; total: number; pages: number };
  }>(`/api/blog?${params.toString()}`);
};

export const getBlogBySlug = (slug: string) =>
  request<{ success: boolean; data: any }>(`/api/blog/${slug}`);

export const getAllBlogsAdmin = (page = 1, limit = 20) =>
  request<{
    success: boolean;
    data: any[];
    pagination: { page: number; limit: number; total: number; pages: number };
  }>(`/api/blog/admin/all?page=${page}&limit=${limit}`);

export const createBlog = (data: any) =>
  request<{ success: boolean; data: any }>("/api/blog", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateBlog = (id: string, data: any) =>
  request<{ success: boolean; data: any }>(`/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteBlog = (id: string) =>
  request<{ success: boolean }>(`/api/blog/${id}`, { method: "DELETE" });
