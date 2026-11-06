import React, { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { FloatingPetals } from './FloatingPetals';
import { getGuestNameFromUrl } from '../config';

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const guestName = getGuestNameFromUrl();

  const handleStart = () => {
    setIsOpening(true);
    if (onMusicStart) onMusicStart();
    
    setTimeout(() => setShowPetals(true), 600);

    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div 
          exit={{ opacity: 0, scale: 1.05 }} 
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
          className="fixed inset-0 bg-texture-paper flex items-center justify-center overflow-hidden z-[100]"
        >
          {showPetals && <FloatingPetals count={8} maxDelay={0} />}

          <div className="w-full flex flex-col items-center">
          {guestName && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col items-center text-center px-6 mb-10 sm:mb-12 max-w-md"
            >
              <span className="font-script text-4xl sm:text-5xl text-[#681F2B] leading-tight">{guestName}</span>
            </motion.div>
          )}

          <div className="relative w-[90%] max-w-md aspect-[4/3] flex items-center justify-center">
            {/* Envelope Back (behind card) */}
            <motion.div 
              className="absolute inset-0 bg-[#FAF4E7] shadow-xl border border-[#E8D8BC]"
            />
            
            {/* The Card Sliding Up */}
            <motion.div 
              animate={isOpening ? { y: -150, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              className="absolute inset-2 bg-texture-paper vintage-border flex flex-col items-center justify-center"
            >
              <div className="vintage-corners-inner absolute inset-2" />
              <div className="text-center">
                <h2 className="font-serif text-[#3C2B25] text-xl sm:text-2xl italic tracking-wider mb-2">Sasith & Himashi</h2>
              </div>
            </motion.div>

            {/* Envelope Front Flaps (bottom, left, right) */}
            <div className="absolute inset-0 pointer-events-none">
               <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="w-full h-full drop-shadow-md">
                 <path d="M0,0 L200,150 L400,0 L400,300 L0,300 Z" fill="#FAF4E7" stroke="#E8D8BC" strokeWidth="1" />
                 <path d="M0,0 L200,150 L400,0" fill="none" stroke="#B79A63" strokeWidth="2" strokeDasharray="4 2" />
               </svg>
            </div>

            {/* Envelope Top Flap */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-[60%] origin-top z-20 flex justify-center"
              animate={isOpening ? { rotateX: -180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 backface-hidden">
                <svg viewBox="0 0 400 180" preserveAspectRatio="none" className="w-full h-full drop-shadow-lg">
                  <path d="M0,0 L400,0 L200,180 Z" fill="#FAF4E7" stroke="#E8D8BC" strokeWidth="1" />
                  <path d="M0,0 L200,180 L400,0" fill="none" stroke="#B79A63" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-[#681F2B] rotate-180" style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}>
                <svg viewBox="0 0 400 180" preserveAspectRatio="none" className="w-full h-full">
                  <path d="M0,180 L400,180 L200,0 Z" fill="#681F2B" />
                </svg>
              </div>
              
              {/* Wax Seal */}
              <motion.button
                onClick={handleStart}
                animate={isOpening ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#681F2B] shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border border-[#7D3942]"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="font-serif text-[#FAF4E7] text-lg">B&A</span>
                </div>
              </motion.button>
            </motion.div>
          </div>
          </div>

          {!isOpening && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <p className="font-sans text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] text-[#3C2B25] uppercase mb-2 whitespace-nowrap">Open the invitation</p>
              <motion.div 
                animate={{ y: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-[1px] h-12 bg-gradient-to-b from-[#B79A63] to-transparent"
              />
            </motion.div>
          )}

        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
