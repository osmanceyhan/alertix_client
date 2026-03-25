export const translations = {
  tr: {
    nav: {
      features: "Özellikler",
      howItWorks: "Nasıl Çalışır",
      download: "İndir",
      admin: "Yönetim",
    },
    hero: {
      badge: "Akıllı fırsat takibi",
      title1: "Gerçek indirimleri",
      title2: "anında yakala",
      subtitle:
        "Flaş indirimleri anında bildirim olarak al. Fiyat geçmişiyle sahte indirimleri ayır, gerçek fırsatları yakala.",
      cta: "Uygulamayı İndir",
      ctaSub: "iOS ve Android'de ücretsiz",
    },
    stats: {
      brands: "Marka",
      deals: "Fırsat",
      users: "Kullanıcı",
      tracking: "Takip",
    },
    features: {
      label: "Özellikler",
      title: "Her şey kontrol altında",
      subtitle: "Akıllı fırsat takibi ile alışverişte bir adım önde ol",
      items: [
        {
          title: "Anlık Bildirimler",
          desc: "Flaş indirimler başladığı anda push bildirim al. Hiçbir fırsatı kaçırma.",
        },
        {
          title: "Fiyat Takibi",
          desc: "Fiyat geçmişini analiz et. Gerçek indirimi gör, sahte indirime kanma.",
        },
        {
          title: "Kişiselleştirilmiş",
          desc: "İlgilendiğin kategorileri seç, sadece sana uygun fırsatları keşfet.",
        },
        {
          title: "Gizlilik Öncelikli",
          desc: "Kayıt, şifre yok. Dilersen bilgini ekle, dilersen tamamen anonim kal.",
        },
      ],
    },
    howItWorks: {
      label: "Nasıl Çalışır",
      title: "4 adımda başla",
      steps: [
        { title: "İndir", desc: "App Store veya Google Play'den indir." },
        { title: "Tercihlerini Belirle", desc: "Kategorilerini ve yaş aralığını seç." },
        { title: "Fırsatları Keşfet", desc: "Sana özel indirimleri anında görüntüle." },
        { title: "Bildirim Al", desc: "Yeni fırsatlar eklendiğinde anında haberdar ol." },
      ],
    },
    cta: {
      title: "Fırsatları kaçırmayı bırak",
      subtitle: "Hemen indir, 30 saniyede tercihlerini belirle ve kazanmaya başla.",
      button: "Hemen İndir",
      free: "Ücretsiz",
      noSignup: "Kayıt gerektirmez",
      instant: "Anında başla",
    },
    footer: {
      desc: "Kişiselleştirilmiş flaş indirim bildirimleri ile akıllı alışveriş.",
      product: "Ürün",
      legal: "Yasal",
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Şartları",
      rights: "Tüm hakları saklıdır.",
    },
  },
  en: {
    nav: {
      features: "Features",
      howItWorks: "How It Works",
      download: "Download",
      admin: "Admin",
    },
    hero: {
      badge: "Smart deal tracking",
      title1: "Catch real deals",
      title2: "instantly",
      subtitle:
        "Get flash deals as instant notifications. Track price history to spot fake discounts and grab genuine bargains.",
      cta: "Download App",
      ctaSub: "Free on iOS & Android",
    },
    stats: {
      brands: "Brands",
      deals: "Deals",
      users: "Users",
      tracking: "Tracking",
    },
    features: {
      label: "Features",
      title: "Everything under control",
      subtitle: "Stay one step ahead in shopping with smart deal tracking",
      items: [
        {
          title: "Instant Notifications",
          desc: "Get push notifications the moment flash deals go live. Never miss an opportunity.",
        },
        {
          title: "Price Tracking",
          desc: "Analyze price history. See real discounts, avoid fake markdowns.",
        },
        {
          title: "Personalized",
          desc: "Select your categories, discover only the deals that match your interests.",
        },
        {
          title: "Privacy First",
          desc: "No signup, no password. Add your info if you want, or stay completely anonymous.",
        },
      ],
    },
    howItWorks: {
      label: "How It Works",
      title: "Start in 4 steps",
      steps: [
        { title: "Download", desc: "Get it from App Store or Google Play." },
        { title: "Set Preferences", desc: "Choose your categories and age range." },
        { title: "Explore Deals", desc: "View personalized deals instantly." },
        { title: "Get Notified", desc: "Receive alerts when new deals drop." },
      ],
    },
    cta: {
      title: "Stop missing out on deals",
      subtitle: "Download now, set preferences in 30 seconds, and start saving.",
      button: "Download Now",
      free: "Free",
      noSignup: "No signup required",
      instant: "Start instantly",
    },
    footer: {
      desc: "Smart shopping with personalized flash deal notifications.",
      product: "Product",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type Translations = (typeof translations)[Locale];
