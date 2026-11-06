import { motion } from 'motion/react';
export function Hero() {
  return (
    <section className="min-h-screen relative flex items-center justify-center p-4 md:p-12 w-full overflow-hidden bg-transparent z-10">

      {/* The Stationery Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="relative w-full max-w-4xl bg-[#F3E9D5] shadow-2xl p-6 md:p-16 flex flex-col items-center justify-center text-center mx-auto overflow-hidden"
      >
        <div className="absolute inset-0 bg-texture-paper opacity-50 mix-blend-multiply pointer-events-none z-0"></div>

        {/* Vintage Couple Sketch Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img
            src="/Gemini_Generated_Image_pxu0zkpxu0zkpxu0.jpg"
            alt="Sasith & Himashi Sketch"
            className="w-full h-full object-contain md:object-cover object-center opacity-[0.2] mix-blend-multiply"
          />
        </div>

        <div className="relative z-20 flex flex-col items-center max-w-2xl mx-auto w-full">

          <div className="font-sans text-[10px] md:text-sm tracking-[0.25em] uppercase text-[#3C2B25] flex flex-col items-center gap-1 mb-2">
            <span>Mr. S A Ajith Hemanth &amp; Mrs. R Rasika Gayani</span>
            <span className="font-display italic normal-case text-[#B79A63] text-base md:text-lg">&amp;</span>
            <span>Mr. U K Aruna Kumara &amp; Mrs. J Chandima Nilanthi</span>
          </div>

          {/* Top Botanical Ornament */}
          <div className="w-16 h-10 opacity-70 mb-3 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-10 h-10 fill-none stroke-[#7B8067]" strokeWidth="1.5">
               <path d="M50 90 Q 50 50 10 30 Q 30 10 50 40 Q 70 10 90 30 Q 50 50 50 90" />
               <path d="M50 90 Q 50 60 25 50 Q 40 30 50 60 Q 60 30 75 50 Q 50 60 50 90" />
            </svg>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] uppercase font-medium leading-none text-[#681F2B] mb-2 drop-shadow-sm">
            <span className="block mb-2 md:mb-4">Sasith</span>
            <span className="block font-display italic text-4xl md:text-6xl text-[#B79A63] my-2 lowercase">&</span>
            <span className="block mt-2 md:mt-4">Himashi</span>
          </h1>

          {/* Bottom Botanical Ornament */}
          <div className="w-16 h-16 opacity-70 mt-6 mb-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-10 h-10 fill-none stroke-[#7B8067]" strokeWidth="1.5" transform="rotate(180)">
               <path d="M50 90 Q 50 50 10 30 Q 30 10 50 40 Q 70 10 90 30 Q 50 50 50 90" />
            </svg>
          </div>

          <div className="font-serif italic text-lg md:text-2xl text-[#3C2B25] flex flex-col items-center mb-8 gap-2">
            <span>Request the pleasure of your company</span>
            <span>as they begin their journey together</span>
          </div>

          <div className="w-24 h-[1px] bg-[#B79A63] mb-8" />

          <div className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-[#3C2B25] flex flex-col gap-2 font-medium mb-10">
            <span>Friday</span>
            <span className="text-xl md:text-2xl font-serif tracking-widest text-[#681F2B] my-1">29 January 2027</span>
            <span>Poruwa Ceremony · 9:20 in the morning</span>
          </div>

          <div className="font-sans text-xs md:text-sm tracking-[0.25em] uppercase text-[#3C2B25] flex flex-col gap-1 mb-8">
            <span className="font-medium text-[#7D3942]">Tangerine Beach Hotel</span>
            <span className="opacity-80">Kalutara, Sri Lanka</span>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
