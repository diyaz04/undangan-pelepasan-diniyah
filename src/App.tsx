import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  GraduationCap,
  Volume2,
  VolumeX,
  ChevronRight,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Compass,
  ArrowRight,
  Info,
  Gift,
  Home,
  MessageSquare
} from "lucide-react";

import Countdown from "./components/Countdown";
import MusicPlayer from "./components/MusicPlayer";
import StudentList from "./components/StudentList";
import Guestbook from "./components/Guestbook";
import ShareSection from "./components/ShareSection";
import LeafFalling from "./components/LeafFalling";

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [recipientName, setRecipientName] = useState<string>("");
  const [activeSection, setActiveSection] = useState("home");

  // Read recipient name from the URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get("to");
    if (toParam) {
      setRecipientName(toParam.trim());
    }
  }, []);

  // Track active section on scroll for mobile container
  useEffect(() => {
    if (!isOpened) return;

    const container = document.getElementById("scroll-container");
    if (!container) return;

    const handleScroll = () => {
      const sections = ["home", "acara", "wisudawan", "guestbook", "share"];
      const scrollPos = container.scrollTop + 150; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isOpened]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const container = document.getElementById("scroll-container");
    if (element && container) {
      container.scrollTo({
        top: element.offsetTop - 16,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  // ENVELOPE / COVER VIEW
  if (!isOpened) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-[#062e1c] overflow-hidden px-4 select-none">
        {/* Falling leaves in the background */}
        <LeafFalling />

        {/* Glowing background circles for Frosted Glass theme */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_#10b981_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_#059669_0%,_transparent_50%)] opacity-45 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Ceremonial Frosted Glass Card Frame */}
        <div className="relative w-full max-w-md p-8 rounded-[40px] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl text-center flex flex-col items-center justify-between min-h-[580px] z-20">
          {/* Top Corner Islamic Decorations */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-emerald-400/30 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-emerald-400/30 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-emerald-400/30 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-emerald-400/30 rounded-br-xl pointer-events-none" />

          {/* Header Medallion */}
          <div className="flex flex-col items-center mt-4">
            <div className="relative w-20 h-20 rounded-full bg-white/10 border border-white/20 p-1 flex items-center justify-center shadow-md mb-3 overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/d/1F2YxfOLAIfPU3xxvIJ2bNSKtoGg5_gi6" 
                alt="Logo Madrasah Diniyah" 
                className="w-full h-full object-contain rounded-full bg-white/95"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-300">
              Undangan Wisuda & Kenaikan Kelas
            </span>
          </div>

          {/* Main Titles */}
          <div className="my-6">
            <h1 className="font-display text-xl font-bold text-white leading-snug tracking-wide uppercase">
              PELEPASAN MURID KELAS VI DINIYAH
              <span className="block text-emerald-300 italic font-medium lowercase mt-1 text-lg">se-desa sukamenak</span>
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto my-3" />
            <h2 className="text-xs text-emerald-200/80 font-semibold tracking-wider uppercase">
              &amp; Kenaikan Kelas MDT KH Zumrotul Muttaqin
            </h2>
          </div>

          {/* Guest Envelope Frame */}
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rotate-45 translate-x-8 -translate-y-8 border-b border-white/10" />
            
            <p className="text-[11px] uppercase tracking-widest text-emerald-300 font-bold mb-2">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            
            <h3 className="font-display text-lg font-bold text-white drop-shadow-md my-2 truncate">
              {recipientName ? recipientName : "Tamu Undangan Terhormat"}
            </h3>
            
            <p className="text-[11px] text-emerald-200/70 italic mt-2">
              Di Tempat
            </p>
          </div>

          {/* Open Button */}
          <button
            id="btn-open-invitation"
            onClick={handleOpenInvitation}
            className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/20 transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 mb-4 group cursor-pointer"
          >
            <span>Buka Undangan</span>
            <ArrowRight className="w-4 h-4 text-emerald-950 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Date Stamp */}
          <div className="text-[10px] text-emerald-300/60 font-mono mt-2">
            Minggu, 28 Juni 2026 • Desa Sukamenak
          </div>
        </div>
      </div>
    );
  }

  // MAIN INVITATION SCREEN (MOBILE OPTIMIZED)
  return (
    <div className="relative min-h-screen w-full bg-[#062e1c] text-emerald-50 flex justify-center overflow-hidden">
      
      {/* Background Falling Leaves */}
      <LeafFalling />

      {/* Glowing background circles for Frosted Glass theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_#10b981_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_#059669_0%,_transparent_50%)] opacity-40 pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Background Music Player */}
      <MusicPlayer playAutomatically={isOpened} />

      {/* Desktop Frame Overlay - Simulates a real phone mock when viewed on Desktop */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-3 max-w-sm z-30 pointer-events-none">
        <div className="p-5 bg-white/10 border border-white/20 rounded-3xl backdrop-blur-xl shadow-2xl">
          <h2 className="font-display text-base text-white font-bold mb-1 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-300" /> Mode Tampilan HP
          </h2>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            Halaman ini telah dioptimalkan secara khusus agar tampil menakjubkan pada perangkat smartphone (HP) dengan tema <span className="text-emerald-300 font-bold">Frosted Glass</span> yang elegan. Gunakan scroll container di tengah untuk menjelajah.
          </p>
        </div>
      </div>

      {/* Primary Mobile Container with Frosted Glass look */}
      <div className="relative w-full max-w-md h-screen bg-white/10 border-x border-white/20 flex flex-col justify-between shadow-2xl backdrop-blur-2xl z-20">
        
        {/* Scrollable Area */}
        <div
          id="scroll-container"
          className="flex-1 overflow-y-auto scroll-smooth pb-24 scrollbar-none"
        >
          {/* SECTION 1: HOME/HERO (ID: home) */}
          <section
            id="home"
            className="relative px-6 pt-8 pb-12 text-center flex flex-col items-center min-h-[500px]"
          >
            {/* Top Glowing Medallion with Custom Logo */}
            <div className="relative w-16 h-16 rounded-full bg-white/10 border border-white/20 p-1 flex items-center justify-center shadow-md mb-6 overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/d/1F2YxfOLAIfPU3xxvIJ2bNSKtoGg5_gi6" 
                alt="Logo Madrasah Diniyah" 
                className="w-full h-full object-contain rounded-full bg-white/95"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bismillah Calligraphy Placeholder/Styled Header */}
            <div className="w-full py-1.5 px-4 bg-emerald-500/20 border border-emerald-400/30 rounded-full max-w-xs mb-6">
              <p className="text-[11px] tracking-wide text-emerald-200 font-semibold italic text-center font-sans">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>

            <p className="text-xs text-emerald-300 tracking-widest uppercase font-bold mb-2">
              Undangan Resmi Se-Desa Sukamenak
            </p>

            <h2 className="font-display text-xl font-bold text-white leading-snug tracking-wide mt-1 uppercase">
              PELEPASAN MURID KELAS VI DINIYAH
              <span className="block text-emerald-300 italic font-medium lowercase mt-1 text-lg">MDT se-desa sukamenak</span>
            </h2>
            <p className="text-xs text-emerald-200/70 font-semibold mt-1">
              &amp; Kenaikan Kelas MDT KH Zumrotul Muttaqin
            </p>

            {/* Custom Divider */}
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent my-6" />

            {/* Warm Greeting Word (Assalamu'alaikum) */}
            <div className="space-y-3.5 max-w-sm text-center">
              <p className="text-sm font-bold text-white italic">
                Assalamu'alaikum Warahmatullahi Wabarakatuh
              </p>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Dengan mengharap rahmat, taufik, serta ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara Pelepasan Murid Kelas VI Diniyah Se-Desa Sukamenak dan Kenaikan Kelas MDT KH Zumrotul Muttaqin Tahun Ajaran 2025/2026.
              </p>
            </div>

            {/* Al-Quran Quote Card */}
            <div className="w-full mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden text-center">
              <div className="absolute top-1 left-2 text-white/10 text-3xl font-serif">“</div>
              <p className="text-xs text-emerald-200 italic leading-relaxed px-2">
                ...Niscaya Allah akan meninggikan orang-orang yang beriman di antaramu dan orang-orang yang diberi ilmu pengetahuan beberapa derajat...
              </p>
              <p className="text-[10px] text-emerald-300 font-bold mt-2">
                — QS. Al-Mujadilah: 11
              </p>
            </div>

            {/* Countdown Container */}
            <div className="w-full mt-8 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg">
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 mb-3 text-center">
                Waktu Pelaksanaan
              </p>
              <Countdown />
            </div>
          </section>

          {/* SECTION 2: ACARA / EVENT (ID: acara) */}
          <section
            id="acara"
            className="px-6 py-12 border-t border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-emerald-300" />
              </div>
              <h2 className="font-display text-lg font-bold text-white">Rincian Kegiatan</h2>
              <p className="text-[11px] text-emerald-300 uppercase tracking-widest font-semibold mt-0.5">
                Waktu & Tempat Pelaksanaan
              </p>
              <div className="w-12 h-[1px] bg-white/20 mt-2" />
            </div>

            {/* Date and Time Cards */}
            <div className="grid grid-cols-1 gap-3.5 mb-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-emerald-300 font-bold">Hari & Tanggal</p>
                  <p className="text-sm font-bold text-white">Minggu, 28 Juni 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-emerald-300 font-bold">Waktu</p>
                  <p className="text-sm font-bold text-white">Pukul 12.30 WIB - Selesai</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-emerald-300 font-bold">Tempat Pelaksanaan</p>
                  <p className="text-sm font-bold text-white leading-snug">Pondok Pesantren KH Zumrotul Muttaqin</p>
                  <p className="text-xs text-emerald-200/70 mt-1 leading-relaxed">Desa Sukamenak, Kec. Sukarame, Kabupaten Tasikmalaya</p>
                </div>
              </div>
            </div>

            {/* Navigation Map Action */}
            <div className="p-5 bg-white/5 rounded-3xl border border-white/10 text-center mb-10 backdrop-blur-md">
              <p className="text-xs text-emerald-100/95 mb-3 font-medium">
                Mudahkan perjalanan Anda menuju lokasi dengan peta navigasi Google Maps:
              </p>
              <button
                id="btn-open-maps"
                onClick={() => window.open("https://maps.google.com/?q=Pondok+Pesantren+KH+Zumrotul+Muttaqin+Desa+Sukamenak", "_blank")}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-950 animate-bounce" />
                Buka di Google Maps
              </button>
            </div>

            {/* Event Rundown Timeline */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 shadow-lg relative overflow-hidden backdrop-blur-md">
              <h3 className="font-display text-sm text-white font-bold mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-300" /> Susunan Acara (Rundown)
              </h3>
              
              <div className="space-y-5 border-l-2 border-emerald-500/20 ml-2.5 pl-4 relative">
                {/* Timeline Dots & Text */}
                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-900" />
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                    12.30 - 13.00 WIB
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1">Registrasi & Penyambutan</h4>
                  <p className="text-[11px] text-emerald-200/80">Kehadiran seluruh wisudawan dan wali santri.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900" />
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                    13.00 - 13.30 WIB
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1">Pembukaan & Gema Kalam Ilahi</h4>
                  <p className="text-[11px] text-emerald-200/80">Pembacaan ayat suci Al-Qur'an dan sholawat nabi.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900" />
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                    13.30 - 14.15 WIB
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1">Prakata & Sambutan</h4>
                  <p className="text-[11px] text-emerald-200/80">Kepala Desa Sukamenak &amp; Pimpinan Pondok Pesantren.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-300 border-2 border-emerald-900 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                    14.15 - 15.30 WIB
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1">Prosesi Wisuda Akbar</h4>
                  <p className="text-[11px] text-emerald-200/80">Pelepasan siswa Kelas VI Diniyah Se-Desa Sukamenak.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-900" />
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                    15.30 - 16.30 WIB
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1">Mauidzah Hasanah &amp; Doa</h4>
                  <p className="text-[11px] text-emerald-200/80">Nasihat agama penutup oleh Kiai penceramah.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: WISUDAWAN DIRECTORY (ID: wisudawan) */}
          <section
            id="wisudawan"
            className="px-6 py-12 border-t border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                <GraduationCap className="w-5 h-5 text-emerald-300" />
              </div>
              <h2 className="font-display text-lg font-bold text-white">Daftar Wisudawan</h2>
              <p className="text-[11px] text-emerald-300 uppercase tracking-widest font-semibold mt-0.5">
                Calon Wisudawan Kelas VI Diniyah
              </p>
              <div className="w-12 h-[1px] bg-white/20 mt-2" />
            </div>

            {/* Embedded filterable students list */}
            <StudentList />
          </section>

          {/* SECTION 4: GUESTBOOK / RSVP (ID: guestbook) */}
          <section
            id="guestbook"
            className="px-6 py-12 border-t border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                <MessageSquare className="w-5 h-5 text-emerald-300" />
              </div>
              <h2 className="font-display text-lg font-bold text-white">Buku Tamu & RSVP</h2>
              <p className="text-[11px] text-emerald-300 uppercase tracking-widest font-semibold mt-0.5">
                Kirim Ucapan Selamat &amp; Kehadiran
              </p>
              <div className="w-12 h-[1px] bg-white/20 mt-2" />
            </div>

            {/* RSVP Guestbook component */}
            <Guestbook />
          </section>

          {/* SECTION 5: SHARE / CONFIG (ID: share) */}
          <section
            id="share"
            className="px-6 py-12 border-t border-white/10 bg-white/5 backdrop-blur-md"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-2">
                <Share2 className="w-5 h-5 text-emerald-300" />
              </div>
              <h2 className="font-display text-lg font-bold text-white">Bagikan Undangan</h2>
              <p className="text-[11px] text-emerald-300 uppercase tracking-widest font-semibold mt-0.5">
                Kirim Undangan Khusus (Kustom Nama)
              </p>
              <div className="w-12 h-[1px] bg-white/20 mt-2" />
            </div>

            {/* Share section component */}
            <ShareSection />
          </section>

          {/* Elegant Footer / Closing */}
          <footer className="text-center py-10 px-6 border-t border-white/10 bg-white/5 backdrop-blur-md">
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-xs mx-auto">
              Merupakan kehormatan serta kebahagiaan tersendiri bagi kami segenap pengurus apabila Bapak/Ibu/Saudara/i berkenan hadir di acara kami.
            </p>
            
            <div className="mt-6 flex flex-col items-center">
              <div className="text-[10px] uppercase tracking-widest font-bold text-emerald-300 mb-1">
                Panitia Pelaksana Pelepasan
              </div>
              <div className="text-xs font-bold text-white">
                MDT Se-Desa Sukamenak
              </div>
              <p className="text-[9px] text-emerald-300/40 font-mono mt-4">
                © 2026 MDT KH Zumrotul Muttaqin • All rights reserved.
              </p>
            </div>
          </footer>
        </div>

        {/* BOTTOM FLOATING NAVIGATION BAR */}
        <div className="absolute bottom-4 left-4 right-4 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-around px-3 shadow-xl backdrop-blur-xl z-40">
          
          <button
            id="nav-home"
            onClick={() => scrollToSection("home")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              activeSection === "home" ? "text-white scale-105" : "text-emerald-300/60 hover:text-emerald-200"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Beranda</span>
          </button>

          <button
            id="nav-acara"
            onClick={() => scrollToSection("acara")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              activeSection === "acara" ? "text-white scale-105" : "text-emerald-300/60 hover:text-emerald-200"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Acara</span>
          </button>

          <button
            id="nav-wisudawan"
            onClick={() => scrollToSection("wisudawan")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              activeSection === "wisudawan" ? "text-white scale-105" : "text-emerald-300/60 hover:text-emerald-200"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Wisudawan</span>
          </button>

          <button
            id="nav-guestbook"
            onClick={() => scrollToSection("guestbook")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              activeSection === "guestbook" ? "text-white scale-105" : "text-emerald-300/60 hover:text-emerald-200"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>RSVP</span>
          </button>

          <button
            id="nav-share"
            onClick={() => scrollToSection("share")}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold tracking-wide transition-all duration-300 cursor-pointer ${
              activeSection === "share" ? "text-white scale-105" : "text-emerald-300/60 hover:text-emerald-200"
            }`}
          >
            <Share2 className="w-5 h-5" />
            <span>Undang</span>
          </button>

        </div>

      </div>
    </div>
  );
}
