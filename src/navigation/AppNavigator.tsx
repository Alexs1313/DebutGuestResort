import React from 'react';

import {AppProvider} from '../context/AppContext';
import {OpeningBookingsProvider} from '../context/OpeningBookingsContext';
import {DiningProvider} from '../context/DiningContext';
import {ServiceRequestsProvider} from '../context/ServiceRequestsContext';
import {SavedAfterEventsProvider} from '../context/SavedAfterEventsContext';
import {NavigationProvider} from './NavigationContext';
import {AppShell} from './AppShell';

export function AppNavigator() {
  return (
    <AppProvider>
      <OpeningBookingsProvider>
        <DiningProvider>
          <ServiceRequestsProvider>
            <SavedAfterEventsProvider>
              <NavigationProvider>
                <AppShell />
              </NavigationProvider>
            </SavedAfterEventsProvider>
          </ServiceRequestsProvider>
        </DiningProvider>
      </OpeningBookingsProvider>
    </AppProvider>
  );
}
