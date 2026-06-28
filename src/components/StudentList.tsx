import { useState, useMemo } from "react";
import { STUDENTS_DATA, Student } from "../data/students";
import { Search, GraduationCap, Award, BookOpen, Users } from "lucide-react";

export default function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const mdts = useMemo(() => {
    const list = ["ALL"];
    const uniqueMdts = Array.from(new Set(STUDENTS_DATA.map((s) => s.mdt)));
    return [...list, ...uniqueMdts];
  }, []);

  const filteredStudents = useMemo(() => {
    return STUDENTS_DATA.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.ttl.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab = activeTab === "ALL" || student.mdt === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  // Statistics for badges
  const stats = useMemo(() => {
    const total = STUDENTS_DATA.length;
    const statsMap: Record<string, number> = { ALL: total };
    STUDENTS_DATA.forEach((s) => {
      statsMap[s.mdt] = (statsMap[s.mdt] || 0) + 1;
    });
    return statsMap;
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Intro Stats */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/15 backdrop-blur-md rounded-2xl">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-300 animate-bounce" />
          <span className="text-sm font-semibold text-white">Total Wisudawan</span>
        </div>
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold text-xs rounded-full shadow-md">
          40 Santri Kelas VI Diniyah
        </span>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-emerald-300" />
        </span>
        <input
          id="search-wisudawan"
          type="text"
          placeholder="Cari nama wisudawan / nama ayah..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all shadow-inner"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-emerald-300 hover:text-emerald-200 font-medium"
          >
            Bersihkan
          </button>
        )}
      </div>

      {/* Filter Tabs / Chips */}
      <div className="w-full overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
        <div className="flex gap-2 min-w-max">
          {mdts.map((mdt) => {
            const isActive = activeTab === mdt;
            const displayName =
              mdt === "ALL"
                ? "Semua"
                : mdt.replace("KH. ", "").replace("DAMAMIATUL ", ""); // abbreviate for mobile tabs
            return (
              <button
                key={mdt}
                onClick={() => setActiveTab(mdt)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 border-emerald-400 text-emerald-950 shadow-md"
                    : "bg-white/5 border-white/10 text-emerald-200 hover:bg-white/10"
                }`}
              >
                <span>{displayName}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive
                      ? "bg-white text-emerald-700 font-bold"
                      : "bg-white/10 text-emerald-200"
                  }`}
                >
                  {stats[mdt] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Student Cards Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
          {filteredStudents.map((student) => (
            <div
              key={student.no}
              className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-all duration-300 group shadow-md"
            >
              {/* Card border shine */}
              <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-xl pointer-events-none transition-all duration-500" />

              {/* MDT Tag top-right */}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                <BookOpen className="w-3 h-3 text-emerald-300" />
                <span className="text-[9px] font-bold text-emerald-200 uppercase tracking-tight">
                  {student.mdt === "KH. ZUMRATUL MUTTAQIN" ? "Zumrotul M." : student.mdt}
                </span>
              </div>

              <div className="flex items-start gap-3">
                {/* Ranking/Index Badge */}
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center font-mono text-xs font-extrabold text-emerald-300 shadow-inner">
                  {student.no}
                </div>

                <div className="flex-grow min-w-0 pr-16">
                  {/* Student Name */}
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {student.name}
                  </h4>

                  {/* Parents Name & TTL */}
                  <div className="mt-1.5 space-y-1 text-xs">
                    <p className="text-emerald-200/60 flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-semibold text-emerald-300 w-16">
                        Ayah:
                      </span>
                      <span className="text-emerald-100 font-medium truncate">
                        {student.fatherName === "-" ? "Tidak Tercatat" : student.fatherName}
                      </span>
                    </p>
                    <p className="text-emerald-200/60 flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-semibold text-emerald-300 w-16">
                        TTL:
                      </span>
                      <span className="text-emerald-200/80 italic truncate">{student.ttl}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Graduation cap on hover */}
              <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300">
                <Award className="w-8 h-8 text-emerald-300" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 border border-dashed border-white/10 rounded-2xl bg-white/5">
          <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-emerald-300">Wisudawan tidak ditemukan</p>
          <p className="text-xs text-emerald-200/40 mt-1">Coba sesuaikan kata kunci pencarian Anda</p>
        </div>
      )}
    </div>
  );
}
