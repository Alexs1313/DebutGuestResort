import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getOpeningEventById} from '../data/openingEvents';

const BOOKINGS_KEY = '@ws_opening_bookings';

export type SeatPreference = 'Near Stage' | 'Lounge Side' | 'Quiet Zone' | 'No Preference';

export type OpeningBookingDraft = {
  eventId: string;
  date: string;
  preferredTimeSlot: string;
  numberOfGuests: string;
  guestName: string;
  contactNote: string;
  seatPreference: SeatPreference;
  specialNotes: string;
};

export type OpeningBooking = OpeningBookingDraft & {
  id: string;
  eventName: string;
  status: 'Request in Review';
  createdAt: string;
};

type OpeningBookingsContextValue = {
  bookings: OpeningBooking[];
  draft: OpeningBookingDraft | null;
  setDraft: (draft: OpeningBookingDraft) => void;
  submitBooking: () => OpeningBooking | null;
  clearDraft: () => void;
};

const OpeningBookingsContext = createContext<OpeningBookingsContextValue | null>(null);

export function OpeningBookingsProvider({children}: {children: React.ReactNode}) {
  const [bookings, setBookings] = useState<OpeningBooking[]>([]);
  const [draft, setDraftState] = useState<OpeningBookingDraft | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(BOOKINGS_KEY).then(val => {
      if (val) setBookings(JSON.parse(val));
    });
  }, []);

  const persist = (next: OpeningBooking[]) => {
    setBookings(next);
    AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
  };

  const setDraft = useCallback((d: OpeningBookingDraft) => setDraftState(d), []);
  const clearDraft = useCallback(() => setDraftState(null), []);

  const submitBooking = useCallback(() => {
    if (!draft) return null;
    const event = getOpeningEventById(draft.eventId);
    const booking: OpeningBooking = {
      ...draft,
      id: `ob-${Date.now()}`,
      eventName: event?.title ?? 'Opening Event',
      status: 'Request in Review',
      createdAt: new Date().toLocaleString(),
    };
    persist([booking, ...bookings]);
    setDraftState(null);
    return booking;
  }, [draft, bookings]);

  const value = useMemo(
    () => ({bookings, draft, setDraft, submitBooking, clearDraft}),
    [bookings, draft, setDraft, submitBooking, clearDraft],
  );

  return (
    <OpeningBookingsContext.Provider value={value}>
      {children}
    </OpeningBookingsContext.Provider>
  );
}

export function useOpeningBookings() {
  const ctx = useContext(OpeningBookingsContext);
  if (!ctx) throw new Error('useOpeningBookings must be used within OpeningBookingsProvider');
  return ctx;
}
