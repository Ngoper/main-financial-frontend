import React from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';

export const TermsPage: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
          <nav className="flex items-center space-x-8">
            <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }} className="text-gray-400 hover:text-white transition">Beranda</a>
          </nav>
        </div>
      </header>

      <IonContent className="landing-content">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Syarat & Ketentuan</h1>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-sm text-gray-500">Terakhir diperbarui: Januari 2025</p>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Penerimaan Ketentuan</h2>
                  <p>Dengan mengakses dan menggunakan platform Modcus, Anda setuju untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak boleh menggunakan layanan kami.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Deskripsi Layanan</h2>
                  <p>Modcus menyediakan platform analisis saham berbasis AI yang membantu pengguna dalam menganalisis fundamental saham di pasar Indonesia. Layanan kami mencakup AI scoring, analisis real-time, dan chatbot analis saham.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Akun Pengguna</h2>
                  <p>Untuk menggunakan layanan tertentu, Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>Menjaga kerahasiaan informasi akun Anda</li>
                    <li>Semua aktivitas yang terjadi di bawah akun Anda</li>
                    <li>Memberikan informasi yang akurat dan terkini</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Penggunaan Layanan</h2>
                  <p>Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan ketentuan ini. Anda tidak boleh:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>Menggunakan layanan untuk tujuan ilegal atau tidak sah</li>
                    <li>Mencoba mendapatkan akses tidak sah ke sistem kami</li>
                    <li>Mengganggu atau merusak layanan kami</li>
                    <li>Menyalahgunakan atau mendistribusikan konten tanpa izin</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer Investasi</h2>
                  <p className="font-semibold text-yellow-400">PENTING: Informasi yang disediakan oleh Modcus adalah untuk tujuan edukasi dan informasi saja. Ini bukan merupakan saran investasi profesional. Anda bertanggung jawab penuh atas keputusan investasi Anda sendiri.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Hak Kekayaan Intelektual</h2>
                  <p>Semua konten, fitur, dan fungsi layanan kami adalah milik eksklusif PT Ngoper Global Infinity dan dilindungi oleh hukum hak cipta, merek dagang, dan hak kekayaan intelektual lainnya.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Pembatasan Tanggung Jawab</h2>
                  <p>Modcus tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami, termasuk namun tidak terbatas pada kerugian investasi.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Perubahan Ketentuan</h2>
                  <p>Kami berhak untuk memodifikasi atau mengganti ketentuan ini kapan saja. Perubahan akan berlaku segera setelah diposting di halaman ini. Penggunaan berkelanjutan Anda atas layanan setelah perubahan merupakan penerimaan Anda terhadap ketentuan yang direvisi.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">9. Hukum yang Berlaku</h2>
                  <p>Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">10. Kontak</h2>
                  <p>Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami di:</p>
                  <p className="mt-2">Email: modcusai@gmail.com</p>
                  <p>Telepon: +62 821-3109-9968</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};
