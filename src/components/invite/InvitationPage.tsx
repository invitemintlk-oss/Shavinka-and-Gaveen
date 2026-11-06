import { Fragment, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, MapPin, Phone } from 'lucide-react';
import { InvitationCard, Mandala } from './InvitationCard';
import { GoldDivider } from '../royal/Ornaments';
import { BRIDE_NAME, GROOM_NAME, WEDDING, buildInviteSentence } from '../../config';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function Action({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="gold-pill inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#4a3510]"
    >
      {icon}
      {children}
    </a>
  );
}

export function InvitationPage({ guestName, musicButton }: { guestName: string; musicButton: ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center px-3 sm:px-6 pt-10 sm:pt-14 pb-16">
      <motion.header {...fadeUp(0.1)} className="text-center max-w-xl px-2">
        {guestName ? (
          <>
            <p className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.55em] uppercase text-[#9a7432] pl-[0.55em]">A personal invitation for</p>
            <p className="font-greatvibes text-5xl sm:text-6xl gold-script gold-shimmer leading-tight pb-1 mt-1">{guestName}</p>
            <GoldDivider className="w-56 sm:w-72 h-auto mx-auto my-2 opacity-90" />
            <p className="font-cormorant italic text-lg sm:text-xl text-[#5b4521] leading-snug">{buildInviteSentence(guestName)}</p>
          </>
        ) : (
          <>
            <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.5em] uppercase text-[#9a7432] pl-[0.5em]">You are cordially invited</p>
            <p className="font-greatvibes text-5xl sm:text-6xl gold-script gold-shimmer leading-tight mt-2 pb-1">
              {BRIDE_NAME} &amp; {GROOM_NAME}
            </p>
            <GoldDivider className="w-56 sm:w-72 h-auto mx-auto mt-2 opacity-90" />
          </>
        )}
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="card-float relative mt-7 sm:mt-9 w-full max-w-[640px]"
      >
        {/* Slowly turning mandala halo behind the card */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[135%] aspect-square pointer-events-none" aria-hidden="true">
          <Mandala className="halo-spin w-full h-full opacity-[0.16]" />
        </div>
        <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(closest-side,rgba(240,200,110,0.5),transparent)] blur-2xl pointer-events-none" />
        <div className="relative shadow-[0_34px_70px_-14px_rgba(90,64,12,0.45),0_0_0_1px_rgba(201,162,74,0.45),0_0_0_7px_rgba(255,250,235,0.55),0_0_0_8px_rgba(201,162,74,0.35)]">
          <InvitationCard guestName={guestName} />
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.9)} className="mt-9 grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 w-full max-w-[640px]">
        <Action href={WEDDING.calendarUrl} icon={<CalendarPlus size={15} />}>Save the date</Action>
        <Action href={WEDDING.mapsUrl} icon={<MapPin size={15} />}>Directions</Action>
        {WEDDING.rsvp.map((r) => (
          <Fragment key={r.phone}>
            <Action href={`tel:${r.phone}`} icon={<Phone size={14} />}>RSVP {r.name}</Action>
          </Fragment>
        ))}
      </motion.div>

      <motion.div {...fadeUp(1.1)} className="mt-12"><GoldDivider className="w-56 h-auto opacity-80" /></motion.div>
      <motion.p {...fadeUp(1.2)} className="mt-2 font-greatvibes text-4xl gold-script gold-shimmer pb-1">With love</motion.p>
      <motion.p {...fadeUp(1.3)} className="font-cinzel text-xs tracking-[0.35em] uppercase text-[#7a5d22] mt-1 pl-[0.35em]">
        {BRIDE_NAME} &amp; {GROOM_NAME}
      </motion.p>

      <p className="text-[#9a7432] text-[11px] mt-12 font-sans tracking-wider text-center px-6">
        Want a beautiful wedding website like this? Create yours with{' '}
        <a target="_blank" rel="noreferrer" className="text-[#5b4521] hover:text-[#c9a24a] underline underline-offset-2" href="https://wa.me/94707819074">
          invitemint
        </a>
      </p>

      <div className="fixed right-4 bottom-5 sm:right-8 sm:bottom-8 z-50">{musicButton}</div>
    </div>
  );
}
