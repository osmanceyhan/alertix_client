import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alertix.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.alertix.co";

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  // Blog yazılarını çek
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${apiUrl}/api/blog?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      blogPages = data.data.map((post: any) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // API unavailable
  }

  return [...staticPages, ...blogPages];
}
