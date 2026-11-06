import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { getGuestNameFromUrl, RSVP_SCRIPT_URL } from '../config';

interface RSVPFormProps {
  onClose: () => void;
}

export function RSVPForm({ onClose }: RSVPFormProps) {
  const invitedAs = getGuestNameFromUrl();
  const [name, setName] = useState(invitedAs);
  const [guests, setGuests] = useState('');
  const [attendance, setAttendance] = useState<'accepts' | 'declines' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendance) return;
    setIsSubmitting(true);

    try {
      const payload = new URLSearchParams({
        invitedAs,
        name: name.trim(),
        guests: attendance === 'declines' ? '0' : guests,
        attendance: attendance === 'accepts' ? 'Attending' : 'Not attending',
      });

      // Apps Script does not return CORS headers, so the response is opaque; a network failure still throws.
      await Promise.all([
        fetch(RSVP_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: payload }),
        new Promise((resolve) => setTimeout(resolve, 1500)), // let the seal animation play
      ]);

      toast.success('Thank you for your response');
      onClose();
    } catch (error) {
      console.error('RSVP submit failed:', error);
      toast.error('Could not send your response. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-[#3C2B25]/60 backdrop-blur-sm" onClick={!isSubmitting ? onClose : undefined} />

      <motion.div
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg bg-texture-paper relative flex flex-col shadow-2xl overflow-hidden max-h-[90vh]"
      >
        <div className="absolute inset-2 md:inset-4 border-2 border-[#681F2B] pointer-events-none"></div>
        <div className="absolute inset-3 md:inset-5 border border-[#681F2B]/30 pointer-events-none"></div>

        <div className="relative flex justify-between items-center p-6 md:p-10 pb-4">
          <h2 className="font-serif text-2xl md:text-3xl text-[#681F2B] uppercase tracking-widest text-center w-full">Your Response</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute right-6 md:right-10 top-6 md:top-10 text-[#3C2B25]/60 hover:text-[#681F2B] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 pt-4 custom-scrollbar">
          <AnimatePresence mode="wait">
            {!isSubmitting ? (
              <motion.form
                key="form"
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 relative z-10"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="rsvp-name" className="font-sans text-xs tracking-[0.2em] text-[#3C2B25] uppercase text-center">Your Name</label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-[#B79A63]/50 pb-2 text-[#3C2B25] font-serif text-xl md:text-2xl text-center focus:outline-none focus:border-[#681F2B] transition-colors placeholder:text-[#3C2B25]/30"
                    placeholder="e.g. Mr. Sanjaya"
                  />
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  <label className="font-sans text-xs tracking-[0.2em] text-[#3C2B25] uppercase text-center">Will you join us?</label>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendance('accepts')}
                      className={`w-full flex items-center justify-center p-4 border transition-all duration-300 ${
                        attendance === 'accepts'
                          ? 'border-[#681F2B] bg-[#681F2B]/5 text-[#681F2B]'
                          : 'border-[#B79A63]/50 text-[#3C2B25]/80 hover:border-[#681F2B]/50'
                      }`}
                    >
                      <span className="font-serif italic text-lg md:text-xl">Delighted to attend</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('declines')}
                      className={`w-full flex items-center justify-center p-4 border transition-all duration-300 ${
                        attendance === 'declines'
                          ? 'border-[#681F2B] bg-[#681F2B]/5 text-[#681F2B]'
                          : 'border-[#B79A63]/50 text-[#3C2B25]/80 hover:border-[#681F2B]/50'
                      }`}
                    >
                      <span className="font-serif italic text-lg md:text-xl">Sorry to miss it</span>
                    </button>
                  </div>
                </div>

                {attendance === 'accepts' && (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rsvp-guests" className="font-sans text-xs tracking-[0.2em] text-[#3C2B25] uppercase text-center">Number of Guests</label>
                    <input
                      id="rsvp-guests"
                      type="number"
                      min="1"
                      max="10"
                      required
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-transparent border-b border-[#B79A63]/50 pb-2 text-[#3C2B25] font-serif text-xl md:text-2xl text-center focus:outline-none focus:border-[#681F2B] transition-colors placeholder:text-[#3C2B25]/30"
                      placeholder="2"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!attendance}
                  className="mt-6 w-full bg-[#681F2B] text-[#FAF4E7] py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#7D3942] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-[#681F2B]"
                >
                  Send Response
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="seal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[300px] relative z-10"
              >
                {/* Wax seal animation */}
                <motion.div
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  className="w-24 h-24 rounded-full bg-[#681F2B] shadow-xl flex items-center justify-center border-2 border-[#7D3942] mb-6"
                >
                   <span className="font-serif text-[#FAF4E7] text-3xl">B&A</span>
                </motion.div>
                <p className="font-serif italic text-xl text-[#3C2B25]">Sealing your response...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
