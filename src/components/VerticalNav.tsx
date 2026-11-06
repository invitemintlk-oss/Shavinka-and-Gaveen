import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'section-couple', label: '01 — THE COUPLE' },
  { id: 'section-evening', label: '02 — THE EVENING' },
  { id: 'section-venue', label: '03 — THE VENUE' },
  { id: 'section-rsvp', label: '04 — RSVP' },
];

export function VerticalNav() {
  const [activeId, setActiveId] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentId = '';
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentId = item.id;
          }
        }
      }
      
      if (currentId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Vertical Nav */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-16 lg:w-20 xl:w-24 flex-col justify-center items-center z-40 border-r border-[#B79A63]/30 bg-[#F3E9D5]/90 backdrop-blur-md">
        <div className="flex flex-col gap-16 items-center w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="writing-mode-vertical rotate-180 text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 flex items-center gap-4 hover:text-[#681F2B] w-full justify-center"
              style={{
                color: activeId === item.id ? '#681F2B' : '#3C2B25',
                opacity: activeId === item.id ? 1 : 0.6
              }}
            >
              {item.label}
              {activeId === item.id && (
                <div className="mt-2 w-4 h-4 opacity-80 flex items-center justify-center">
                  <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-[#681F2B]">
                     <path d="M25 50 Q 25 30 10 20 Q 20 10 25 25 Q 30 10 40 20 Q 25 30 25 50" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-6 right-6 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 rounded-full border border-[#B79A63]/60 bg-[#E8D8BC] shadow-lg flex items-center justify-center text-[#681F2B] relative hover:scale-105 transition-transform"
        >
          <div className="absolute inset-1 border border-[#681F2B]/30 rounded-full pointer-events-none border-dashed" />
          {isMobileMenuOpen ? <X size={20} className="relative z-10" /> : <Menu size={20} className="relative z-10" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#E8D8BC]/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-10 bg-texture-paper"
          >
            {navItems.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                onClick={() => scrollToSection(item.id)}
                className="text-sm tracking-[0.3em] uppercase transition-colors duration-300 flex flex-col items-center gap-3"
                style={{
                  color: activeId === item.id ? '#681F2B' : '#3C2B25',
                  opacity: activeId === item.id ? 1 : 0.6
                }}
              >
                {item.label}
                {activeId === item.id && (
                  <div className="w-6 h-6 opacity-80 mt-1">
                    <svg viewBox="0 0 50 50" className="w-full h-full fill-none stroke-[#681F2B]">
                       <path d="M25 50 Q 25 30 10 20 Q 20 10 25 25 Q 30 10 40 20 Q 25 30 25 50" />
                    </svg>
                  </div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
