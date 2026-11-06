import { useId } from 'react';
import { motion } from 'motion/react';
import { InvitationCard } from './InvitationCard';
import { WaxSeal } from '../royal/Ornaments';
import { BRIDE_NAME, GROOM_NAME } from '../../config';

/*
 * The four-flap "lotus" envelope from the design.
 * The card is a square of side S (CSS var --S). Each flap is drawn as the TOP flap, hinged on the
 * card's top edge, and a wrapper rotates it 0/90/180/270° to reach the other sides.
 * Closed: every flap is folded over the card (rotateX -180°). Opening swings each one out toward
 * the viewer and lays it flat around the card.
 *
 * Flap artwork lives in a viewBox of -16..116 × -2..62 where the hinge runs from (0,62) to (100,62)
 * and the tip sits at (50,0). So the flap box is 1.32S wide and 0.64S tall.
 */

const OUTLINE = 'M0 62 C-14 50 -16 30 8 24 C30 18 44 12 50 0 C56 12 70 18 92 24 C116 30 114 50 100 62';
const INNER_SCALES = [0.82, 0.66, 0.5, 0.34];

function Flap({ id }: { id: string }) {
  return (
    <svg viewBox="-16 -2 132 64" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#fffdf2" />
          <stop offset="100%" stopColor="#f8efcc" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7dd78" />
          <stop offset="30%" stopColor="#c8961f" />
          <stop offset="55%" stopColor="#fbe58f" />
          <stop offset="80%" stopColor="#a8770f" />
          <stop offset="100%" stopColor="#e9c450" />
        </linearGradient>
      </defs>
      <path d={`${OUTLINE} Z`} fill={`url(#${id}-fill)`} />
      {/* Concentric gold lines converging on the hinge */}
      {INNER_SCALES.map((k) => (
        <path
          key={k}
          d={OUTLINE}
          fill="none"
          stroke="#d4ad45"
          strokeOpacity={0.9}
          strokeWidth={0.55 / k}
          transform={`translate(50 62) scale(${k}) translate(-50 -62)`}
        />
      ))}
      {/* Thick foil rim with a fine dark keyline inside */}
      <path d={OUTLINE} fill="none" stroke={`url(#${id}-rim)`} strokeWidth="3.2" strokeLinejoin="round" />
      <path
        d={OUTLINE}
        fill="none"
        stroke="#6b4c0c"
        strokeOpacity="0.75"
        strokeWidth={0.5 / 0.95}
        transform="translate(50 62) scale(0.95) translate(-50 -62)"
      />
    </svg>
  );
}

// Paint order: right, left, bottom, top — the last one painted is folded on top, so it opens first.
const FLAPS = [
  { side: 'right', turn: 90, delay: 1.0 },
  { side: 'left', turn: 270, delay: 0.78 },
  { side: 'bottom', turn: 180, delay: 0.48 },
  { side: 'top', turn: 0, delay: 0.2 },
] as const;

export type EnvelopeStage = 'closed' | 'opening' | 'open' | 'zoom';

export function Envelope({
  stage,
  guestName,
  onOpen,
  zoomScale,
}: {
  stage: EnvelopeStage;
  guestName: string;
  onOpen: () => void;
  zoomScale: number;
}) {
  const uid = useId().replace(/:/g, '');
  const isOpen = stage !== 'closed';
  // Phones get a bigger closed envelope; it shrinks back to 1 so the opened flaps still fit.
  const closedScale = window.innerWidth < 640 ? 1.5 : 1.28;
  const scale = stage === 'closed' ? closedScale : stage === 'zoom' ? zoomScale : 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1, y: 20 }}
      animate={{ opacity: 1, scale, y: 0 }}
      transition={{
        opacity: { duration: 1 },
        y: { duration: 1 },
        scale: stage === 'zoom' ? { duration: 1.1, ease: [0.65, 0, 0.35, 1] } : { duration: 1.6, ease: [0.33, 1, 0.68, 1] },
      }}
      className="envelope relative"
      style={{ width: 'var(--S)', height: 'var(--S)' }}
    >
      {/* Soft shadow on the "table" */}
      <motion.div
        animate={{ opacity: stage === 'zoom' ? 0 : 1 }}
        className="absolute -inset-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(120,86,20,0.22),transparent)] blur-xl pointer-events-none"
      />

      {/* The card waiting inside */}
      <div className="absolute inset-0 shadow-[0_6px_18px_rgba(90,64,12,0.25)]">
        <InvitationCard guestName={guestName} mini />
      </div>

      {FLAPS.map(({ side, turn, delay }) => (
        <div key={side} className="absolute inset-0 pointer-events-none" style={{ transform: `rotate(${turn}deg)` }}>
          <motion.div
            initial={false}
            animate={{
              rotateX: isOpen ? 0 : -180,
              opacity: stage === 'zoom' ? 0 : 1,
              y: stage === 'zoom' ? '-35%' : '0%',
            }}
            transition={{
              rotateX: { duration: 1.25, delay: isOpen ? delay : 0, ease: [0.45, 0.05, 0.25, 1] },
              opacity: { duration: 0.7 },
              y: { duration: 1.1, ease: 'easeIn' },
            }}
            className="absolute"
            style={{
              left: 'calc(var(--S) * -0.16)',
              top: 'calc(var(--S) * -0.64)',
              width: 'calc(var(--S) * 1.32)',
              height: 'calc(var(--S) * 0.64)',
              transformOrigin: '50% 100%',
              transformPerspective: 1100,
              filter: 'drop-shadow(0 2px 3px rgba(90,64,12,0.28))',
            }}
          >
            <Flap id={`${uid}-${side}`} />
          </motion.div>
        </div>
      ))}

      {/* Wax seal holding the flaps; tapping it opens the envelope */}
      <motion.button
        type="button"
        onClick={onOpen}
        disabled={isOpen}
        initial={false}
        animate={isOpen ? { scale: 1.35, opacity: 0, rotate: -12 } : { scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={isOpen ? undefined : { scale: 1.07 }}
        whileTap={isOpen ? undefined : { scale: 0.94 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full cursor-pointer disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a24a]"
        aria-label="Open the invitation"
      >
        <span className="seal-glow absolute -inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(255,226,140,0.7)_0%,rgba(255,226,140,0)_65%)] blur-md" />
        <WaxSeal initials={[BRIDE_NAME[0], GROOM_NAME[0]]} className="relative w-full h-full drop-shadow-[0_6px_8px_rgba(90,60,10,0.45)]" />
      </motion.button>
    </motion.div>
  );
}
