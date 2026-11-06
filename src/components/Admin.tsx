import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Link2, Copy, MessageCircle } from 'lucide-react';
import {
  GUEST_PREFIXES,
  GuestPrefix,
  GROOM_NAME,
  BRIDE_NAME,
  buildDisplayName,
  buildInviteLink,
  buildInviteMessage,
  buildInviteSentence,
} from '../config';

export function Admin() {
  const [prefix, setPrefix] = useState<GuestPrefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<{ displayName: string; link: string; message: string } | null>(null);

  const handleGenerate = () => {
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) {
      toast.error('Please enter a guest name');
      return;
    }
    const link = buildInviteLink(window.location.origin, displayName);
    setGenerated({ displayName, link, message: buildInviteMessage(displayName, link) });
  };

  const copy = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch {
      toast.error('Could not copy. Please copy it manually.');
    }
  };

  const labelClass = 'font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#3a2c14]/80 mb-2 block';
  const inputClass = 'w-full bg-[#fffdf4] border border-[#c9a24a]/60 px-4 py-3 font-sans text-[#3a2c14] focus:outline-none focus:border-[#8a6a1f] transition-colors';
  const buttonClass = 'inline-flex items-center justify-center gap-2 px-6 py-3 font-sans text-xs tracking-[0.2em] uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <div className="min-h-screen bg-[#fbf3df] bg-texture-paper text-[#3a2c14] flex flex-col items-center px-4 py-12 md:py-20">
      <Toaster position="top-center" theme="light" toastOptions={{
        style: { background: '#fffdf4', color: '#3a2c14', border: '1px solid #c9a24a' },
      }} />

      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#a5802b] mb-3">Admin</p>
          <h1 className="font-serif text-3xl md:text-5xl text-[#8a6a1f] uppercase tracking-[0.15em]">Invitation Links</h1>
          <p className="font-greatvibes text-3xl md:text-4xl text-[#b38a2c] mt-3">{GROOM_NAME} &amp; {BRIDE_NAME}</p>
        </div>

        <div className="bg-[#fffdf4] border border-[#c9a24a] shadow-[0_10px_30px_rgba(60,43,37,0.1)] p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5">
            <div>
              <label htmlFor="prefix" className={labelClass}>Prefix</label>
              <select
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value as GuestPrefix)}
                className={inputClass}
              >
                {GUEST_PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="guestName" className={labelClass}>Guest Name</label>
              <input
                id="guestName"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
                placeholder="e.g. Sanjaya"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleGenerate}
              className={`${buttonClass} bg-[#8a6a1f] text-[#fffdf4] border border-[#a5802b] hover:bg-[#a5802b]`}
            >
              <Link2 size={14} /> Generate Link
            </button>
            <button
              onClick={() => generated && copy(generated.link, 'Link copied!')}
              disabled={!generated}
              className={`${buttonClass} border border-[#8a6a1f] text-[#8a6a1f] hover:enabled:bg-[#8a6a1f]/5`}
            >
              <Copy size={14} /> Copy Link Only
            </button>
            <button
              onClick={() => generated && copy(generated.message, 'Message copied!')}
              disabled={!generated}
              className={`${buttonClass} border border-[#8a6a1f] text-[#8a6a1f] hover:enabled:bg-[#8a6a1f]/5`}
            >
              <MessageCircle size={14} /> Copy Full Message
            </button>
          </div>
        </div>

        {generated && (
          <div className="mt-8 flex flex-col gap-6">
            <div className="bg-[#fffdf4] border border-[#c9a24a]/60 p-6">
              <p className={labelClass}>Invitation Link</p>
              <a
                href={generated.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm md:text-base text-[#8a6a1f] underline underline-offset-4 break-all"
              >
                {generated.link}
              </a>
              <p className="font-serif italic text-[#3a2c14]/80 mt-4">
                Shown on the invitation as: <span className="text-[#8a6a1f] not-italic">{generated.displayName}</span>
              </p>
            </div>

            <div className="bg-[#fffdf4] border border-[#c9a24a]/60 p-6">
              <p className={labelClass}>Greeting &amp; Website Text</p>
              <p className="font-greatvibes text-3xl text-[#b38a2c]">Dear {generated.displayName} ❤️</p>
              <p className="font-serif italic text-lg text-[#3a2c14] mt-2">{buildInviteSentence(generated.displayName)}</p>
            </div>

            <div className="bg-[#fffdf4] border border-[#c9a24a]/60 p-6">
              <p className={labelClass}>Message Preview</p>
              <pre className="whitespace-pre-wrap break-words font-sans text-sm text-[#3a2c14] leading-relaxed">
                {generated.message}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
