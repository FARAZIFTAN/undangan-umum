import { useState } from 'react';
import { Calendar, Clock, MapPin, Share2, Download } from 'lucide-react';
import QRCode from 'qrcode';

function App() {
  const [showSuccess, setShowSuccess] = useState(false);

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
    const url = window.location.href;
    try {
      const qrDataURL = await QRCode.toDataURL(url, {
        color: {
          dark: '#7C3AED', // Purple color
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-lavender-50 relative overflow-hidden">
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              WISUDA
            </h2>
          </header>

          <div className="text-center space-y-4 slide-up delay-100">
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto px-4 text-sm sm:text-base">
              Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i
              untuk menghadiri acara wisuda dan penerimaan mahasiswa baru.
            </p>
          </div>

          <div className="glass-card bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 slide-up delay-200 border border-purple-100/30 hover-lift">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-purple-50/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">Tanggal</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">{eventDetails.date}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-purple-50/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">Waktu</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">{eventDetails.time}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-purple-50/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500 mb-1">Lokasi</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">{eventDetails.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={handleShare}
                className="w-full bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 text-sm sm:text-base"
              >
                <Share2 className="w-5 h-5" />
                <span>Bagikan Undangan</span>
              </button>

              <button
                onClick={handleDownloadQR}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-5 px-8 rounded-2xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 text-sm sm:text-base shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Unduh QR</span>
              </button>
            </div>
          </div>

          <div className="illustration-container text-center py-8 slide-up delay-300">
            <svg className="w-48 h-48 sm:w-56 sm:h-56 mx-auto" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="60" r="25" fill="#9289F2" opacity="0.2"/>
              <circle cx="100" cy="60" r="20" fill="#9289F2" opacity="0.4"/>
              <rect x="80" y="85" width="40" height="50" rx="5" fill="#A78BFA" opacity="0.3"/>
              <path d="M60 110 L100 95 L140 110 L140 130 L100 145 L60 130 Z" fill="#9289F2" opacity="0.5"/>
              <circle cx="100" cy="140" r="8" fill="#C4B5FD"/>
              <path d="M50 135 Q100 120 150 135" stroke="#9289F2" strokeWidth="3" fill="none" opacity="0.6"/>
            </svg>
          </div>

          <footer className="text-center space-y-4 pt-8 slide-up delay-400">
            <p className="text-gray-600">
              Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
              berkenan hadir untuk memberikan doa restu.
            </p>
            <p className="text-sm text-gray-500">
              Terima kasih atas perhatian dan doa restunya.
            </p>
            <a
              href={eventDetails.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-purple-400 hover:text-purple-500 font-medium transition-colors duration-300"
            >
              {eventDetails.websiteUrl}
            </a>
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
