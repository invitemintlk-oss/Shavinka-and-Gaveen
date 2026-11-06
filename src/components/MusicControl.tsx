import { Music, Music2 } from 'lucide-react';
import { motion } from 'motion/react';

interface MusicControlProps {
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

export function MusicControl({ isMusicPlaying, toggleMusic }: MusicControlProps) {
  return (
    <button
      onClick={toggleMusic}
      className="w-11 h-11 rounded-full bg-[#fff8e6]/95 border border-[#c9a24a] shadow-[0_8px_20px_rgba(120,86,20,0.3)] backdrop-blur flex items-center justify-center text-[#9a7432] hover:scale-105 transition-transform duration-300 relative"
      aria-label={isMusicPlaying ? "Pause music" : "Play music"}
    >
      <div className="absolute inset-1 border border-[#c9a24a]/50 rounded-full pointer-events-none border-dashed" />
      {isMusicPlaying ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Music2 size={16} className="relative z-10" />
        </motion.div>
      ) : (
        <Music size={16} className="relative z-10 opacity-70" />
      )}
    </button>
  );
}
