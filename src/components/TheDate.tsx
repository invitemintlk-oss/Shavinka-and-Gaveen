import { motion } from 'motion/react';

export function TheDate() {
  return (
    <section className="min-h-[80vh] bg-[#F3E9D5] flex flex-col justify-center relative overflow-hidden px-6 py-24 border-t border-[#B79A63]/30">
      <div className="absolute inset-0 bg-texture-paper opacity-70 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center bg-[#FAF4E7] p-12 md:p-20 shadow-xl border border-[#E8D8BC] relative max-w-lg w-full"
        >
          {/* Vintage calendar border */}
          <div className="absolute inset-2 border border-[#B79A63]/30"></div>
          <div className="absolute top-2 left-2 right-2 h-8 border-b border-[#B79A63]/30 flex justify-center gap-4 items-center">
             {/* Small dots to look like binding holes */}
             {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#E8D8BC] shadow-inner"></div>
             ))}
          </div>

          <div className="mt-8 flex flex-col items-center">
            <p className="font-serif text-2xl md:text-3xl text-[#3C2B25] uppercase tracking-[0.2em] mb-4">
              January
            </p>
            
            <div className="relative my-4 flex items-center justify-center w-40 h-40">
              {/* Burgundy oval highlight */}
              <div className="absolute inset-0 border-2 border-[#681F2B] rounded-[50%] opacity-80 -rotate-6 transform scale-x-[1.2]"></div>
              
              <p className="font-serif text-7xl md:text-8xl text-[#681F2B] font-medium leading-none z-10">
                29
              </p>

              {/* Tiny calendar markings */}
              <div className="absolute -top-8 -right-4 font-script text-2xl text-[#7B8067] z-20">Friday</div>
              <div className="absolute -bottom-8 -left-2 font-sans text-[10px] md:text-xs text-[#3C2B25]/80 uppercase tracking-widest z-20">9:20 AM</div>
            </div>

            <p className="font-serif text-2xl md:text-3xl text-[#3C2B25] uppercase tracking-[0.2em] mt-4">
              2027
            </p>
          </div>

          {/* Tiny botanical ornaments */}
          <div className="absolute bottom-6 left-6 opacity-60">
            <svg viewBox="0 0 50 50" className="w-6 h-6 fill-none stroke-[#7B8067]">
               <path d="M25 50 Q 25 30 10 20 Q 20 10 25 25 Q 30 10 40 20 Q 25 30 25 50" />
            </svg>
          </div>
          <div className="absolute top-16 right-6 opacity-60">
             <svg viewBox="0 0 50 50" className="w-6 h-6 fill-none stroke-[#7B8067]" transform="rotate(120)">
               <path d="M25 50 Q 25 30 10 20 Q 20 10 25 25 Q 30 10 40 20 Q 25 30 25 50" />
            </svg>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
