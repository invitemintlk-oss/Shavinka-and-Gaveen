import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 32,
    hours: 8,
    minutes: 24,
    seconds: 18
  });

  useEffect(() => {
    const targetDate = new Date('2027-01-29T09:20:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const units = [
    { label: 'Days', value: formatNumber(timeLeft.days) },
    { label: 'Hours', value: formatNumber(timeLeft.hours) },
    { label: 'Minutes', value: formatNumber(timeLeft.minutes) },
    { label: 'Seconds', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <section className="relative bg-[#E8D8BC] py-32 px-6 border-t border-[#B79A63]/30 overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-texture-paper opacity-50 mix-blend-multiply pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        
        <h2 className="font-serif text-3xl md:text-4xl text-[#3C2B25] uppercase tracking-[0.2em] mb-16 text-center">
          Until we say "I do"
        </h2>

        {/* Vintage Ornamental Frame with Clock behind it */}
        <div className="relative flex justify-center items-center p-8 md:p-16">
          
          {/* Subtle pocket watch mechanism illustration (SVG) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-[120%] h-[120%] md:w-[80%] md:h-[80%] stroke-[#3C2B25] fill-none">
              <circle cx="100" cy="100" r="90" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="80" strokeWidth="1" />
              <circle cx="100" cy="100" r="10" strokeWidth="2" />
              <path d="M100 100 L100 40" strokeWidth="2" />
              <path d="M100 100 L140 100" strokeWidth="3" />
              {/* Roman Numerals marks */}
              {[...Array(12)].map((_, i) => (
                <line key={i} x1="100" y1="20" x2="100" y2="25" transform={`rotate(${i * 30} 100 100)`} strokeWidth="2" />
              ))}
            </svg>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-[#FAF4E7] border border-[#B79A63] p-8 md:p-12 shadow-[0_10px_30px_rgba(60,43,37,0.1)] flex flex-col items-center"
          >
            {/* Inner ornamental corners */}
            <div className="vintage-corners-inner absolute inset-2"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative z-10">
              {units.map((unit, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center">
                  <div className="flex flex-col items-center justify-center w-24">
                    <span className="font-serif text-5xl md:text-6xl text-[#681F2B] mb-2">{unit.value}</span>
                    <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#3C2B25]/80">{unit.label}</span>
                  </div>
                  
                  {index < units.length - 1 && (
                    <div className="hidden md:flex items-center justify-center text-[#B79A63] mx-2">
                       <svg viewBox="0 0 10 10" className="w-2 h-2 fill-current">
                         <circle cx="5" cy="5" r="3" />
                       </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
