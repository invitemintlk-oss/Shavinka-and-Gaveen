import { Fragment, useMemo, useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';

/* ---------------- Petals ---------------- */

const PETAL_COLORS = [
  ['#fbd3dc', '#f2a7b8'], // blush
  ['#fff6e6', '#f3dcb4'], // ivory
  ['#f7c9d2', '#e58da2'], // rose
  ['#fbe3a6', '#e0b553'], // gold
  ['#ffe9ef', '#f6bfcd'], // pale pink
] as const;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function Petal({ colors, id }: { colors: readonly [string, string]; id: string }) {
  return (
    <svg viewBox="0 0 30 34" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </radialGradient>
      </defs>
      <path d="M15 33 C 4 26 0 14 4 6 C 7 0 13 1 15 6 C 17 1 23 0 26 6 C 30 14 26 26 15 33 Z" fill={`url(#${id})`} />
      <path d="M15 31 C 14 22 14 14 15 8" stroke={colors[1]} strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

export function FallingPetals({ count }: { count: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        i,
        left: rand(0, 100),
        size: rand(12, 26),
        fall: rand(9, 17),
        // The first wave starts almost at once (negative delays start mid-fall), the rest trickle in.
        delay: i < count / 2 ? rand(-6, 0.5) : rand(0, 10),
        sway: rand(2.6, 4.6),
        swayX: rand(30, 90),
        spin: rand(3, 7),
        colors: PETAL_COLORS[i % PETAL_COLORS.length],
      })),
    [count],
  );

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.i}
          className="petal-fall absolute top-0"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.13, animationDuration: `${p.fall}s`, animationDelay: `${p.delay}s` }}
        >
          <div
            className="petal-sway w-full h-full"
            style={{ '--sway-x': `${p.swayX}px`, animationDuration: `${p.sway}s`, animationDelay: `${p.delay}s` } as CSSProperties}
          >
            <div className="petal-spin w-full h-full" style={{ animationDuration: `${p.spin}s` }}>
              <Petal colors={p.colors} id={`petal-${p.i}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Butterflies ---------------- */

const BUTTERFLY_COLORS = [
  { a: '#fbe7a1', b: '#d9a42e', edge: '#8a5f12' }, // gold
  { a: '#ffe1ea', b: '#ec9ab0', edge: '#a24563' }, // blush
  { a: '#fff4dc', b: '#e9c98a', edge: '#9a7432' }, // champagne
  { a: '#e6ecff', b: '#9fb3ea', edge: '#3e5aa8' }, // soft blue accent
] as const;

function Wing({ side, c, id }: { side: 'l' | 'r'; c: (typeof BUTTERFLY_COLORS)[number]; id: string }) {
  // Drawn as the right wing; mirrored for the left one.
  return (
    <svg viewBox="0 0 30 40" className={`w-full h-full ${side === 'l' ? '-scale-x-100' : ''}`} aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="10%" cy="50%" r="95%">
          <stop offset="0%" stopColor={c.a} />
          <stop offset="100%" stopColor={c.b} />
        </radialGradient>
      </defs>
      {/* fore wing */}
      <path d="M1 20 C 4 6 16 -2 27 3 C 31 6 28 15 20 19 C 13 22 6 21 1 20 Z" fill={`url(#${id})`} stroke={c.edge} strokeWidth="0.9" />
      {/* hind wing */}
      <path d="M1 21 C 8 22 18 24 21 31 C 23 37 16 40 11 37 C 5 33 2 27 1 21 Z" fill={`url(#${id})`} stroke={c.edge} strokeWidth="0.9" />
      <circle cx="20" cy="9" r="2.2" fill="#fff" fillOpacity="0.65" />
      <circle cx="13" cy="30" r="1.6" fill="#fff" fillOpacity="0.55" />
    </svg>
  );
}

type Flight = { x: number[]; y: number[]; rotate: number[]; duration: number };

function makeFlight(fromX?: number, fromY?: number): Flight {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = [fromX ?? rand(-0.1, 1.1) * w];
  const y = [fromY ?? rand(0.1, 0.9) * h];
  for (let i = 0; i < 5; i++) {
    x.push(rand(0.05, 0.95) * w);
    y.push(rand(0.08, 0.92) * h);
  }
  // Lean into the direction of travel (the butterfly is drawn heading up).
  const rotate = x.map((_, i) => {
    if (i === 0) return 0;
    const dx = x[i] - x[i - 1];
    const dy = y[i] - y[i - 1];
    return (Math.atan2(dx, -dy) * 180) / Math.PI * 0.45;
  });
  return { x, y, rotate, duration: rand(16, 24) };
}

function Butterfly({ index }: { index: number }) {
  const c = BUTTERFLY_COLORS[index % BUTTERFLY_COLORS.length];
  const size = rand(30, 44);
  const [flight, setFlight] = useState(() => makeFlight());
  const flap = useMemo(() => rand(0.16, 0.24), []);

  return (
    <motion.div
      className="absolute left-0 top-0"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, x: flight.x[0], y: flight.y[0] }}
      animate={{ opacity: 1, x: flight.x, y: flight.y, rotate: flight.rotate }}
      transition={{
        opacity: { duration: 1.5, delay: index * 0.6 },
        default: { duration: flight.duration, ease: 'easeInOut', delay: index * 0.6 },
      }}
      onAnimationComplete={() => setFlight(makeFlight(flight.x.at(-1), flight.y.at(-1)))}
    >
      <div className="butterfly-bob w-full h-full flex items-center justify-center drop-shadow-[0_4px_4px_rgba(90,60,20,0.25)]">
        <div className="butterfly-wing w-1/2 h-full origin-right" style={{ animationDuration: `${flap}s` }}>
          <Wing side="l" c={c} id={`bf-${index}-l`} />
        </div>
        <div className="butterfly-wing w-1/2 h-full origin-left" style={{ animationDuration: `${flap}s` }}>
          <Wing side="r" c={c} id={`bf-${index}-r`} />
        </div>
        {/* body & antennae */}
        <svg viewBox="0 0 10 40" className="absolute h-full w-[20%]" aria-hidden="true">
          <ellipse cx="5" cy="22" rx="1.4" ry="11" fill={c.edge} />
          <path d="M5 11 C 4 6 2 4 1 2 M5 11 C 6 6 8 4 9 2" stroke={c.edge} strokeWidth="0.7" fill="none" />
        </svg>
      </div>
    </motion.div>
  );
}

export function FlyingButterflies({ count }: { count: number }) {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <Fragment key={i}>
          <Butterfly index={i} />
        </Fragment>
      ))}
    </div>
  );
}
