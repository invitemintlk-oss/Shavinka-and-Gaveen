import { motion } from 'motion/react';

export function Moments() {
  return (
    <section className="bg-[#E8D8BC] flex flex-col justify-center px-4 md:px-16 lg:px-24 py-32 relative overflow-hidden border-t border-[#B79A63]/30">
      <div className="absolute inset-0 bg-texture-paper opacity-50 mix-blend-multiply pointer-events-none"></div>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="font-script text-2xl md:text-3xl text-[#7B8067] mb-2">our</p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#3C2B25] uppercase tracking-[0.3em]">
            Captured Moments
          </h2>
          <div className="w-24 h-[1px] bg-[#B79A63] mx-auto mt-8" />
        </motion.div>

        {/* Ornate gallery frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative w-full bg-[#FAF4E7] p-3 md:p-8 shadow-[0_20px_50px_rgba(60,43,37,0.25)] border border-[#B79A63]"
        >
          <div className="absolute inset-1 md:inset-2 border border-[#B79A63]/40 pointer-events-none"></div>
          <div className="vintage-corners-inner absolute inset-1 md:inset-3 pointer-events-none"></div>

          <div className="relative overflow-hidden border border-[#B79A63]/60 shadow-inner">
            <motion.img
              src="/couple/couple-3.jpeg"
              alt="Sasith & Himashi"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="w-full h-auto block"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(60,43,37,0.25)] pointer-events-none"></div>
          </div>

          {/* Monogram medallion */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#681F2B] border border-[#7D3942] shadow-lg flex items-center justify-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center">
              <span className="font-serif text-[#FAF4E7] text-sm md:text-lg">B&amp;A</span>
            </div>
          </div>
        </motion.div>

        <p className="font-serif italic text-xl md:text-3xl text-[#3C2B25] mt-16 text-center max-w-xl">
          Every moment with you is a page in our forever.
        </p>
      </div>
    </section>
  );
}
