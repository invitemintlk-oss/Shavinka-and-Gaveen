import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { MusicControl } from './components/MusicControl';
import { GoldDivider, RoyalBackdrop } from './components/royal/Ornaments';
import { Envelope, type EnvelopeStage } from './components/invite/Envelope';
import { InvitationPage } from './components/invite/InvitationPage';
import { FallingPetals, FlyingButterflies } from './components/invite/PetalsAndButterflies';
import { BRIDE_NAME, GROOM_NAME, getGuestNameFromUrl } from './config';

type Stage = EnvelopeStage | 'card';

// Card side inside the envelope; keep in sync with --S in index.css.
const envelopeSide = () => Math.min(window.innerWidth * 0.42, window.innerHeight * 0.34, 300);

export default function App() {
  const guestName = getGuestNameFromUrl();
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>('closed');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/bg-song.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const open = () => {
    if (stage !== 'closed') return;
    setStage('opening');
    setIsMusicPlaying(true);
    audioRef.current?.play().catch(() => setIsMusicPlaying(false));
    // Flaps finish at ~2.5s; hold the open envelope, then zoom into the card.
    setTimeout(() => setStage('open'), 2500);
    setTimeout(() => setStage('zoom'), 3400);
    setTimeout(() => {
      setStage('card');
      window.scrollTo(0, 0);
    }, 4400);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMusicPlaying) audio.pause();
    else audio.play().catch(console.error);
    setIsMusicPlaying(!isMusicPlaying);
  };

  const zoomScale = Math.min(window.innerWidth - 24, 640) / envelopeSide();
  const celebrating = stage === 'zoom' || stage === 'card';
  const small = typeof window !== 'undefined' && window.innerWidth < 640;

  return (
    <>
      <RoyalBackdrop />

      <AnimatePresence>
        {stage !== 'card' && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: stage === 'closed' ? 1 : 0, y: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute top-[7vh] sm:top-[8vh] inset-x-0 flex flex-col items-center text-center px-4"
            >
              <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.55em] uppercase text-[#9a7432] mb-2 pl-[0.55em]">
                {guestName ? 'Dear' : 'The wedding of'}
              </p>
              <h1 className="font-greatvibes gold-script gold-shimmer text-5xl sm:text-6xl leading-tight px-2 pb-1">
                {guestName || `${BRIDE_NAME} & ${GROOM_NAME}`}
              </h1>
              <GoldDivider className="w-52 sm:w-64 h-auto my-1 opacity-90" />
              <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[#5b4521]/85 pl-[0.4em]">
                You are invited
              </p>
            </motion.div>

            <div className="intro-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(120vw,900px)] aspect-square rounded-full pointer-events-none" aria-hidden="true" />
            <div className="mt-[8vh]">
              <Envelope stage={stage as EnvelopeStage} guestName={guestName} onOpen={open} zoomScale={zoomScale} />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 'closed' ? 1 : 0 }}
              transition={{ duration: 0.8, delay: stage === 'closed' ? 1.2 : 0 }}
              className="hint-pulse absolute bottom-[7vh] sm:bottom-[8vh] inset-x-0 text-center font-cinzel text-[11px] sm:text-xs tracking-[0.45em] uppercase text-[#5b4521] pl-[0.45em]"
            >
              Tap the seal to open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {stage === 'card' && (
        <InvitationPage
          guestName={guestName}
          musicButton={<MusicControl isMusicPlaying={isMusicPlaying} toggleMusic={toggleMusic} />}
        />
      )}

      {/* Kept on even with "reduce motion" (common on Windows), just lighter. */}
      {celebrating && (
        <>
          <FallingPetals count={reduceMotion ? 10 : small ? 18 : 30} />
          <FlyingButterflies count={reduceMotion ? 2 : small ? 4 : 6} />
        </>
      )}
    </>
  );
}
