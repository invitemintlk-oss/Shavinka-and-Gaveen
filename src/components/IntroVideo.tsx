import { motion } from 'motion/react';

export function IntroVideo({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      key="intro-video"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-50 bg-[#111] flex items-center justify-center overflow-hidden"
    >
      <video 
        autoPlay 
        muted 
        playsInline 
        onEnded={onComplete}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-10 flex flex-col items-center p-6 text-center">
         <h1 className="font-serif text-4xl md:text-6xl text-[#FAF4E7] tracking-widest uppercase opacity-90 drop-shadow-2xl">
           You are welcome
         </h1>
      </div>

      <button
        onClick={onComplete}
        className="absolute bottom-12 text-[#FAF4E7] font-sans text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity z-20 border-b border-[#FAF4E7]/30 pb-1"
      >
        Skip Video
      </button>
    </motion.div>
  );
}
