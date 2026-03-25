import type { Metadata } from "next";
import {
  Bell,
  TrendingDown,
  Zap,
  Shield,
  ChevronRight,
  Check,
  Star,
  ArrowRight,
  ShoppingBag,
  Shirt,
  Smartphone as SmartphoneIcon,
  Sparkles,
  Dumbbell,
  Watch,
} from "lucide-react";
import { ParallaxWrapper, FadeInView, LangSwitcher } from "@/components/landing/HeroClient";

export const metadata: Metadata = {
  title: "Alertix - Gerçek Ürün İndirimlerini Anında Yakala | İndirim Takip Uygulaması",
  description:
    "Moda, elektronik, kozmetik, ev & yaşam kategorilerinde gerçek ürün indirimlerini anında bildirim olarak al. Fiyat geçmişi analizi ile sahte indirimleri ayır. Ücretsiz indir!",
  alternates: { canonical: "/" },
};

const categoryIcons = [Shirt, SmartphoneIcon, ShoppingBag, Sparkles, Dumbbell, Watch];

export default function LandingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Ürün indirimleri nereden takip edilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alertix uygulaması ile tüm kategorilerdeki gerçek ürün indirimlerini tek yerden takip edebilirsiniz. Moda, elektronik, kozmetik, ev & yaşam, spor ve aksesuar kategorilerinde anlık bildirimler alın.",
        },
      },
      {
        "@type": "Question",
        name: "Gerçek indirimler nasıl anlaşılır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alertix'in fiyat geçmişi analizi özelliği ile ürünlerin önceki fiyatlarını görebilir, sahte indirimleri gerçek indirimlerden ayırabilirsiniz. En az 5 fiyat noktası olan ürünlerde dönem içi en düşük ve en yüksek fiyatlar gösterilir.",
        },
      },
      {
        "@type": "Question",
        name: "Alertix ücretsiz mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evet, Alertix tamamen ücretsizdir. Kayıt gerektirmez, e-posta veya şifre sormaz. İndirin, kategorilerinizi seçin ve fırsatları yakalamaya başlayın.",
        },
      },
      {
        "@type": "Question",
        name: "Hangi kategorilerde indirim takibi yapılabilir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Moda & Giyim, Elektronik & Teknoloji, Ev & Yaşam, Güzellik & Kozmetik, Spor & Outdoor ve Aksesuar & Çanta kategorilerinde indirim takibi yapabilirsiniz.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0B]/80 backdrop-blur-2xl border-b border-white/5" role="navigation" aria-label="Ana menü">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5" aria-label="Alertix Ana Sayfa">
            <div className="w-8 h-8 bg-[#F04E23] rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">alertix</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="#ozellikler" className="text-sm text-gray-400 hover:text-white transition hidden md:block">Özellikler</a>
            <a href="#nasil-calisir" className="text-sm text-gray-400 hover:text-white transition hidden md:block">Nasıl Çalışır</a>
            <a href="#kategoriler" className="text-sm text-gray-400 hover:text-white transition hidden md:block">Kategoriler</a>
            <a href="/blog" className="text-sm text-gray-400 hover:text-white transition hidden md:block">Blog</a>
            <LangSwitcher />
            <a href="#indir" className="text-sm font-semibold bg-[#F04E23] hover:bg-[#D4411B] px-4 py-2 rounded-xl transition hidden sm:block">
              İndir
            </a>
          </div>
        </div>
      </nav>

      {/* Hero - SEO H1 + 3D background (client) */}
      <ParallaxWrapper>
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#F04E23]/10 border border-[#F04E23]/20 text-[#F04E23] px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-[#F04E23] rounded-full animate-pulse" />
            Akıllı indirim takibi
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6">
            Gerçek indirimleri
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F04E23] via-[#FF6B42] to-[#FFB299]">
              anında yakala
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed">
            <strong>Ürün indirimlerini</strong> anında bildirim olarak al.
            Fiyat geçmişi analizi ile <strong>sahte indirimleri</strong> ayır,
            <strong> gerçek fırsatları</strong> yakala. Moda, elektronik, kozmetik ve daha fazlası.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#indir"
              className="group inline-flex items-center justify-center gap-3 bg-[#F04E23] text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-[#D4411B] transition shadow-lg shadow-[#F04E23]/20"
            >
              Uygulamayı İndir
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-sm text-gray-500 self-center">iOS ve Android&apos;de ücretsiz</p>
          </div>
        </div>
      </ParallaxWrapper>

      {/* Stats */}
      <section className="py-16 border-y border-white/5 relative z-10" aria-label="İstatistikler">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Marka" },
              { value: "1.000+", label: "İndirimli Ürün" },
              { value: "10.000+", label: "Kullanıcı" },
              { value: "7/24", label: "Fırsat Takibi" },
            ].map((s, i) => (
              <FadeInView key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider font-medium">{s.label}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Özellikler - h2 */}
      <section id="ozellikler" className="py-28 relative z-10" aria-labelledby="features-title">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInView className="text-center mb-20">
            <p className="text-sm font-bold text-[#F04E23] uppercase tracking-widest mb-4">Özellikler</p>
            <h2 id="features-title" className="text-4xl md:text-6xl font-extrabold tracking-tight">
              İndirim Takibinde Yeni Nesil
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              Alertix ile ürün indirimlerini takip etmek artık çok kolay. Anlık bildirimler, fiyat geçmişi analizi ve kişiselleştirilmiş fırsat önerileri ile akıllı alışveriş yapın.
            </p>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Bell, color: "bg-orange-500/10 text-orange-500",
                title: "Anlık İndirim Bildirimleri",
                desc: "Flaş indirimler başladığı anda push bildirim al. Sana özel kategorilerdeki ürün indirimlerini ilk sen öğren.",
              },
              {
                icon: TrendingDown, color: "bg-emerald-500/10 text-emerald-500",
                title: "Fiyat Geçmişi Analizi",
                desc: "Ürünlerin geçmiş fiyatlarını detaylı grafik ile gör. Dönem içi en düşük, en yüksek fiyatları karşılaştır. Sahte indirimleri anında tespit et.",
              },
              {
                icon: Zap, color: "bg-violet-500/10 text-violet-500",
                title: "Kişiselleştirilmiş Fırsatlar",
                desc: "İlgilendiğin kategorileri seç, yaş ve cinsiyet tercihine göre sana en uygun ürün indirimlerini keşfet.",
              },
              {
                icon: Shield, color: "bg-blue-500/10 text-blue-500",
                title: "Gizlilik Öncelikli Tasarım",
                desc: "E-posta veya şifre gerektirmez. İstersen bilgilerini ekle, istersen tamamen anonim kullan. Verilerin cihazında kalır.",
              },
            ].map((f, i) => (
              <FadeInView key={i} delay={i * 0.1}>
                <article className="group bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.color.split(" ")[0]}`}>
                    <f.icon className={`w-7 h-7 ${f.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                </article>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - SEO keyword section */}
      <section id="kategoriler" className="py-24 relative z-10 border-y border-white/5" aria-labelledby="categories-title">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInView className="text-center mb-16">
            <p className="text-sm font-bold text-[#F04E23] uppercase tracking-widest mb-4">Kategoriler</p>
            <h2 id="categories-title" className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Hangi Kategorilerde İndirim Takibi Yapılır?
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              6 farklı kategoride ürün indirimlerini gerçek zamanlı takip edin
            </p>
          </FadeInView>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Moda & Giyim İndirimleri", desc: "Zara, Mango, H&M, Massimo Dutti ve daha fazla markada giyim indirimlerini takip edin.", color: "from-rose-500/20 to-rose-500/5", border: "border-rose-500/20" },
              { name: "Elektronik & Teknoloji İndirimleri", desc: "Apple, Samsung, Dyson, Sony gibi markaların teknoloji ürünlerindeki flaş indirimleri yakalayın.", color: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/20" },
              { name: "Ev & Yaşam İndirimleri", desc: "English Home, Karaca, IKEA gibi markalarda ev ürünleri indirimlerinden haberdar olun.", color: "from-teal-500/20 to-teal-500/5", border: "border-teal-500/20" },
              { name: "Güzellik & Kozmetik İndirimleri", desc: "Sephora, Dior, Estée Lauder, MAC kozmetik ürünlerinde gerçek indirimleri keşfedin.", color: "from-fuchsia-500/20 to-fuchsia-500/5", border: "border-fuchsia-500/20" },
              { name: "Spor & Outdoor İndirimleri", desc: "Nike, Adidas, Puma, Under Armour spor ürünlerinde en iyi fırsatları yakalayın.", color: "from-green-500/20 to-green-500/5", border: "border-green-500/20" },
              { name: "Aksesuar & Çanta İndirimleri", desc: "Michael Kors, Ray-Ban, Coach aksesuar ve çanta indirimlerini anında öğrenin.", color: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/20" },
            ].map((cat, i) => {
              const Icon = categoryIcons[i];
              return (
                <FadeInView key={i} delay={i * 0.08}>
                  <article className={`bg-gradient-to-b ${cat.color} border ${cat.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white/60 mb-4" />
                    <h3 className="text-lg font-bold mb-2">{cat.name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{cat.desc}</p>
                  </article>
                </FadeInView>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="nasil-calisir" className="py-28 relative z-10" aria-labelledby="how-title">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInView className="text-center mb-20">
            <p className="text-sm font-bold text-[#F04E23] uppercase tracking-widest mb-4">Nasıl Çalışır</p>
            <h2 id="how-title" className="text-4xl md:text-6xl font-extrabold tracking-tight">
              4 Adımda İndirim Takibine Başla
            </h2>
          </FadeInView>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "İndir", desc: "Alertix'i App Store veya Google Play'den ücretsiz indir." },
              { title: "Tercihlerini Belirle", desc: "İlgilendiğin kategorileri ve demografik bilgilerini seç." },
              { title: "Fırsatları Keşfet", desc: "Sana özel ürün indirimlerini görüntüle, fiyat geçmişini analiz et." },
              { title: "Bildirim Al", desc: "Yeni flaş indirimler eklendiğinde anında bildirim al." },
            ].map((step, i) => (
              <FadeInView key={i} delay={i * 0.15}>
                <div className="relative group">
                  <div className="text-7xl font-black text-white/[0.03] group-hover:text-[#F04E23]/10 transition-colors duration-500 mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  {i < 3 && <ArrowRight className="hidden md:block absolute top-10 -right-4 w-5 h-5 text-white/10" />}
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 relative z-10" aria-label="Kullanıcı yorumları">
        <div className="max-w-4xl mx-auto px-6">
          <FadeInView>
            <blockquote className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-12 text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-relaxed mb-6 text-gray-200">
                &ldquo;Artık gerçek indirimleri sahte olanlardan ayırabiliyorum. Fiyat geçmişi özelliği inanılmaz. Her alışveriş öncesi Alertix&apos;e bakıyorum.&rdquo;
              </p>
              <footer>
                <cite className="not-italic text-sm text-gray-500">App Store Kullanıcı Yorumu</cite>
              </footer>
            </blockquote>
          </FadeInView>
        </div>
      </section>

      {/* FAQ - SEO */}
      <section className="py-24 relative z-10 border-t border-white/5" aria-labelledby="faq-title">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInView className="text-center mb-16">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Sıkça Sorulan Sorular
            </h2>
          </FadeInView>

          <div className="space-y-4">
            {[
              { q: "Ürün indirimleri nereden takip edilir?", a: "Alertix uygulaması ile 6 farklı kategoride (moda, elektronik, kozmetik, ev & yaşam, spor, aksesuar) gerçek ürün indirimlerini tek yerden takip edebilirsiniz." },
              { q: "Gerçek indirimler nasıl anlaşılır?", a: "Alertix'in fiyat geçmişi analizi özelliği sayesinde ürünlerin geçmiş fiyatlarını grafikle görebilir, dönem içi en düşük ve en yüksek fiyatları karşılaştırarak sahte indirimleri tespit edebilirsiniz." },
              { q: "Alertix ücretsiz mi?", a: "Evet, Alertix tamamen ücretsizdir. Kayıt gerektirmez, e-posta veya şifre sormaz. İndirin, kategorilerinizi seçin ve hemen başlayın." },
              { q: "Hangi mağazaların indirimleri takip edilir?", a: "Zara, Mango, Nike, Adidas, Apple, Samsung, Sephora, Dior, IKEA gibi yüzlerce markanın kampanyaları ve flaş indirimleri takip edilmektedir." },
            ].map((item, i) => (
              <FadeInView key={i} delay={i * 0.05}>
                <details className="bg-white/[0.03] border border-white/[0.06] rounded-2xl group">
                  <summary className="cursor-pointer p-6 text-lg font-semibold list-none flex justify-between items-center">
                    {item.q}
                    <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="px-6 pb-6 text-gray-400 leading-relaxed">{item.a}</p>
                </details>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="indir" className="py-28 relative z-10" aria-labelledby="cta-title">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInView>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F04E23] to-[#FF6B42] p-12 md:p-20">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
              <div className="relative text-center max-w-2xl mx-auto">
                <h2 id="cta-title" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                  Ürün İndirimlerini Kaçırmayı Bırak
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  Hemen indir, 30 saniyede tercihlerini belirle ve gerçek flaş indirimleri yakalamaya başla.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <a href="#" className="inline-flex items-center justify-center gap-3 bg-white text-[#F04E23] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/90 transition shadow-xl" aria-label="App Store'dan indir">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                    App Store
                  </a>
                  <a href="#" className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition" aria-label="Google Play'den indir">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.312 1.338c.56.324.56 1.129 0 1.453l-2.312 1.338-2.534-2.534 2.534-2.534v.939zm-3.906-1.339L4.864 1.435l10.936 6.333-2.008 2z" /></svg>
                    Google Play
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Ücretsiz</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Kayıt gerektirmez</span>
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Anında başla</span>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 relative z-10" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 bg-[#F04E23] rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">alertix</span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Kişiselleştirilmiş flaş indirim bildirimleri ile akıllı alışveriş platformu.
                Gerçek ürün indirimlerini fiyat geçmişi analizi ile takip edin.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-400 mb-4">Ürün</p>
              <nav className="space-y-2" aria-label="Ürün linkleri">
                <a href="#ozellikler" className="block text-gray-500 hover:text-white transition text-sm">Özellikler</a>
                <a href="#nasil-calisir" className="block text-gray-500 hover:text-white transition text-sm">Nasıl Çalışır</a>
                <a href="#kategoriler" className="block text-gray-500 hover:text-white transition text-sm">Kategoriler</a>
                <a href="/blog" className="block text-gray-500 hover:text-white transition text-sm">Blog</a>
              </nav>
            </div>
            <div>
              <p className="font-semibold text-gray-400 mb-4">Yasal</p>
              <nav className="space-y-2" aria-label="Yasal linkleri">
                <a href="/privacy" className="block text-gray-500 hover:text-white transition text-sm">Gizlilik Politikası</a>
                <a href="/terms" className="block text-gray-500 hover:text-white transition text-sm">Kullanım Şartları</a>
                <a href="/contact" className="block text-gray-500 hover:text-white transition text-sm">İletişim</a>
              </nav>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-gray-600 text-sm">&copy; 2025 Alertix. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
