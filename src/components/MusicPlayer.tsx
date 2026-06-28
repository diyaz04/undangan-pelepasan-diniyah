import { useState, useEffect, useRef } from "react";
import { Music, Music4, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  playAutomatically: boolean;
}

export default function MusicPlayer({ playAutomatically }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // A beautiful, peaceful, spiritual ambient track matching the Islamic school theme
  const audioUrl = "https://assets.mixkit.co/music/preview/mixkit-meditation-ambient-968.mp3";

  useEffect(() => {
    // Initialize audio
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (playAutomatically) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Audio play blocked on initial load, waiting for user interaction.", err);
          });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [playAutomatically]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Failed to play audio", err));
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <button
        id="btn-music-toggle"
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-md border cursor-pointer ${
          isPlaying
            ? "bg-white/10 border-white/25 text-emerald-300 animate-[spin_8s_linear_infinite]"
            : "bg-white/5 border-white/10 text-emerald-300/40"
        }`}
        title={isPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        {isPlaying ? (
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
            {/* Visual Equalizer ripple */}
            <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>

      {/* Floating visual music bars next to it */}
      {isPlaying && (
        <div className="absolute right-14 bottom-3 flex items-end gap-[2px] h-6 px-2 bg-white/10 border border-white/20 rounded-full pointer-events-none backdrop-blur-md">
          <div className="w-[2px] bg-emerald-300 h-3 animate-[pulse_0.8s_infinite_0.1s]" />
          <div className="w-[2px] bg-emerald-400 h-5 animate-[pulse_0.6s_infinite_0.3s]" />
          <div className="w-[2px] bg-emerald-300 h-2 animate-[pulse_1s_infinite_0.2s]" />
          <div className="w-[2px] bg-emerald-400 h-4 animate-[pulse_0.7s_infinite_0.4s]" />
        </div>
      )}
    </div>
  );
}
