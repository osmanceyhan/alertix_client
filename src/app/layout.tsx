import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alertix.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F04E23",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alertix - Gerçek İndirimleri Anında Yakala | Flaş İndirim Bildirimleri",
    template: "%s | Alertix",
  },
  description:
    "Alertix ile gerçek ürün indirimlerini anında öğren. Moda, elektronik, kozmetik ve daha fazla kategoride flaş indirimleri takip et. Fiyat geçmişi analizi ile sahte indirimlerden korun.",
  keywords: [
    "indirim", "flaş indirim", "ürün indirimleri", "gerçek indirim",
    "indirim bildirimi", "fırsat takibi", "fiyat takibi",
    "moda indirimleri", "elektronik indirimleri", "kozmetik indirimleri",
    "alışveriş fırsatları", "kampanya", "kupon", "deal", "flash sale",
    "price tracker", "discount alert", "alertix",
  ],
  authors: [{ name: "Alertix" }],
  creator: "Alertix",
  publisher: "Alertix",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "Alertix",
    title: "Alertix - Gerçek İndirimleri Anında Yakala",
    description: "Flaş indirimleri kaçırma! Alertix ile kişiselleştirilmiş indirim bildirimleri al, fiyat geçmişini takip et.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Alertix - Flaş İndirim Bildirimleri" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alertix - Gerçek İndirimleri Anında Yakala",
    description: "Flaş indirimleri kaçırma! Kişiselleştirilmiş indirim bildirimleri al.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "tr-TR": SITE_URL, "en-US": `${SITE_URL}/en` },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Alertix",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [],
        description: "Kişiselleştirilmiş flaş indirim bildirimleri ile akıllı alışveriş platformu.",
      },
      {
        "@type": "WebApplication",
        name: "Alertix",
        url: SITE_URL,
        applicationCategory: "ShoppingApplication",
        operatingSystem: "iOS, Android",
        offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
        description: "Gerçek ürün indirimlerini anında bildirim olarak al. Fiyat geçmişi analizi ile sahte indirimleri ayır.",
      },
      {
        "@type": "WebSite",
        name: "Alertix",
        url: SITE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
