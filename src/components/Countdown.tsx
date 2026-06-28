import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

export default function Countdown() {
  // Target time: Sunday, 28 June 2026 at 12:30 WIB (UTC+7)
  // 12:30 WIB is 05:30 UTC
  const targetDate = new Date("2026-06-28T12:30:00+07:00").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isOver: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  if (timeLeft.isOver) {
    return (
      <div className="w-full text-center py-6 px-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
        <p className="font-display text-base text-emerald-300 font-bold animate-pulse uppercase tracking-wider">
          ✨ ACARA SEDANG BERLANGSUNG ✨
        </p>
        <p className="text-xs text-emerald-200 mt-1">
          Pelepasan & Kenaikan Kelas MDT KH Zumrotul Muttaqin
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-4 gap-2.5 w-full max-w-sm">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md"
          >
            <span className="font-mono text-2xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
              {String(block.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold mt-1">
              {block.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-emerald-300/80 mt-3 font-medium italic animate-pulse">
        Menuju pelaksanaan wisuda akbar...
      </p>
    </div>
  );
}
