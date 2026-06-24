import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getServiceById} from '../data/winSpiritServices';

const REQUESTS_KEY = '@ws_service_requests';

export type ServiceRequestDraft = {
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  guestName: string;
  contactNote: string;
  numberOfGuests: string;
  requestDetails: string;
  specialNotes: string;
  extraFields: Record<string, string>;
};

export type ServiceRequest = ServiceRequestDraft & {
  id: string;
  serviceName: string;
  serviceTag: string;
  serviceIcon: string;
  status: 'In Review';
  createdAt: string;
};

type ServiceRequestsContextValue = {
  requests: ServiceRequest[];
  draft: ServiceRequestDraft | null;
  setDraft: (draft: ServiceRequestDraft) => void;
  submitRequest: () => ServiceRequest | null;
  clearDraft: () => void;
};

const ServiceRequestsContext = createContext<ServiceRequestsContextValue | null>(null);

export function ServiceRequestsProvider({children}: {children: React.ReactNode}) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [draft, setDraftState] = useState<ServiceRequestDraft | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(REQUESTS_KEY).then(val => {
      if (val) setRequests(JSON.parse(val));
    });
  }, []);

  const persist = (next: ServiceRequest[]) => {
    setRequests(next);
    AsyncStorage.setItem(REQUESTS_KEY, JSON.stringify(next));
  };

  const setDraft = useCallback((d: ServiceRequestDraft) => setDraftState(d), []);
  const clearDraft = useCallback(() => setDraftState(null), []);

  const submitRequest = useCallback(() => {
    if (!draft) return null;
    const service = getServiceById(draft.serviceId);
    const request: ServiceRequest = {
      ...draft,
      id: `sr-${Date.now()}`,
      serviceName: service?.title ?? 'Service Request',
      serviceTag: service?.tag ?? 'Guest Support',
      serviceIcon: service?.icon ?? '🛎️',
      status: 'In Review',
      createdAt: new Date().toLocaleString(),
    };
    persist([request, ...requests]);
    setDraftState(null);
    return request;
  }, [draft, requests]);

  const value = useMemo(
    () => ({requests, draft, setDraft, submitRequest, clearDraft}),
    [requests, draft, setDraft, submitRequest, clearDraft],
  );

  return (
    <ServiceRequestsContext.Provider value={value}>
      {children}
    </ServiceRequestsContext.Provider>
  );
}

export function useServiceRequests() {
  const ctx = useContext(ServiceRequestsContext);
  if (!ctx) throw new Error('useServiceRequests must be used within ServiceRequestsProvider');
  return ctx;
}
