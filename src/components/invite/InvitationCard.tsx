import type { CSSProperties } from 'react';
import { BRIDE_NAME, GROOM_NAME, WEDDING } from '../../config';
import { CornerFlourish } from '../royal/Ornaments';

/**
 * The printed invitation card, recreated in code.
 * Everything is sized in container units (cqw) so the card keeps its proportions at any width.
 * - `mini`: a fixed square (used inside the envelope); sizes scale purely with the card.
 * - `full`: the readable card; text never shrinks below a legible pixel size, so on phones the card grows taller.
 */
export function InvitationCard({ guestName = '', mini = false }: { guestName?: string; mini?: boolean }) {
  const fs = (cqw: number, minPx: number): CSSProperties => ({
    fontSize: mini ? `${cqw}cqw` : `max(${minPx}px, ${cqw}cqw)`,
  });

  return (
    <div
      className={`invite-card @container relative w-full overflow-hidden text-[#231c14] ${mini ? 'aspect-square' : ''}`}
      aria-label={`Wedding invitation of ${BRIDE_NAME} and ${GROOM_NAME}`}
    >
      {/* Gilded double frame with corner flourishes */}
      <div className="gilded-frame absolute inset-[1.5cqw] pointer-events-none" />
      <div className="absolute inset-[2.7cqw] border border-[#c9a24a]/55 pointer-events-none" />
      <div className="absolute inset-[3.3cqw] text-[#c9a24a] pointer-events-none" aria-hidden="true">
        <CornerFlourish className="absolute top-0 left-0 w-[8cqw] h-[8cqw]" />
        <CornerFlourish className="absolute top-0 right-0 w-[8cqw] h-[8cqw] -scale-x-100" />
        <CornerFlourish className="absolute bottom-0 right-0 w-[8cqw] h-[8cqw] -scale-100" />
      </div>

      <Mandala
        className={`absolute -left-[7cqw] -bottom-[7cqw] w-[31cqw] h-[31cqw] pointer-events-none ${
          mini ? '' : '@max-md:-left-[5cqw] @max-md:-bottom-[5cqw] @max-md:w-[22cqw] @max-md:h-[22cqw]'
        }`}
      />

      <div
        className={`relative flex flex-col items-center text-center font-cinzel font-semibold tracking-[0.06em] uppercase leading-[1.35] ${
          mini ? 'h-full justify-center px-[6cqw]' : 'px-[6cqw] pt-[8cqw] pb-[max(7cqw,4.5rem)]'
        }`}
      >
        <p style={fs(2.15, 10.5)}>{WEDDING.hosts[0]}</p>
        <p style={fs(1.6, 9)} className="my-[0.3cqw]">Together with</p>
        <p style={fs(2.15, 10.5)}>{WEDDING.hosts[1]}</p>

        <p style={fs(2.15, 10.5)} className="mt-[4cqw]">Request the gracious presence of</p>

        {/* The guest's name is written on the dotted line */}
        <div className="relative w-[82%] mt-[2.5cqw] h-[7.5cqw] min-h-[2.2rem] flex items-end justify-center">
          {guestName && (
            <span
              className={`font-greatvibes normal-case tracking-normal font-normal leading-none gold-script ${mini ? '' : 'gold-shimmer'} pb-[0.6cqw] px-2 whitespace-nowrap max-w-full truncate`}
              style={fs(5.6, 24)}
            >
              {guestName}
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 border-b-[0.35cqw] border-dotted border-[#3a2f22]/70" />
        </div>

        <p style={fs(2.15, 10.5)} className="mt-[1.4cqw]">To celebrate the marriage of their beloved children</p>

        {/* Bride & groom, offset like the printed card */}
        <div className="relative w-[46%] mt-[2.5cqw] font-greatvibes normal-case tracking-normal font-normal leading-[1.05]">
          <p className={`gold-script text-left -ml-[3cqw] ${mini ? '' : 'gold-shimmer'}`} style={fs(8.6, 46)}>{BRIDE_NAME}</p>
          <p className="gold-script -my-[1cqw]" style={fs(4.6, 24)}>&amp;</p>
          <p className={`gold-script text-right -mr-[6cqw] ${mini ? '' : 'gold-shimmer'}`} style={fs(8.6, 46)}>{GROOM_NAME}</p>
        </div>

        {/* Date | Venue | Time */}
        <div className="mt-[4cqw] w-full grid grid-cols-[auto_auto_auto] justify-center items-center gap-x-[3cqw]">
          <div className="flex flex-col items-center leading-[1.1]">
            <span style={fs(2.7, 11)}>{WEDDING.month}</span>
            <span className="font-cinzel font-medium leading-none my-[0.4cqw]" style={fs(5.8, 26)}>{WEDDING.day}</span>
            <span style={fs(2.5, 11)}>{WEDDING.year}</span>
          </div>
          <div
            className="self-stretch border-x-[0.25cqw] border-[#2b241b]/80 px-[3cqw] py-[1.6cqw] flex flex-col justify-center leading-[1.15]"
            style={fs(2.95, 12)}
          >
            {WEDDING.venueLines.map((line) => (
              <span key={line} className="whitespace-nowrap">{line}</span>
            ))}
          </div>
          <div className="flex flex-col items-center leading-[1.15]" style={fs(2.95, 12)}>
            <span>From</span>
            <span className="whitespace-nowrap">{WEDDING.arrival}</span>
            <span>Onwards</span>
          </div>
        </div>

        <p style={fs(1.75, 9.5)} className="mt-[5cqw]">(Poruwa ceremony at {WEDDING.poruwa})</p>

        <p style={fs(1.55, 9)} className="mt-[2.6cqw]">RSVP</p>
        <p style={fs(1.75, 9.5)} className="mt-[0.4cqw]">
          {WEDDING.rsvp.map((r, i) => (
            <span key={r.phone}>
              {i > 0 && <span className="mx-[1cqw]">|</span>}
              {mini ? (
                <>{r.phone} {r.name}</>
              ) : (
                <a href={`tel:${r.phone}`} className="hover:text-[#9a7432] transition-colors">{r.phone} {r.name}</a>
              )}
            </span>
          ))}
        </p>
      </div>

      {!mini && <div className="card-shine absolute inset-0 pointer-events-none" aria-hidden="true" />}
    </div>
  );
}

/** Gold line-art lotus mandala for the card's lower-left corner. */
export function Mandala({ className = '' }: { className?: string }) {
  const ring = (count: number, d: string, offset = 0) =>
    Array.from({ length: count }, (_, i) => (
      <path key={i} d={d} transform={`rotate(${(360 / count) * i + offset} 100 100)`} />
    ));

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mandala-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3d27a" />
          <stop offset="45%" stopColor="#c99a2e" />
          <stop offset="100%" stopColor="#e9c25c" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#mandala-gold)" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        {/* outer pointed petals */}
        {ring(12, 'M100 100 C 86 70 88 40 100 12 C 112 40 114 70 100 100 Z')}
        {/* inner veins of the outer petals */}
        {ring(12, 'M100 62 C 94 48 95 36 100 26 C 105 36 106 48 100 62 Z')}
        {/* middle rounded petals */}
        {ring(12, 'M100 100 C 80 82 84 56 100 46 C 116 56 120 82 100 100 Z', 15)}
        {/* inner petals */}
        {ring(8, 'M100 100 C 90 92 90 76 100 70 C 110 76 110 92 100 100 Z', 22.5)}
        <circle cx="100" cy="100" r="13" />
        <circle cx="100" cy="100" r="8" />
        <circle cx="100" cy="100" r="3" fill="url(#mandala-gold)" />
        {ring(24, 'M100 8 m -1.6 0 a 1.6 1.6 0 1 0 3.2 0 a 1.6 1.6 0 1 0 -3.2 0', 7.5)}
      </g>
    </svg>
  );
}
