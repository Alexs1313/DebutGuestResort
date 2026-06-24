export type WinSpiritServiceTag =
  | 'Arrival Service'
  | 'Guest Support'
  | 'Comfort Service'
  | 'Dining Support'
  | 'Opening Moment'
  | 'Venue Guidance'
  | 'Guest Care'
  | 'Guest Note'
  | 'Arrival Detail'
  | 'Support';

export type WinSpiritService = {
  id: string;
  icon: string;
  title: string;
  tag: WinSpiritServiceTag;
  description: string;
  hasExtraFields?: boolean;
};

export const SERVICE_TAG_STYLES: Record<WinSpiritServiceTag, {background: string; color: string}> = {
  'Arrival Service': {background: '#1a2840', color: '#60A5FA'},
  'Guest Support': {background: '#1a2030', color: '#C2B6E8'},
  'Comfort Service': {background: '#1e1428', color: '#B44CFF'},
  'Dining Support': {background: '#281e0c', color: '#FFB84A'},
  'Opening Moment': {background: '#221420', color: '#FF2CCB'},
  'Venue Guidance': {background: '#142028', color: '#60A5FA'},
  'Guest Care': {background: '#142418', color: '#4ADE80'},
  'Guest Note': {background: '#281a3a', color: '#8B3DFF'},
  'Arrival Detail': {background: '#2B1B55', color: '#B44CFF'},
  Support: {background: '#1a2038', color: '#60A5FA'},
};

export const WIN_SPIRIT_SERVICES: WinSpiritService[] = [
  {
    id: 'parking-place-request',
    icon: '🅿️',
    title: 'Parking Place Request',
    tag: 'Arrival Service',
    description: 'Choose a preferred parking zone and send a request for venue staff review.',
    hasExtraFields: true,
  },
  {
    id: 'welcome-desk-assistance',
    icon: '🤝',
    title: 'Welcome Point Assistance',
    tag: 'Guest Support',
    description: 'Request help with pass verification, arrival guidance, or opening access questions.',
  },
  {
    id: 'lounge-seat-request',
    icon: '🛋️',
    title: 'Lounge Seat Request',
    tag: 'Comfort Service',
    description: 'Ask for lounge seating support during selected opening moments or quieter evening breaks.',
    hasExtraFields: true,
  },
  {
    id: 'dining-table-request',
    icon: '🍽️',
    title: 'Dining Table Request',
    tag: 'Dining Support',
    description: 'Request a table preference or dining zone support before or during your visit.',
    hasExtraFields: true,
  },
  {
    id: 'photo-zone-assistance',
    icon: '📸',
    title: 'Photo Zone Assistance',
    tag: 'Opening Moment',
    description: 'Ask for guidance around the Win Spirit photo wall, timing, or guest photo zone.',
  },
  {
    id: 'guest-route-guidance',
    icon: '🗺️',
    title: 'Guest Path Guidance',
    tag: 'Venue Guidance',
    description: 'Request help finding event zones, dining zones, lounge corners, or guest support points.',
  },
  {
    id: 'accessibility-support',
    icon: '♿',
    title: 'Accessibility Support',
    tag: 'Guest Care',
    description: 'Send a request for additional comfort, access support, or movement assistance inside the venue.',
    hasExtraFields: true,
  },
  {
    id: 'special-occasion-note',
    icon: '🎂',
    title: 'Special Occasion Note',
    tag: 'Guest Note',
    description: 'Share a visit note for birthdays, private greetings, or a special opening-night moment.',
  },
  {
    id: 'transport-arrival-note',
    icon: '🚗',
    title: 'Transport Arrival Note',
    tag: 'Arrival Detail',
    description: 'Send a note about your arrival time, driver drop-off, or transport-related request.',
  },
  {
    id: 'lost-item-help',
    icon: '🔍',
    title: 'Lost Item Help',
    tag: 'Support',
    description: 'Send a request if you need help with a missing item during your venue visit.',
  },
];

export function getServiceById(serviceId: string): WinSpiritService | undefined {
  return WIN_SPIRIT_SERVICES.find(s => s.id === serviceId);
}

export const PARKING_AREAS = [
  'Main Entrance Zone',
  'Lounge Side Zone',
  'Quiet Parking Zone',
  'No Preference',
] as const;

export const DINING_AREAS = [
  'Dining Gallery',
  'Spirit Café',
  'Lounge Bar Zone',
  'No Preference',
] as const;

export const SEAT_PREFERENCES = [
  'Near Stage',
  'Lounge Side',
  'Quiet Zone',
  'No Preference',
] as const;

export const ACCESSIBILITY_TYPES = [
  'Entrance Support',
  'Seating Support',
  'Path Guidance',
  'Other',
] as const;

export type ParkingArea = (typeof PARKING_AREAS)[number];
export type DiningArea = (typeof DINING_AREAS)[number];
export type SeatPreference = (typeof SEAT_PREFERENCES)[number];
export type AccessibilityType = (typeof ACCESSIBILITY_TYPES)[number];
