import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type {AppPhase, GuestOverlay, GuestTab, SubmittedFilter} from './types';

type NavigationContextValue = {
  phase: AppPhase;
  activeTab: GuestTab;
  overlay: GuestOverlay;
  setPhase: (phase: AppPhase) => void;
  selectTab: (tab: GuestTab) => void;
  goBack: () => void;
  closeOverlay: () => void;
  // Pass
  openFullScreenPass: () => void;
  // Opening
  openOpeningEventDetail: (eventId: string) => void;
  openReserveEventSeat: (eventId: string) => void;
  openSeatReservationReview: (eventId: string) => void;
  openSeatReservationSuccess: () => void;
  // After Opening Events
  openAfterOpeningEventDetail: (eventId: string) => void;
  // Dining
  openDiningOrderReview: () => void;
  openDiningOrderSuccess: () => void;
  // Services
  openServiceRequestForm: (serviceId: string) => void;
  openServiceRequestReview: (serviceId: string) => void;
  openServiceRequestSuccess: () => void;
  openSubmittedRequests: (initialFilter?: SubmittedFilter) => void;
  // Hub
  openQAHelp: () => void;
  openSavedEvents: () => void;
  openGuestTips: () => void;
  openVenueInfo: () => void;
  openAppInfo: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [phase, setPhaseState] = useState<AppPhase>('Loader');
  const [activeTab, setActiveTab] = useState<GuestTab>('PassTab');
  const [overlay, setOverlay] = useState<GuestOverlay>({type: 'none'});

  const setPhase = useCallback((p: AppPhase) => setPhaseState(p), []);

  const selectTab = useCallback((tab: GuestTab) => {
    setActiveTab(tab);
    setOverlay({type: 'none'});
  }, []);

  const closeOverlay = useCallback(() => setOverlay({type: 'none'}), []);

  const goBack = useCallback(() => {
    setOverlay(current => {
      switch (current.type) {
        case 'ReserveEventSeat':
          return {type: 'OpeningEventDetail', eventId: current.eventId};
        case 'SeatReservationReview':
          return {type: 'ReserveEventSeat', eventId: current.eventId};
        case 'SeatReservationSuccess':
          setActiveTab('OpeningTab');
          return {type: 'none'};
        case 'ServiceRequestReview':
          return {type: 'ServiceRequestForm', serviceId: current.serviceId};
        case 'ServiceRequestSuccess':
          return {type: 'SubmittedRequests'};
        case 'DiningOrderSuccess':
          setActiveTab('DiningTab');
          return {type: 'none'};
        default:
          return {type: 'none'};
      }
    });
  }, []);

  const openFullScreenPass = useCallback(() => setOverlay({type: 'FullScreenPass'}), []);

  const openOpeningEventDetail = useCallback(
    (eventId: string) => setOverlay({type: 'OpeningEventDetail', eventId}),
    [],
  );
  const openReserveEventSeat = useCallback(
    (eventId: string) => setOverlay({type: 'ReserveEventSeat', eventId}),
    [],
  );
  const openSeatReservationReview = useCallback(
    (eventId: string) => setOverlay({type: 'SeatReservationReview', eventId}),
    [],
  );
  const openSeatReservationSuccess = useCallback(
    () => setOverlay({type: 'SeatReservationSuccess'}),
    [],
  );

  const openAfterOpeningEventDetail = useCallback(
    (eventId: string) => setOverlay({type: 'AfterOpeningEventDetail', eventId}),
    [],
  );

  const openDiningOrderReview = useCallback(() => setOverlay({type: 'DiningOrderReview'}), []);
  const openDiningOrderSuccess = useCallback(() => setOverlay({type: 'DiningOrderSuccess'}), []);

  const openServiceRequestForm = useCallback(
    (serviceId: string) => setOverlay({type: 'ServiceRequestForm', serviceId}),
    [],
  );
  const openServiceRequestReview = useCallback(
    (serviceId: string) => setOverlay({type: 'ServiceRequestReview', serviceId}),
    [],
  );
  const openServiceRequestSuccess = useCallback(
    () => setOverlay({type: 'ServiceRequestSuccess'}),
    [],
  );
  const openSubmittedRequests = useCallback(
    (initialFilter?: SubmittedFilter) => setOverlay({type: 'SubmittedRequests', initialFilter}),
    [],
  );

  const openQAHelp = useCallback(() => setOverlay({type: 'QAHelp'}), []);
  const openSavedEvents = useCallback(() => setOverlay({type: 'SavedEvents'}), []);
  const openGuestTips = useCallback(() => setOverlay({type: 'GuestTips'}), []);
  const openVenueInfo = useCallback(() => setOverlay({type: 'VenueInfo'}), []);
  const openAppInfo = useCallback(() => setOverlay({type: 'AppInfo'}), []);

  const value = useMemo(
    () => ({
      phase,
      activeTab,
      overlay,
      setPhase,
      selectTab,
      goBack,
      closeOverlay,
      openFullScreenPass,
      openOpeningEventDetail,
      openReserveEventSeat,
      openSeatReservationReview,
      openSeatReservationSuccess,
      openAfterOpeningEventDetail,
      openDiningOrderReview,
      openDiningOrderSuccess,
      openServiceRequestForm,
      openServiceRequestReview,
      openServiceRequestSuccess,
      openSubmittedRequests,
      openQAHelp,
      openSavedEvents,
      openGuestTips,
      openVenueInfo,
      openAppInfo,
    }),
    [
      phase, activeTab, overlay, setPhase, selectTab, goBack, closeOverlay,
      openFullScreenPass, openOpeningEventDetail, openReserveEventSeat,
      openSeatReservationReview, openSeatReservationSuccess,
      openAfterOpeningEventDetail, openDiningOrderReview, openDiningOrderSuccess,
      openServiceRequestForm, openServiceRequestReview, openServiceRequestSuccess,
      openSubmittedRequests, openQAHelp, openSavedEvents, openGuestTips,
      openVenueInfo, openAppInfo,
    ],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useAppNavigation must be used within NavigationProvider');
  return ctx;
}
