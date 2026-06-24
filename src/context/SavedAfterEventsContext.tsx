import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_KEY = '@ws_saved_after_events';

type SavedAfterEventsContextValue = {
  savedEventIds: string[];
  isEventSaved: (eventId: string) => boolean;
  toggleSaved: (eventId: string) => void;
  savedCount: number;
};

const SavedAfterEventsContext = createContext<SavedAfterEventsContextValue | null>(null);

export function SavedAfterEventsProvider({children}: {children: React.ReactNode}) {
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(SAVED_KEY).then(val => {
      if (val) setSavedEventIds(JSON.parse(val));
    });
  }, []);

  const persist = (next: string[]) => {
    setSavedEventIds(next);
    AsyncStorage.setItem(SAVED_KEY, JSON.stringify(next));
  };

  const isEventSaved = useCallback(
    (eventId: string) => savedEventIds.includes(eventId),
    [savedEventIds],
  );

  const toggleSaved = useCallback(
    (eventId: string) => {
      const next = savedEventIds.includes(eventId)
        ? savedEventIds.filter(id => id !== eventId)
        : [...savedEventIds, eventId];
      persist(next);
    },
    [savedEventIds],
  );

  const value = useMemo(
    () => ({savedEventIds, isEventSaved, toggleSaved, savedCount: savedEventIds.length}),
    [savedEventIds, isEventSaved, toggleSaved],
  );

  return (
    <SavedAfterEventsContext.Provider value={value}>
      {children}
    </SavedAfterEventsContext.Provider>
  );
}

export function useSavedAfterEvents() {
  const ctx = useContext(SavedAfterEventsContext);
  if (!ctx) throw new Error('useSavedAfterEvents must be used within SavedAfterEventsProvider');
  return ctx;
}
