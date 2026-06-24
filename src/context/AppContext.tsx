import React, {createContext, useContext, useMemo, useState} from 'react';

import {PASS_CODE} from '../constants/brand';

type AppContextValue = {
  passCode: string;
  onboardingChecked: boolean;
  onboardingCompleted: boolean;
  completeOnboarding: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({children}: {children: React.ReactNode}) {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const completeOnboarding = () => {
    setOnboardingCompleted(true);
  };

  const value = useMemo(
    () => ({passCode: PASS_CODE, onboardingChecked: true, onboardingCompleted, completeOnboarding}),
    [onboardingCompleted],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
