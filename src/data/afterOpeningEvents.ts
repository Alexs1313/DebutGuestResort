export type AfterEventType =
  | 'Live Music'
  | 'Dining Event'
  | 'Guided Visit'
  | 'Drinks Event'
  | 'Social Evening'
  | 'Dining Preview'
  | 'Guest Info'
  | 'Lounge Experience'
  | 'Lounge Evening'
  | 'Culinary Preview';

export type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export type AfterOpeningEvent = {
  id: string;
  title: string;
  room: string;
  day: WeekDay;
  time: string;
  type: AfterEventType;
  description: string;
  guestCount: string;
  dressMood: string;
  usefulNote: string;
};

export const AFTER_EVENT_TYPE_STYLES: Record<AfterEventType, {background: string; color: string}> = {
  'Live Music': {background: '#142e28', color: '#4ADE80'},
  'Dining Event': {background: '#281e0c', color: '#FFB84A'},
  'Guided Visit': {background: '#1a2840', color: '#60A5FA'},
  'Drinks Event': {background: '#221420', color: '#FF2CCB'},
  'Social Evening': {background: '#2B1B55', color: '#B44CFF'},
  'Dining Preview': {background: '#281e0c', color: '#FFB84A'},
  'Guest Info': {background: '#1a2030', color: '#C2B6E8'},
  'Lounge Experience': {background: '#1e1428', color: '#B44CFF'},
  'Lounge Evening': {background: '#1e1428', color: '#8B3DFF'},
  'Culinary Preview': {background: '#281a10', color: '#FF8C42'},
};

export const AFTER_OPENING_EVENTS: AfterOpeningEvent[] = [
  {
    id: 'lounge-jazz-night',
    title: 'Win Spirit Lounge Jazz Night',
    room: 'Main Lounge Stage',
    day: 'Fri',
    time: '8:00 PM',
    type: 'Live Music',
    description:
      'A smooth jazz evening with soft lighting, lounge seating, calm sound, and a premium after-opening atmosphere.',
    guestCount: 'Open lounge audience',
    dressMood: 'Smart Casual',
    usefulNote: 'Best for guests who want a relaxed evening with music, soft lights, and comfortable lounge seating.',
  },
  {
    id: 'signature-dinner-weekend',
    title: 'Signature Dinner Weekend',
    room: 'Dining Gallery',
    day: 'Sat',
    time: '7:00 PM',
    type: 'Dining Event',
    description:
      'A curated dinner evening with selected dishes, comfortable seating, attentive guest service, and a refined weekend mood.',
    guestCount: 'Limited dining seating',
    dressMood: 'Casual Elegant',
    usefulNote: 'Recommended for guests who want a complete dining experience after the official opening celebration.',
  },
  {
    id: 'guest-welcome-walk',
    title: 'Guest Welcome Walk',
    room: 'Reception Gallery',
    day: 'Sat',
    time: '4:00 PM',
    type: 'Guided Visit',
    description:
      'A short guided route through key guest areas, dining zones, lounge corners, service points, and photo-friendly spaces.',
    guestCount: 'Small guided group',
    dressMood: 'Comfortable Casual',
    usefulNote: 'A good choice for first-time visitors who want to understand the venue layout before evening events.',
  },
  {
    id: 'spirit-cocktail-hour',
    title: 'Spirit Cocktail Hour',
    room: 'Lounge Bar',
    day: 'Thu',
    time: '8:30 PM',
    type: 'Drinks Event',
    description:
      'A relaxed cocktail-style evening with signature non-alcoholic drinks, lounge seating, and a calm social atmosphere.',
    guestCount: 'Open bar lounge access',
    dressMood: 'Smart Casual',
    usefulNote: 'Best for guests looking for a softer social moment in the lounge area after the opening week.',
  },
  {
    id: 'weekend-social-night',
    title: 'Weekend Social Night',
    room: 'Atrium Lounge',
    day: 'Sat',
    time: '9:30 PM',
    type: 'Social Evening',
    description:
      'A friendly weekend gathering with lounge music, warm lighting, comfortable seating, and a welcoming guest atmosphere.',
    guestCount: 'Open guest gathering',
    dressMood: 'Smart Evening',
    usefulNote: 'Recommended for guests who want to stay later and enjoy a relaxed social mood inside the venue.',
  },
  {
    id: 'dining-preview-morning',
    title: 'Dining Preview Morning',
    room: 'Spirit Café',
    day: 'Sun',
    time: '10:00 AM',
    type: 'Dining Preview',
    description:
      'A lighter morning session with breakfast-style dishes, fresh coffee, soft seating, and a calm guest experience.',
    guestCount: 'Small morning group',
    dressMood: 'Relaxed Casual',
    usefulNote: 'Best for guests arriving early or looking for a quiet daytime visit after the main opening events.',
  },
  {
    id: 'venue-etiquette-talk',
    title: 'Venue Etiquette Mini Talk',
    room: 'Guest Info Corner',
    day: 'Fri',
    time: '6:30 PM',
    type: 'Guest Info',
    description:
      'A quick introduction to guest zones, venue behavior, service points, dining flow, and useful visit tips for first-time visitors.',
    guestCount: 'Open information session',
    dressMood: 'Casual',
    usefulNote: 'Helpful for guests who want clear guidance before exploring the venue independently.',
  },
  {
    id: 'private-lounge-preview',
    title: 'Private Lounge Preview',
    room: 'Private Lounge Corner',
    day: 'Sun',
    time: '6:00 PM',
    type: 'Lounge Experience',
    description:
      'A small preview of private lounge seating, quiet corners, premium comfort options, and calmer guest areas inside the venue.',
    guestCount: 'Limited lounge preview group',
    dressMood: 'Smart Casual',
    usefulNote: 'Recommended for guests interested in quieter seating, private corners, or future lounge-style visits.',
  },
  {
    id: 'purple-lights-lounge',
    title: 'Purple Lights Lounge Evening',
    room: 'Atrium Lounge',
    day: 'Mon',
    time: '8:00 PM',
    type: 'Lounge Evening',
    description:
      'A calm lounge evening with soft purple lighting, comfortable seating, light background music, and a refined after-opening atmosphere.',
    guestCount: 'Open lounge audience',
    dressMood: 'Smart Casual',
    usefulNote: 'Best for guests who want a peaceful evening visit without a busy event schedule.',
  },
  {
    id: 'chefs-small-plate-hour',
    title: "Chef's Small Plate Hour",
    room: 'Dining Gallery',
    day: 'Tue',
    time: '6:45 PM',
    type: 'Culinary Preview',
    description:
      'A short dining moment with small seasonal plates, warm presentation, simple tasting portions, and attentive guest service.',
    guestCount: 'Limited dining seating',
    dressMood: 'Casual Elegant',
    usefulNote: 'Recommended for guests who want to explore dining options before choosing a full meal.',
  },
  {
    id: 'win-spirit-welcome-route',
    title: 'Win Spirit Welcome Path',
    room: 'Main Entrance Lobby',
    day: 'Wed',
    time: '5:30 PM',
    type: 'Guided Visit',
    description:
      'A guided introduction through the main entrance, reception gallery, dining areas, lounge corners, and guest service points.',
    guestCount: 'Small guided group',
    dressMood: 'Comfortable Casual',
    usefulNote: 'Helpful for visitors who want to understand the venue layout before spending more time inside.',
  },
  {
    id: 'piano-soft-lights',
    title: 'Piano & Soft Lights Session',
    room: 'Main Lounge Stage',
    day: 'Thu',
    time: '7:45 PM',
    type: 'Live Music',
    description:
      'A gentle piano session with soft lighting, calm lounge seating, and an elegant evening mood for after-opening guests.',
    guestCount: 'Open lounge audience',
    dressMood: 'Smart Evening',
    usefulNote: 'Best for guests looking for a quiet, refined evening with live music.',
  },
];

export const ALL_WEEK_DAYS: WeekDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export type AfterEventFilter = 'All' | 'Today' | 'Tomorrow' | 'Weekend' | 'Music' | 'Dining' | 'Lounge' | 'Guest Info';

export function getAfterOpeningEventById(eventId: string): AfterOpeningEvent | undefined {
  return AFTER_OPENING_EVENTS.find(e => e.id === eventId);
}
