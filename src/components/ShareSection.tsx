import { useState, useEffect } from "react";
import { Share2, Copy, Send, Check, MessageSquare, Info } from "lucide-react";

export default function ShareSection() {
  const [guestName, setGuestName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const appBaseUrl = window.location.origin + window.location.pathname;

  useEffect(() => {
    if (guestName.trim()) {
      const encoded = encodeURIComponent(guestName.trim());
      setGeneratedUrl(`${appBaseUrl}?to=${encoded}`);
    } else {
      setGeneratedUrl(appBaseUrl);
    }
  }, [guestName, appBaseUrl]);

  // Compiled invitation text template for WhatsApp
  const getWhatsAppMessage = () => {
    const formattedName = guestName.trim() ? `*${guestName.trim()}*` : "Bapak/Ibu/Saudara/i";
    return `Assalamu'alaikum Wr. Wb.

Yth. ${formattedName},

Kami mengharap kehadiran Bapak/Ibu/Saudara/i dalam acara *Pelepasan Murid Kelas VI Diniyah Se-Desa Sukamenak & Kenaikan Kelas MDT KH Zumrotul Muttaqin*.

📅 *Hari/Tanggal:* Minggu, 28 Juni 2026
⏰ *Waktu:* 12.30 WIB - Selesai
📍 *Tempat:* Pondok Pesantren KH Zumrotul Muttaqin, Desa Sukamenak

Buka undangan digital kami untuk informasi lebih lengkap & peta lokasi melalui link berikut:
👉 ${generatedUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Wassalamu'alaikum Wr. Wb.`;
  };

  const handleShareWhatsApp = () => {
    const text = getWhatsAppMessage();
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    
    // If phone number starts with 0, replace with 62 for international format
    let targetPhone = cleanPhone;
    if (cleanPhone.startsWith("0")) {
      targetPhone = "62" + cleanPhone.slice(1);
    }

    const waUrl = targetPhone 
      ? `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodeURIComponent(text)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

    window.open(waUrl, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getWhatsAppMessage()).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Configuration Card */}
      <div className="p-5 rounded-3xl bg-white/5 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="font-display text-lg text-white font-bold mb-1 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-emerald-300" /> Pembuat Undangan Kustom
        </h3>
        <p className="text-xs text-emerald-200/80 mb-4 leading-relaxed">
          Gunakan fitur ini untuk membuat undangan khusus perorangan. Nama tamu akan muncul di amplop depan undangan secara otomatis saat mereka membukanya!
        </p>

        <div className="space-y-4">
          {/* Guest Name Input */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
              Nama Tamu (Tujuan Undangan)
            </label>
            <input
              id="share-guest-name"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Contoh: Bapak Ir. H. Joko Widodo"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-all shadow-inner"
            />
          </div>

          {/* Optional Phone Number */}
          <div>
            <label className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Nomor WhatsApp Tamu (Opsional)</span>
              <span className="text-[10px] text-emerald-300/40 font-normal normal-case">Bisa dikosongkan</span>
            </label>
            <input
              id="share-phone-number"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Contoh: 08123456789"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-all shadow-inner"
            />
          </div>

          {/* Link Preview box */}
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <Info className="w-3.5 h-3.5" />
              <span>Link Undangan Kustom Anda:</span>
            </div>
            <div className="bg-black/30 p-2.5 rounded border border-white/10 text-emerald-100 select-all overflow-x-auto font-mono text-[10px] whitespace-nowrap scrollbar-none">
              {generatedUrl}
            </div>
          </div>

          {/* Quick Action buttons */}
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {/* WhatsApp button */}
            <button
              id="btn-share-whatsapp"
              onClick={handleShareWhatsApp}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-emerald-950" /> Kirim Otomatis ke WhatsApp
            </button>

            <div className="grid grid-cols-2 gap-2">
              {/* Copy Link button */}
              <button
                id="btn-copy-link"
                onClick={handleCopyLink}
                className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-emerald-300">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Link</span>
                  </>
                )}
              </button>

              {/* Copy Message Text */}
              <button
                id="btn-copy-text"
                onClick={handleCopyText}
                className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-200 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-emerald-300">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Salin Teks WA</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sharing Instructions */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-2 leading-relaxed text-emerald-200/70">
        <p className="font-semibold text-emerald-300">💡 Cara Menggunakan:</p>
        <ol className="list-decimal list-inside space-y-1.5 pl-1">
          <li>Ketik nama tamu undangan pada kolom pertama.</li>
          <li>Ketik nomor WhatsApp tamu jika ingin langsung diarahkan mengirim ke nomor tujuan tersebut (bisa dikosongkan).</li>
          <li>Klik tombol <span className="text-emerald-300 font-semibold">"Kirim Otomatis ke WhatsApp"</span>. Sistem akan menyalin pesan indah beserta link khusus tamu tersebut, lalu otomatis membuka aplikasi WhatsApp Anda.</li>
        </ol>
      </div>
    </div>
  );
}
