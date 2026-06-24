export type AppPhase = 'Loader' | 'Onboarding' | 'Main';

export type GuestTab =
  | 'PassTab'
  | 'OpeningTab'
  | 'EventsTab'
  | 'DiningTab'
  | 'ServicesTab';

export type SubmittedFilter =
  | 'All'
  | 'Services'
  | 'EventBookings'
  | 'DiningOrders'
  | 'InReview'
  | 'Sent';

export type GuestOverlay =
  | {type: 'none'}
  // Pass
  | {type: 'FullScreenPass'}
  // Opening Plan
  | {type: 'OpeningEventDetail'; eventId: string}
  | {type: 'ReserveEventSeat'; eventId: string}
  | {type: 'SeatReservationReview'; eventId: string}
  | {type: 'SeatReservationSuccess'}
  // After Opening Events
  | {type: 'AfterOpeningEventDetail'; eventId: string}
  // Dining
  | {type: 'DiningOrderReview'}
  | {type: 'DiningOrderSuccess'}
  // Services
  | {type: 'ServiceRequestForm'; serviceId: string}
  | {type: 'ServiceRequestReview'; serviceId: string}
  | {type: 'ServiceRequestSuccess'}
  | {type: 'SubmittedRequests'; initialFilter?: SubmittedFilter}
  // Hub screens
  | {type: 'QAHelp'}
  | {type: 'SavedEvents'}
  | {type: 'GuestTips'}
  | {type: 'VenueInfo'}
  | {type: 'AppInfo'};
