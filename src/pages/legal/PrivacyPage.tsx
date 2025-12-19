import React from 'react';
import { IonPage, IonContent, useIonRouter } from '@ionic/react';

export const PrivacyPage: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
            <img src="/modcus-logo.png" alt="Modcus" className="h-8" />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" onClick={(e) => { e.preventDefault(); router.push('/'); }} className="text-gray-400 hover:text-white transition">Home</a>
          </nav>
        </div>
      </header>

      <IonContent className="landing-content">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Kebijakan Privasi</h1>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-sm text-gray-500">Terakhir diperbarui: Januari 2025</p>
                
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Pendahuluan</h2>
                  <p>PT Ngoper Global Infinity ("Modcus", "kami", "kita") menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Informasi yang Kami Kumpulkan</h2>
                  <p>Kami mengumpulkan beberapa jenis informasi:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li><strong>Informasi Akun:</strong> Nama, alamat email, dan kata sandi</li>
                    <li><strong>Informasi Penggunaan:</strong> Data tentang bagaimana Anda menggunakan layanan kami</li>
                    <li><strong>Informasi Teknis:</strong> Alamat IP, jenis browser, dan perangkat</li>
                    <li><strong>Cookies:</strong> Data yang disimpan di perangkat Anda untuk meningkatkan pengalaman</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Bagaimana Kami Menggunakan Informasi Anda</h2>
                  <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>Menyediakan dan memelihara layanan kami</li>
                    <li>Meningkatkan dan mempersonalisasi pengalaman pengguna</li>
                    <li>Berkomunikasi dengan Anda tentang layanan kami</li>
                    <li>Menganalisis penggunaan layanan untuk perbaikan</li>
                    <li>Mendeteksi dan mencegah penipuan atau penyalahgunaan</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Berbagi Informasi</h2>
                  <p>Kami tidak menjual data pribadi Anda. Kami hanya membagikan informasi Anda dalam situasi berikut:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>Dengan persetujuan eksplisit Anda</li>
                    <li>Dengan penyedia layanan pihak ketiga yang membantu operasi kami</li>
                    <li>Untuk mematuhi kewajiban hukum</li>
                    <li>Untuk melindungi hak dan keamanan kami atau orang lain</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Keamanan Data</h2>
                  <p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses tidak sah, kehilangan, atau penyalahgunaan. Namun, tidak ada metode transmisi melalui internet yang 100% aman.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Penyimpanan Data</h2>
                  <p>Kami menyimpan data pribadi Anda selama diperlukan untuk tujuan yang dijelaskan dalam kebijakan ini, kecuali periode penyimpanan yang lebih lama diperlukan atau diizinkan oleh hukum.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Hak Anda</h2>
                  <p>Anda memiliki hak untuk:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                    <li>Mengakses data pribadi Anda</li>
                    <li>Memperbaiki data yang tidak akurat</li>
                    <li>Menghapus data Anda</li>
                    <li>Membatasi pemrosesan data Anda</li>
                    <li>Menolak pemrosesan data Anda</li>
                    <li>Portabilitas data</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Cookies</h2>
                  <p>Kami menggunakan cookies dan teknologi pelacakan serupa untuk meningkatkan pengalaman Anda. Anda dapat mengatur browser Anda untuk menolak cookies, tetapi ini mungkin mempengaruhi fungsionalitas layanan kami.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">9. Layanan Pihak Ketiga</h2>
                  <p>Layanan kami mungkin berisi tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi situs-situs tersebut. Kami mendorong Anda untuk membaca kebijakan privasi mereka.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">10. Perubahan Kebijakan</h2>
                  <p>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan dengan memposting kebijakan baru di halaman ini dan memperbarui tanggal "Terakhir diperbarui".</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">11. Kontak</h2>
                  <p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak Anda, silakan hubungi kami di:</p>
                  <p className="mt-2">Email: modcusai@gmail.com</p>
                  <p>Telepon: +62 821-3109-9968</p>
                  <p>Alamat: Surabaya, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};
