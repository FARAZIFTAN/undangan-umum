import { useState } from 'react';
import { Calendar, Clock, MapPin, Share2, Download } from 'lucide-react';
import QRCode from 'qrcode';

function App() {
  const [showSuccess, setShowSuccess] = useState(false);

  const isViewer = new URLSearchParams(window.location.search).get('viewer') === 'true';

  const eventDetails = {
    university: "Universitas Logistik dan Bisnis Internasional",
    date: "Rabu, 26 November 2025",
    time: "15.30 WIB - 20.00 WIB",
    location: "Auditorium ULBI, Universitas Logistik dan Bisnis Internasional, Bandung",
    websiteUrl: "https://ulbi.ac.id"
  };

  const handleShare = async () => {
    const text = `🎓 Undangan Wisuda\n\n${eventDetails}\n${eventDetails.university}\n\n📅 ${eventDetails.date}\n⏰ ${eventDetails.time}\n📍 ${eventDetails.location}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Undangan Wisuda',
          text: text,
        });
      } catch {
        console.log('Share cancelled');
      }
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleDownloadQR = async () => {
    const url = `${window.location.href}?viewer=true`;
    try {
      const qrDataURL = await QRCode.toDataURL(url, {
        color: {
          dark: '#A87C3D', // Gold color
          light: '#FFFFFF' // White background
        },
        margin: 2,
        width: 256,
        errorCorrectionLevel: 'M'
      });
      const link = document.createElement('a');
      link.href = qrDataURL;
      link.download = 'undangan-qr.png';
      link.click();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch {
      // Ignore errors
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A87C3D0D] via-white to-[#A87C3D0D] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(146,137,242,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(167,139,250,0.06),transparent_50%)]"></div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto space-y-6 fade-in">

          <header className="text-center space-y-3 slide-up">
            <p className="text-sm font-light text-gray-500 tracking-wider uppercase">
              {eventDetails.university}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
              UNDANGAN
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#A87C3D] to-[#A87C3D99] bg-clip-text text-transparent">
              WISUDA
            </h2>
          </header>

          <div className="text-center space-y-4 slide-up delay-100">
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto px-4 text-sm sm:text-base">
              Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i
              untuk menghadiri acara wisuda dan penerimaan mahasiswa baru.
            </p>
          </div>

          <div className="glass-card bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 slide-up delay-200 border border-[#A87C3D33] hover-lift">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-[#A87C3D] to-[#A87C3D99] rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-[#A87C3D0D] transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A87C3D] to-[#A87C3DCC] rounded-xl flex items-center justify-center shadow-md">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">Tanggal</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">{eventDetails.date}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-[#A87C3D0D] transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A87C3D99] to-[#A87C3D] rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">Waktu</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">{eventDetails.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-[#A87C3D0D] transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#A87C3D] to-[#A87C3D66] rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">Lokasi</p>
                  <a
                    href="https://maps.app.goo.gl/4WFwhNUcERnAqmcC6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base font-semibold text-[#A87C3D] hover:underline"
                  >
                    {eventDetails.location}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              {!isViewer && (
                <>
                  <button
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-[#A87C3D] to-[#A87C3D99] hover:from-[#A87C3DCC] hover:to-[#A87C3D] text-white font-semibold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 text-sm sm:text-base"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Bagikan Undangan</span>
                  </button>

                  <button
                    onClick={handleDownloadQR}
                    className="w-full bg-white hover:bg-gray-50 text-[#A87C3D] font-semibold py-5 px-8 rounded-2xl border-2 border-[#A87C3D66] hover:border-[#A87C3D] transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 text-sm sm:text-base shadow-md hover:shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    <span>Unduh QR</span>
                  </button>
                </>
              )}
            </div>
          </div>


          <footer className="text-center space-y-4 pt-8 slide-up delay-400">
            <p className="text-gray-600">
              Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
              berkenan hadir untuk memberikan doa restu.
            </p>
            <p className="text-sm text-gray-500">
              Terima kasih atas perhatian dan doa restunya.
            </p>
          </footer>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg fade-in z-50">
          <p className="text-sm font-medium">QR siap diunduh!</p>
        </div>
      )}
    </div>
  );
}

export default App;
