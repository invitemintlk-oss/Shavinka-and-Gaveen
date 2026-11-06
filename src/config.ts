export const GROOM_NAME = 'Gaveen';
export const BRIDE_NAME = 'Shivika';

export const WEDDING = {
  hosts: [
    'Mr Dharmasiri & Mrs Shirani Senanayake',
    'Maj Gen Shantha & Mrs Thanuja Dehiwatta',
  ],
  weekday: 'Thursday',
  month: 'January',
  day: '21',
  year: '2027',
  dateLong: '21 January 2027',
  arrival: '8.30 AM',
  poruwa: '9.00 AM',
  // Poruwa ceremony start, Sri Lanka time.
  startIso: '2027-01-21T09:00:00+05:30',
  venueLines: ["At the King's Court,", 'Cinnamon Lakeside', 'Colombo'],
  venue: "The King's Court, Cinnamon Lakeside",
  venueCity: 'Colombo, Sri Lanka',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cinnamon+Lakeside+Colombo',
  // 8:30 AM - 2:30 PM Sri Lanka time (UTC+5:30), written in UTC for Google Calendar.
  calendarUrl:
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent('Wedding of Shivika & Gaveen') +
    '&dates=20270121T030000Z/20270121T090000Z' +
    '&location=' + encodeURIComponent("The King's Court, Cinnamon Lakeside, Colombo") +
    '&details=' + encodeURIComponent('Guests from 8.30 AM onwards · Poruwa ceremony at 9.00 AM'),
  rsvp: [
    { name: 'Shirani', phone: '0763737953' },
    { name: 'Shantha', phone: '0777303737' },
  ],
} as const;

// Google Apps Script web app that writes RSVPs to the sheet (see google-apps-script/code.gs).
export const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwiqiEG0nPLB6nxyItDXoYQzhMOVmze_z9Qi4IlSX_cOBxLMfxgh-STMb9bG3AcMiefbA/exec';

export const GUEST_PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type GuestPrefix = typeof GUEST_PREFIXES[number];

// "Dear" is a greeting style, not part of the name: the message itself already starts with "Dear".
export function buildDisplayName(prefix: GuestPrefix, guestName: string) {
  const name = guestName.trim().replace(/\s+/g, ' ');
  if (!name) return '';
  if (prefix === 'Family') return `${name} and Family`;
  if (prefix === 'Dear') return name;
  return `${prefix} ${name}`;
}

// Sentence shown on the invitation page, e.g. "We cordially invite Mr. Sanjaya to celebrate our special day with us."
export function buildInviteSentence(displayName: string) {
  return `We cordially invite ${displayName} to celebrate our special day with us.`;
}

export function buildInviteLink(baseUrl: string, displayName: string) {
  return `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(displayName)}`;
}

export function buildInviteMessage(displayName: string, link: string) {
  return `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${GROOM_NAME} & ${BRIDE_NAME}`;
}

// Reads the guest display name from the URL path, e.g. /Mr.%20Sanjaya -> "Mr. Sanjaya".
export function getGuestNameFromUrl() {
  const segment = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!segment || segment.toLowerCase() === 'admin' || segment === 'index.html') return '';
  try {
    return decodeURIComponent(segment).trim();
  } catch {
    return '';
  }
}
