import { useState, useEffect, FormEvent } from "react";
import { SEEDED_WISHES, Wish } from "../data/wishes";
import { MessageSquare, Heart, CheckCircle2, XCircle, HelpCircle, Send, Users } from "lucide-react";

export default function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<'Hadir' | 'Tidak Hadir' | 'Ragu'>("Hadir");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("Tamu Undangan");
  const [successMsg, setSuccessMsg] = useState("");

  // Load from localStorage and merge with seeds
  useEffect(() => {
    const stored = localStorage.getItem("sukamenak_wisuda_wishes");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Wish[];
        // Filter out seeds if duplicates exist by id, and prepend stored ones
        const seedIds = new Set(SEEDED_WISHES.map(w => w.id));
        const customWishes = parsed.filter(w => !seedIds.has(w.id));
        setWishes([...customWishes, ...SEEDED_WISHES]);
      } catch (e) {
        setWishes(SEEDED_WISHES);
      }
    } else {
      setWishes(SEEDED_WISHES);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: "custom-" + Date.now(),
      name: name.trim(),
      status,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      role: role.trim() || "Tamu Undangan",
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);

    // Save only custom ones to localstorage to avoid duplicate seeded wishes
    const customOnly = updatedWishes.filter(w => w.id.startsWith("custom-"));
    localStorage.setItem("sukamenak_wisuda_wishes", JSON.stringify(customOnly));

    // Reset Form
    setName("");
    setMessage("");
    setRole("Tamu Undangan");
    setSuccessMsg("Terima kasih! Ucapan & RSVP Anda berhasil terkirim ✨");

    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  // Helper for status badge
  const renderStatusBadge = (statusValue: Wish["status"]) => {
    switch (statusValue) {
      case "Hadir":
        return (
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
            <CheckCircle2 className="w-3 h-3" /> Hadir
          </span>
        );
      case "Tidak Hadir":
        return (
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-bold text-rose-400">
            <XCircle className="w-3 h-3" /> Tidak Hadir
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-400">
            <HelpCircle className="w-3 h-3" /> Ragu-ragu
          </span>
        );
    }
  };

  // Humanize time difference
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Baru saja";
      if (diffMins < 60) return `${diffMins} menit lalu`;
      if (diffHours < 24) return `${diffHours} jam lalu`;
      if (diffDays === 1) return "Kemarin";
      if (diffDays < 7) return `${diffDays} hari lalu`;
      return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return "Baru saja";
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* RSVP & Wish Form */}
      <div className="p-5 rounded-3xl bg-white/5 border border-white/15 shadow-xl backdrop-blur-md">
        <h3 className="font-display text-lg text-white font-bold mb-1 flex items-center gap-2">
          <Heart className="w-5 h-5 text-emerald-300 animate-pulse fill-emerald-300/20" /> RSVP & Doa Restu
        </h3>
        <p className="text-xs text-emerald-200/80 mb-4 leading-relaxed">
          Sampaikan konfirmasi kehadiran Anda beserta ucapan doa restu untuk wisudawan Kelas VI.
        </p>

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold text-center animate-bounce">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
              Nama Anda
            </label>
            <input
              id="rsvp-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Bpk. H. Junaedi"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                Keterangan / Hubungan
              </label>
              <input
                id="rsvp-relation"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Misal: Wali Murid / Tetangga"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                Konfirmasi Kehadiran
              </label>
              <select
                id="rsvp-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-400 transition-all [&_option]:bg-[#062e1c]"
              >
                <option value="Hadir">Insya Allah Hadir</option>
                <option value="Ragu">Masih Ragu-ragu</option>
                <option value="Tidak Hadir">Berhalangan Hadir</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
              Doa / Ucapan Selamat
            </label>
            <textarea
              id="rsvp-message"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan selamat dan doa terbaik..."
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-emerald-400 transition-all resize-none"
            />
          </div>

          <button
            id="btn-rsvp-submit"
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Kirim Ucapan & RSVP
          </button>
        </form>
      </div>

      {/* Wishes Feed */}
      <div className="w-full flex flex-col gap-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-1.5 px-1">
          <MessageSquare className="w-4 h-4 text-emerald-300" />
          <span>Ucapan Doa Restu ({wishes.length})</span>
        </h4>

        <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-md backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h5 className="text-sm font-bold text-white">{wish.name}</h5>
                  <p className="text-[10px] text-emerald-200/60 italic">
                    {wish.role || "Tamu Undangan"} • {formatTime(wish.timestamp)}
                  </p>
                </div>
                {renderStatusBadge(wish.status)}
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed italic bg-white/5 p-2.5 rounded-lg border border-white/5">
                "{wish.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
