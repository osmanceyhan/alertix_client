import type { Metadata } from "next";
import { Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Alertix",
  description:
    "Alertix mobil alışveriş uygulaması gizlilik politikası. Kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu öğrenin.",
};

export default function PrivacyPage() {
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Gizlilik Politikası</h1>
          <p className="text-gray-400 mb-12">
            Son güncelleme: 25 Mart 2026
          </p>

          <div className="space-y-12">
            {/* Giriş */}
            <section>
              <p className="text-gray-300 leading-relaxed">
                Alertix olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik
                politikası, mobil uygulamamız ve web sitemiz aracılığıyla toplanan kişisel verilerin
                nasıl işlendiğini açıklamaktadır.
              </p>
            </section>

            {/* Veri Toplama */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Veri Toplama</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Alertix, hizmetlerimizi sunabilmek için aşağıdaki verileri toplayabilir:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Ad, soyad ve e-posta adresi (hesap oluşturma sırasında)</li>
                <li>Cihaz bilgileri (işletim sistemi, cihaz modeli, uygulama sürümü)</li>
                <li>Bildirim tercihleri ve takip edilen kategoriler</li>
                <li>Uygulama kullanım verileri ve etkileşim istatistikleri</li>
                <li>Push bildirim tokenleri</li>
              </ul>
            </section>

            {/* Veri Kullanımı */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Veri Kullanımı</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Kişiselleştirilmiş indirim bildirimleri göndermek</li>
                <li>Kullanıcı deneyimini iyileştirmek ve uygulama performansını optimize etmek</li>
                <li>Hesap güvenliğini sağlamak</li>
                <li>Yasal yükümlülükleri yerine getirmek</li>
                <li>İstatistiksel analizler yaparak hizmet kalitesini artırmak</li>
              </ul>
            </section>

            {/* Çerezler */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Çerezler</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Web sitemizde çerezler kullanılmaktadır. Çerezler, tarayıcınızda saklanan küçük
                metin dosyalarıdır ve aşağıdaki amaçlarla kullanılır:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Oturum yönetimi ve kimlik doğrulama</li>
                <li>Kullanıcı tercihlerinin hatırlanması</li>
                <li>Web sitesi trafiğinin analiz edilmesi</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda
                bazı özellikler düzgün çalışmayabilir.
              </p>
            </section>

            {/* Üçüncü Taraflar */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Üçüncü Taraflar</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Alertix, hizmet kalitesini artırmak için aşağıdaki üçüncü taraf hizmetlerini
                kullanabilir:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>
                  <strong>Firebase Cloud Messaging:</strong> Push bildirimlerinin gönderilmesi
                </li>
                <li>
                  <strong>Google Analytics:</strong> Uygulama kullanım istatistiklerinin toplanması
                </li>
                <li>
                  <strong>Hosting sağlayıcıları:</strong> Verilerinizin güvenli sunucularda
                  barındırılması
                </li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Kişisel verileriniz, pazarlama amacıyla üçüncü taraflarla paylaşılmaz veya
                satılmaz.
              </p>
            </section>

            {/* Güvenlik */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Güvenlik</h2>
              <p className="text-gray-300 leading-relaxed">
                Verilerinizin güvenliği bizim için en önemli önceliktir. SSL/TLS şifreleme, güvenli
                veri tabanı erişimi, düzenli güvenlik denetimleri ve erişim kontrolü gibi endüstri
                standardı güvenlik önlemleri uygulamaktayız. Ancak, internet üzerinden hiçbir veri
                iletim yöntemi veya elektronik depolama yöntemi %100 güvenli değildir.
              </p>
            </section>

            {/* Haklarınız */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Haklarınız</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Kişisel verilerinizin düzeltilmesini veya silinmesini isteme</li>
                <li>Kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                <li>Hesabınızı ve tüm verilerinizi silme talebinde bulunma</li>
              </ul>
            </section>

            {/* İletişim */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. İletişim</h2>
              <p className="text-gray-300 leading-relaxed">
                Gizlilik politikamız hakkında sorularınız veya talepleriniz için bizimle iletişime
                geçebilirsiniz:
              </p>
              <div className="mt-4 p-6 rounded-xl bg-white/5 border border-white/10">
                <p className="text-gray-300">
                  <strong className="text-white">E-posta:</strong>{" "}
                  <a href="mailto:info@alertix.app" className="text-[#F04E23] hover:underline">
                    info@alertix.app
                  </a>
                </p>
                <p className="text-gray-300 mt-2">
                  <strong className="text-white">Web:</strong>{" "}
                  <a href="/contact" className="text-[#F04E23] hover:underline">
                    İletişim Formu
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Alertix. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <a href="/terms" className="text-sm text-gray-400 hover:text-white transition">
              Kullanım Şartları
            </a>
            <a href="/contact" className="text-sm text-gray-400 hover:text-white transition">
              İletişim
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
