import type { Metadata } from "next";
import { Bell, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | Alertix",
  description:
    "Alertix ekibi ile iletişime geçin. Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0B]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#F04E23] rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">alertix</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/blog" className="text-sm text-gray-400 hover:text-white transition">Blog</a>
            <a href="/contact" className="text-sm text-gray-400 hover:text-white transition">İletişim</a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">İletişim</h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın. En kısa sürede
              size dönüş yapacağız.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Adınız Soyadınız"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F04E23]/50 focus:border-[#F04E23]/50 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ornek@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F04E23]/50 focus:border-[#F04E23]/50 transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Mesajınızın konusu"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F04E23]/50 focus:border-[#F04E23]/50 transition"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Mesajınızı buraya yazın..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F04E23]/50 focus:border-[#F04E23]/50 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#F04E23] hover:bg-[#D4431E] text-white font-semibold rounded-xl transition"
                >
                  Gönder
                </button>
              </form>
            </div>

            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-6">İletişim Bilgileri</h2>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-[#F04E23]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">E-posta</h3>
                        <a href="mailto:info@alertix.app" className="text-white hover:text-[#F04E23] transition">
                          info@alertix.app
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-[#F04E23]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Telefon</h3>
                        <p className="text-white">+90 (212) 000 00 00</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-[#F04E23]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Adres</h3>
                        <p className="text-white">İstanbul, Türkiye</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Sosyal Medya</h2>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://twitter.com/alertixapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition"
                    >
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/alertixapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition"
                    >
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/company/alertix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 transition"
                    >
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Alertix. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition">
              Gizlilik Politikası
            </a>
            <a href="/terms" className="text-sm text-gray-400 hover:text-white transition">
              Kullanım Şartları
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
