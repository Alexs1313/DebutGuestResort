export type OpeningEventType =
  | 'Guest Welcome'
  | 'Opening Ceremony'
  | 'Drinks Preview'
  | 'Dining Moment'
  | 'Live Music'
  | 'Photo Zone'
  | 'Guest Info'
  | 'Social Lounge';

export type OpeningEvent = {
  id: string;
  title: string;
  location: string;
  time: string;
  type: OpeningEventType;
  description: string;
  expectedGuestCount: string;
  dressMood: string;
  reservationAvailable: boolean;
  usefulNote: string;
};

export const OPENING_TYPE_STYLES: Record<OpeningEventType, {background: string; color: string}> = {
  'Guest Welcome': {background: '#1a2840', color: '#60A5FA'},
  'Opening Ceremony': {background: '#2B1B55', color: '#B44CFF'},
  'Drinks Preview': {background: '#221420', color: '#FF2CCB'},
  'Dining Moment': {background: '#281e0c', color: '#FFB84A'},
  'Live Music': {background: '#142e28', color: '#4ADE80'},
  'Photo Zone': {background: '#281a3a', color: '#8B3DFF'},
  'Guest Info': {background: '#1a2030', color: '#C2B6E8'},
  'Social Lounge': {background: '#1e1428', color: '#B44CFF'},
};

export const OPENING_EVENTS: OpeningEvent[] = [
  {
    id: 'guest-arrival-welcome-desk',
    title: 'Guest Arrival & Welcome Point',
    location: 'Main Entrance Lobby',
    time: '6:00 PM',
    type: 'Guest Welcome',
    description:
      'A smooth arrival moment with pass verification, welcome guidance, and first access to the opening venue.',
    expectedGuestCount: 'Open arrival',
    dressMood: 'Smart Evening',
    reservationAvailable: false,
    usefulNote: 'Show your pass at the main entrance for smooth access.',
  },
  {
    id: 'win-spirit-light-ceremony',
    title: 'Win Spirit Light Ceremony',
    location: 'Central Atrium',
    time: '7:30 PM',
    type: 'Opening Ceremony',
    description:
      'The symbolic opening moment with light effects, host greeting, and the first official Win Spirit welcome.',
    expectedGuestCount: 'Limited reserved seating',
    dressMood: 'Formal Evening',
    reservationAvailable: true,
    usefulNote: 'Please arrive 10 minutes before this opening moment if you reserved a place.',
  },
  {
    id: 'signature-mocktail-preview',
    title: 'Signature Mocktail Preview',
    location: 'Spirit Lounge Bar',
    time: '8:00 PM',
    type: 'Drinks Preview',
    description:
      'A curated tasting moment with signature opening-night drinks and a calm lounge atmosphere.',
    expectedGuestCount: 'Open bar lounge access',
    dressMood: 'Smart Casual',
    reservationAvailable: true,
    usefulNote: 'Signature non-alcoholic drinks prepared specially for the opening night.',
  },
  {
    id: 'chefs-welcome-tasting',
    title: "Chef's Welcome Tasting",
    location: 'Dining Gallery',
    time: '8:30 PM',
    type: 'Dining Moment',
    description:
      'A small tasting session with selected dishes prepared specially for the first evening.',
    expectedGuestCount: 'Limited dining seating',
    dressMood: 'Casual Elegant',
    reservationAvailable: true,
    usefulNote: 'Tasting portions only. Full dining available from the Dining tab.',
  },
  {
    id: 'live-lounge-performance',
    title: 'Live Lounge Performance',
    location: 'Main Lounge Stage',
    time: '9:15 PM',
    type: 'Live Music',
    description:
      'A relaxed live performance with elegant seating, soft lights, and a premium evening mood.',
    expectedGuestCount: 'Open lounge audience',
    dressMood: 'Smart Evening',
    reservationAvailable: true,
    usefulNote: 'Lounge seating fills early. Reserve a place for a guaranteed spot.',
  },
  {
    id: 'win-spirit-photo-moment',
    title: 'Win Spirit Photo Moment',
    location: 'Opening Photo Wall',
    time: '6:30 PM – 10:30 PM',
    type: 'Photo Zone',
    description:
      'A branded photo area with evening lighting, premium backdrop, and opening-night atmosphere.',
    expectedGuestCount: 'Open all evening',
    dressMood: 'Any elegant style',
    reservationAvailable: false,
    usefulNote: 'Photo zone is open throughout the evening. No reservation required.',
  },
  {
    id: 'host-welcome-talk',
    title: 'Host Welcome Talk',
    location: 'Guest Reception Gallery',
    time: '7:00 PM',
    type: 'Guest Info',
    description:
      'A short welcome talk with useful information about the venue, guest areas, and evening flow.',
    expectedGuestCount: 'Open information session',
    dressMood: 'Casual',
    reservationAvailable: true,
    usefulNote: 'Helpful for first-time guests. Takes approximately 15–20 minutes.',
  },
  {
    id: 'afterglow-lounge-session',
    title: 'Afterglow Lounge Session',
    location: 'Private Lounge Corner',
    time: '10:00 PM',
    type: 'Social Lounge',
    description:
      'A quieter late-evening lounge session for guests who want a softer closing mood after the main program.',
    expectedGuestCount: 'Limited lounge seating',
    dressMood: 'Smart Casual',
    reservationAvailable: true,
    usefulNote: 'This is a calm session. The atmosphere is quieter after the main event program.',
  },
];

export function getOpeningEventById(eventId: string): OpeningEvent | undefined {
  return OPENING_EVENTS.find(e => e.id === eventId);
}

export const OPENING_TIMELINE = [
  {time: 'Guest Arrival', label: '6:00 PM'},
  {time: 'Main Ceremony', label: '7:30 PM'},
  {time: 'Evening Program', label: '8:00 PM – 11:30 PM'},
  {time: 'Dress Mood', label: 'Smart Evening'},
];
