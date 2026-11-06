import type { ReactNode } from 'react';
import { motion } from 'motion/react';

// Irregular wax-drip outline: a circle with a gentle, deterministic wobble.
function waxPath(cx: number, cy: number, r: number) {
  const points = 36;
  let d = '';
  for (let i = 0; i <= points; i++) {
    const a = (i / points) * Math.PI * 2;
    const wobble = 1 + 0.045 * Math.sin(a * 7) + 0.03 * Math.cos(a * 11 + 1);
    const x = cx + Math.cos(a) * r * wobble;
    const y = cy + Math.sin(a) * r * wobble;
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d + 'Z';
}

const SEAL_OUTLINE = waxPath(50, 50, 46);

export function WaxSeal({ initials = ['S', 'H'], className = '' }: { initials?: [string, string] | string[]; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="seal-wax" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#f7e3a6" />
          <stop offset="35%" stopColor="#d9b46a" />
          <stop offset="75%" stopColor="#a77b33" />
          <stop offset="100%" stopColor="#6e4c18" />
        </radialGradient>
        <radialGradient id="seal-inner" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#e2c07a" />
          <stop offset="100%" stopColor="#a87d36" />
        </radialGradient>
      </defs>
      <path d={SEAL_OUTLINE} fill="url(#seal-wax)" />
      <circle cx="50" cy="50" r="33" fill="url(#seal-inner)" stroke="#7a561d" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="50" cy="50" r="29" fill="none" stroke="#fff3cf" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="1.5 2" />
      {/* Laurel sprigs */}
      <g fill="none" stroke="#7a561d" strokeOpacity="0.6" strokeWidth="0.8" strokeLinecap="round">
        <path d="M30 66 Q 50 78 70 66" />
        <path d="M36 69.5 q -3 -3 -1 -6 M43 72 q -2 -3.5 1 -6 M57 72 q 2 -3.5 -1 -6 M64 69.5 q 3 -3 1 -6" />
      </g>
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fontFamily="'Alex Brush', cursive"
        fontSize="26"
        fill="#5a3d10"
        style={{ filter: 'drop-shadow(0 0.6px 0 rgba(255,240,200,0.6))' }}
      >
        {initials[0]}
        <tspan fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="12" dx="1" dy="-3" fillOpacity="0.7">&amp;</tspan>
        <tspan dx="1" dy="3">{initials[1]}</tspan>
      </text>
    </svg>
  );
}

/** Symmetric gold flourish with a small diamond at its heart. */
export function GoldDivider({ className = '' }: { className?: string }) {
  const half = (
    <g fill="none" stroke="url(#div-gold)" strokeWidth="1.1" strokeLinecap="round">
      <path d="M182 20 L60 20" />
      <path d="M182 20 C 170 20 166 9 156 9 C 148 9 146 16 151 18.5 C 155 20.5 158 16 155 14" />
      <path d="M182 20 C 170 20 166 31 156 31 C 148 31 146 24 151 21.5 C 155 19.5 158 24 155 26" />
      <path d="M140 20 C 132 14 124 14 118 20" />
      <circle cx="112" cy="20" r="1.6" fill="#d9b46a" stroke="none" />
      <circle cx="58" cy="20" r="1.2" fill="#d9b46a" stroke="none" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="div-gold" x1="0" x2="1">
          <stop offset="0%" stopColor="#c9a45c" stopOpacity="0" />
          <stop offset="35%" stopColor="#c9a45c" />
          <stop offset="100%" stopColor="#f0d697" />
        </linearGradient>
      </defs>
      {half}
      <g transform="translate(400 0) scale(-1 1)">{half}</g>
      <path d="M200 11 L209 20 L200 29 L191 20 Z" fill="none" stroke="#e2c07a" strokeWidth="1.1" />
      <path d="M200 15.5 L204.5 20 L200 24.5 L195.5 20 Z" fill="#d9b46a" />
    </svg>
  );
}

/** Gold divider with a small wax seal sitting on it — used between sections. */
export function SealDivider() {
  return (
    <div className="relative z-10 flex items-center justify-center py-6" aria-hidden="true">
      <GoldDivider className="w-[min(88vw,520px)] h-auto opacity-90" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_6px_10px_rgba(10,29,92,0.3)]">
        <WaxSeal className="w-full h-full" />
      </div>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, className = '' }: { eyebrow: string; title: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9 }}
      className={`flex flex-col items-center text-center ${className}`}
    >
      <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.5em] uppercase text-gold-deep mb-3 pl-[0.5em]">
        {eyebrow}
      </p>
      <h2 className="font-vibes text-5xl sm:text-6xl leading-tight gold-foil pb-2 px-2">{title}</h2>
      <GoldDivider className="w-48 sm:w-64 h-auto mt-3 opacity-80" />
    </motion.div>
  );
}

/** Corner flourish, drawn for the top-left corner; rotate for the others. */
export function CornerFlourish({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M4 56 L4 12 Q 4 4 12 4 L56 4" />
        <path d="M10 50 L10 16 Q 10 10 16 10 L50 10" strokeOpacity="0.5" />
        <path d="M4 22 C 14 22 22 14 22 4" />
        <path d="M16 16 C 20 20 26 20 28 16 C 30 12 26 9 23 11" />
        <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function FrameCorners({ className = 'text-gold', size = 'w-10 h-10 sm:w-14 sm:h-14', inset = 'inset-2 sm:inset-3' }: { className?: string; size?: string; inset?: string }) {
  return (
    <div className={`absolute ${inset} pointer-events-none ${className}`} aria-hidden="true">
      <CornerFlourish className={`absolute top-0 left-0 ${size}`} />
      <CornerFlourish className={`absolute top-0 right-0 ${size} -scale-x-100`} />
      <CornerFlourish className={`absolute bottom-0 left-0 ${size} -scale-y-100`} />
      <CornerFlourish className={`absolute bottom-0 right-0 ${size} -scale-100`} />
    </div>
  );
}

/** Fixed royal-blue backdrop with gold lattice, vignette and slow twinkles. */
export function RoyalBackdrop() {
  const sparkles = [
    [8, 14, 0], [22, 70, 1.2], [38, 28, 2.4], [55, 85, 0.6], [68, 12, 3.1],
    [80, 52, 1.8], [92, 30, 2.8], [15, 45, 3.6], [47, 58, 0.9], [88, 88, 2.1],
  ];
  return (
    <div className="royal-backdrop" aria-hidden="true">
      <div className="royal-damask" />
      {sparkles.map(([x, y, delay], i) => (
        <span
          key={i}
          className="twinkle absolute block w-1 h-1 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(201,164,92,0.5)]"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
