import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RSVPForm } from './RSVPForm';

export function RSVPSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="min-h-screen bg-[#F3E9D5] relative flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden border-t border-[#B79A63]/30">
      <div className="absolute inset-0 bg-texture-paper opacity-50 mix-blend-multiply pointer-events-none"></div>
      
      {/* Decorative Burgundy Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="w-full max-w-3xl border-2 border-[#681F2B] p-8 md:p-16 relative flex flex-col items-center text-center bg-[#FAF4E7] shadow-[0_10px_40px_rgba(60,43,37,0.1)]"
      >
        {/* Inner thin border */}
        <div className="absolute inset-2 border border-[#681F2B]/40 pointer-events-none"></div>

        {/* Vintage botanical top */}
        <div className="w-12 h-12 mb-8 opacity-80">
          <svg viewBox="0 0 100 100" className="w-8 h-8 fill-none stroke-[#681F2B]" strokeWidth="2">
             <path d="M50 100 Q 50 60 20 50 Q 50 40 50 0 Q 50 40 80 50 Q 50 60 50 100" />
          </svg>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-[#681F2B] uppercase tracking-[0.2em] mb-8">
          Kindly Join Us
        </h2>

        <p className="font-serif italic text-xl md:text-3xl text-[#3C2B25] mb-8 max-w-md">
          Your presence would make our celebration complete.
        </p>

        <p className="font-sans text-xs md:text-sm tracking-[0.2em] text-[#3C2B25] uppercase mb-12 font-medium">
          Please RSVP by 31 December 2026
        </p>

        {/* Vintage Seal/Label Button */}
        <button 
          onClick={() => setIsFormOpen(true)}
          className="relative group bg-[#681F2B] text-[#FAF4E7] px-12 py-4 shadow-xl border border-[#7D3942] hover:-translate-y-1 transition-transform"
        >
          {/* Inner dash border for printed label effect */}
          <div className="absolute inset-1 border border-[#FAF4E7]/30 border-dashed pointer-events-none"></div>
          <span className="font-sans text-sm tracking-[0.3em] uppercase relative z-10">RSVP</span>
        </button>

      </motion.div>

      <AnimatePresence>
        {isFormOpen && (
          <RSVPForm onClose={() => setIsFormOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
