import type { Metadata } from "next";
import { Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Kullanım Şartları | Alertix",
  description:
    "Alertix mobil alışveriş uygulaması kullanım şartları ve koşulları. Hizmetlerimizi kullanmadan önce lütfen bu şartları okuyunuz.",
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-4">Kullanım Şartları</h1>
          <p className="text-gray-400 mb-12">
            Son güncelleme: 25 Mart 2026
          </p>

          <div className="space-y-12">
            {/* Hizmet Tanımı */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Hizmet Tanımı</h2>
              <p className="text-gray-300 leading-relaxed">
                Alertix, kullanıcılarına çeşitli e-ticaret platformlarındaki ürün indirimlerini
                takip etme ve bildirim alma imkânı sunan bir mobil uygulamadır. Uygulama; moda,
                elektronik, kozmetik, ev &amp; yaşam, spor ve aksesuar kategorilerinde gerçek
                indirimleri tespit ederek kullanıcılarına anlık bildirimler gönderir. Fiyat geçmişi
                analizi ile sahte indirimlerin ayırt edilmesine yardımcı olur.
              </p>
            </section>

            {/* Kullanım Koşulları */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Kullanım Koşulları</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Alertix uygulamasını kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Uygulamayı yalnızca kişisel ve ticari olmayan amaçlarla kullanacağınızı</li>
                <li>Hesap bilgilerinizin doğruluğundan sorumlu olduğunuzu</li>
                <li>Uygulamayı kötüye kullanmayacağınızı veya başkalarının kullanımını engellemeyeceğinizi</li>
                <li>Otomatik veri çekme (scraping) veya bot kullanmayacağınızı</li>
                <li>18 yaşından büyük olduğunuzu veya ebeveyn/vasi onayına sahip olduğunuzu</li>
              </ul>
            </section>

            {/* Sorumluluk */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Sorumluluk</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Alertix, aşağıdaki konularda sorumluluk kabul etmez:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Üçüncü taraf e-ticaret sitelerindeki fiyat değişiklikleri veya ürün bilgilerinin doğruluğu</li>
                <li>İndirim bildirimlerinin zamanlaması veya doğruluğu konusunda oluşabilecek sapmalar</li>
                <li>Uygulama üzerinden yönlendirilen sitelerde yapılan alışverişlerden kaynaklanan sorunlar</li>
                <li>Teknik aksaklıklar, sunucu kesintileri veya bakım çalışmaları nedeniyle oluşan hizmet kesintileri</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Alertix bir fiyat karşılaştırma ve indirim bildirim hizmetidir; herhangi bir e-ticaret
                işleminin tarafı değildir.
              </p>
            </section>

            {/* Fikri Mülkiyet */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Fikri Mülkiyet</h2>
              <p className="text-gray-300 leading-relaxed">
                Alertix uygulaması, logosu, tasarımı, içeriği ve tüm ilgili materyaller telif hakkı
                ve fikri mülkiyet yasaları ile korunmaktadır. Bu materyallerin yazılı izin olmaksızın
                kopyalanması, dağıtılması, değiştirilmesi veya ticari amaçla kullanılması yasaktır.
                Kullanıcı tarafından oluşturulan içerikler (yorumlar, değerlendirmeler vb.) üzerinde
                Alertix&apos;in kullanım hakkı bulunmaktadır.
              </p>
            </section>

            {/* Hesap ve Güvenlik */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Hesap ve Güvenlik</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Hesabınızın güvenliği sizin sorumluluğunuzdadır:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Şifrenizi gizli tutmalı ve başkalarıyla paylaşmamalısınız</li>
                <li>Hesabınızda şüpheli bir aktivite fark ederseniz derhal bizimle iletişime geçmelisiniz</li>
                <li>Hesabınız üzerinden gerçekleştirilen tüm işlemlerden siz sorumlusunuz</li>
                <li>Alertix, güvenlik ihlali şüphesi durumunda hesabınızı askıya alma hakkını saklı tutar</li>
              </ul>
              <h3 className="text-xl font-semibold mt-6 mb-3">Hesap Silme</h3>
              <p className="text-gray-300 leading-relaxed">
                Hesabınızı istediğiniz zaman uygulama ayarlarından veya bize e-posta göndererek
                silebilirsiniz. Hesap silindiğinde tüm kişisel verileriniz 30 gün içinde kalıcı
                olarak kaldırılır.
              </p>
            </section>

            {/* Değişiklikler */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Değişiklikler</h2>
              <p className="text-gray-300 leading-relaxed">
                Alertix, bu kullanım şartlarını önceden bildirmeksizin değiştirme hakkını saklı
                tutar. Önemli değişiklikler yapıldığında uygulama içi bildirim veya e-posta yoluyla
                kullanıcılarımız bilgilendirilecektir. Değişikliklerden sonra uygulamayı kullanmaya
                devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
              </p>
            </section>

            {/* İletişim */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. İletişim</h2>
              <p className="text-gray-300 leading-relaxed">
                Kullanım şartlarımız hakkında sorularınız veya geri bildirimleriniz için bizimle
                iletişime geçebilirsiniz:
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
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition">
              Gizlilik Politikası
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
