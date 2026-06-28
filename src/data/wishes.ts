export interface Wish {
  id: string;
  name: string;
  status: 'Hadir' | 'Tidak Hadir' | 'Ragu';
  message: string;
  timestamp: string;
  role?: string;
}

export const SEEDED_WISHES: Wish[] = [
  {
    id: "wish-1",
    name: "K.H. Ahmad Fauzi",
    status: "Hadir",
    message: "Barakallah fii ilmi untuk seluruh wisudawan Kelas VI Diniyah Se-Desa Sukamenak. Semoga ilmu yang didapat berkah, bermanfaat bagi agama, nusa, dan bangsa, serta menjadi benteng akhlak mulia di masa depan.",
    timestamp: "2026-06-27T08:30:00Z",
    role: "Pimpinan Pondok Pesantren"
  },
  {
    id: "wish-2",
    name: "Drs. H. Mulyana (Kepala Desa Sukamenak)",
    status: "Hadir",
    message: "Selamat dan sukses atas diselenggarakannya pelepasan siswa kelas VI dan kenaikan kelas MDT KH Zumrotul Muttaqin. Insya Allah kegiatan ini melahirkan generasi Qur'ani yang cerdas dan berakhlak mulia di desa kita tercinta.",
    timestamp: "2026-06-27T09:15:00Z",
    role: "Aparatur Desa"
  },
  {
    id: "wish-3",
    name: "Ustadz Saepudin, S.Pd.I",
    status: "Hadir",
    message: "Perjuangan menuntut ilmu agama baru saja dimulai. Teruslah bersemangat anak-anakku, jadikan Al-Qur'an dan Sunnah sebagai pedoman hidupmu. Kebanggaan guru-guru kalian menyertai langkah kalian.",
    timestamp: "2026-06-27T10:05:00Z",
    role: "Ketua FKDT Desa"
  },
  {
    id: "wish-4",
    name: "Hj. Siti Aminah (Wali Murid Shofa)",
    status: "Hadir",
    message: "Alhamdulillah ya Allah, hatur nuhun kasadayana ustadz/ustadzah di MDT KH Zumrotul Muttaqin anu parantos ngadidik murangkalih abdi. Mugia amal kasaean bapa sareng ibu guru dibalas ku pahala anu berlipat ganda. Amin.",
    timestamp: "2026-06-27T11:40:00Z",
    role: "Orang Tua Siswa"
  },
  {
    id: "wish-5",
    name: "Rahmat Hidayat (Alumni MDT)",
    status: "Hadir",
    message: "Selamat untuk adik-adik kelas VI! Ingat selalu pesan para asatidzah di MDT, jaga sholat 5 waktu dan terus mengaji di mana pun kalian berada.",
    timestamp: "2026-06-27T14:20:00Z",
    role: "Alumni"
  }
];
