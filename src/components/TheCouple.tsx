import { motion } from 'motion/react';

export function TheCouple() {
  return (
    <section className="min-h-screen bg-[#E8D8BC] flex flex-col justify-center py-24 px-6 md:px-16 lg:px-24 overflow-hidden relative border-t border-[#B79A63]/30">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-texture-paper opacity-50 mix-blend-multiply pointer-events-none z-0"></div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/12.jpg" 
          alt="Vintage Sketch Background" 
          className="w-full h-full object-cover opacity-[0.15] mix-blend-multiply" 
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className="w-full max-w-6xl mx-auto z-10 relative flex flex-col items-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-[0.3em] text-[#3C2B25] mb-16 text-center">
          Our Story
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 w-full">
          
          {/* LEFT: Vintage Framed Photograph */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
            <div className="relative w-[85%] max-w-sm rotate-[-2deg]">
              <div className="bg-[#FAF4E7] p-3 md:p-4 pb-10 md:pb-14 shadow-[0_15px_35px_rgba(60,43,37,0.2)] border border-[#B79A63]/40">
                <img 
                  src="/couple/couple-2.jpeg" 
                  alt="Sasith & Himashi" 
                  className="w-full h-auto"
                />
                <p className="font-script text-2xl md:text-3xl text-[#681F2B] text-center mt-3 md:mt-4">Sasith &amp; Himashi</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Text */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-serif italic text-2xl md:text-4xl text-[#681F2B] mb-6">
              A love worth celebrating
            </h3>
            
            <p className="font-sans text-sm md:text-lg text-[#3C2B25] leading-relaxed max-w-md mx-auto md:mx-0">
              Some stories begin quietly,<br/>
              and become the most beautiful<br/>
              chapters of our lives.
            </p>

            <div className="w-12 h-[1px] bg-[#B79A63] mt-8 mb-8" />

            {/* Botanical Illustration */}
            <div className="w-12 h-12 opacity-80">
              <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-[#7B8067]" strokeWidth="2">
                <path d="M50 100 Q 50 60 20 50 Q 50 40 50 0 Q 50 40 80 50 Q 50 60 50 100" />
              </svg>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
