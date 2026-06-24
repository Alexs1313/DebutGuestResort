import React from 'react';
import {StyleSheet, View} from 'react-native';

import {TabBar} from '../components/nav/TabBar';
import {useApp} from '../context/AppContext';
import {colors} from '../constants/theme';
import {useAppNavigation} from './NavigationContext';

// Screens
import {LoaderScreen} from '../screens/LoaderScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PassScreen} from '../screens/PassScreen';
import {FullScreenPassScreen} from '../screens/FullScreenPassScreen';
import {OpeningPlanScreen} from '../screens/OpeningPlanScreen';
import {OpeningEventDetailScreen} from '../screens/OpeningEventDetailScreen';
import {ReserveEventSeatScreen} from '../screens/ReserveEventSeatScreen';
import {SeatReservationReviewScreen} from '../screens/SeatReservationReviewScreen';
import {SeatReservationSuccessScreen} from '../screens/SeatReservationSuccessScreen';
import {AfterOpeningEventsScreen} from '../screens/AfterOpeningEventsScreen';
import {AfterOpeningEventDetailScreen} from '../screens/AfterOpeningEventDetailScreen';
import {DiningScreen} from '../screens/DiningScreen';
import {DiningOrderReviewScreen} from '../screens/DiningOrderReviewScreen';
import {DiningOrderSuccessScreen} from '../screens/DiningOrderSuccessScreen';
import {ServicesScreen} from '../screens/ServicesScreen';
import {ServiceRequestFormScreen} from '../screens/ServiceRequestFormScreen';
import {ServiceRequestReviewScreen} from '../screens/ServiceRequestReviewScreen';
import {ServiceRequestSuccessScreen} from '../screens/ServiceRequestSuccessScreen';
import {SubmittedRequestsScreen} from '../screens/SubmittedRequestsScreen';
import {QAHelpScreen} from '../screens/QAHelpScreen';
import {SavedEventsScreen} from '../screens/SavedEventsScreen';
import {GuestTipsScreen} from '../screens/GuestTipsScreen';
import {VenueInfoScreen} from '../screens/VenueInfoScreen';
import {AppInfoScreen} from '../screens/AppInfoScreen';

function TabContent() {
  const {activeTab} = useAppNavigation();
  switch (activeTab) {
    case 'PassTab':    return <PassScreen />;
    case 'OpeningTab': return <OpeningPlanScreen />;
    case 'EventsTab':  return <AfterOpeningEventsScreen />;
    case 'DiningTab':  return <DiningScreen />;
    case 'ServicesTab': return <ServicesScreen />;
    default:           return <PassScreen />;
  }
}

function OverlayContent() {
  const {overlay} = useAppNavigation();
  switch (overlay.type) {
    case 'FullScreenPass':          return <FullScreenPassScreen />;
    case 'OpeningEventDetail':      return <OpeningEventDetailScreen eventId={overlay.eventId} />;
    case 'ReserveEventSeat':        return <ReserveEventSeatScreen eventId={overlay.eventId} />;
    case 'SeatReservationReview':   return <SeatReservationReviewScreen eventId={overlay.eventId} />;
    case 'SeatReservationSuccess':  return <SeatReservationSuccessScreen />;
    case 'AfterOpeningEventDetail': return <AfterOpeningEventDetailScreen eventId={overlay.eventId} />;
    case 'DiningOrderReview':       return <DiningOrderReviewScreen />;
    case 'DiningOrderSuccess':      return <DiningOrderSuccessScreen />;
    case 'ServiceRequestForm':      return <ServiceRequestFormScreen serviceId={overlay.serviceId} />;
    case 'ServiceRequestReview':    return <ServiceRequestReviewScreen serviceId={overlay.serviceId} />;
    case 'ServiceRequestSuccess':   return <ServiceRequestSuccessScreen />;
    case 'SubmittedRequests':       return <SubmittedRequestsScreen initialFilter={overlay.initialFilter} />;
    case 'QAHelp':                  return <QAHelpScreen />;
    case 'SavedEvents':             return <SavedEventsScreen />;
    case 'GuestTips':               return <GuestTipsScreen />;
    case 'VenueInfo':               return <VenueInfoScreen />;
    case 'AppInfo':                 return <AppInfoScreen />;
    default:                        return null;
  }
}

function MainShell() {
  const {overlay, activeTab, selectTab} = useAppNavigation();
  const showTabBar = overlay.type === 'none';

  return (
    <View style={styles.MainShellChassis}>
      <View style={styles.MainShellContent}>
        <TabContent />
      </View>
      {overlay.type !== 'none' && (
        <View style={styles.MainShellOverlay}>
          <OverlayContent />
        </View>
      )}
      {showTabBar && <TabBar activeTab={activeTab} onSelectTab={selectTab} />}
    </View>
  );
}

export function AppShell() {
  const {phase, setPhase} = useAppNavigation();
  const {onboardingChecked, onboardingCompleted, completeOnboarding} = useApp();

  if (phase === 'Loader') {
    return (
      <LoaderScreen
        onComplete={() => {
          if (onboardingChecked) {
            setPhase(onboardingCompleted ? 'Main' : 'Onboarding');
          }
        }}
        onboardingChecked={onboardingChecked}
        onboardingCompleted={onboardingCompleted}
      />
    );
  }

  if (phase === 'Onboarding') {
    return (
      <OnboardingScreen
        onComplete={() => {
          completeOnboarding();
          setPhase('Main');
        }}
        onSkip={() => {
          completeOnboarding();
          setPhase('Main');
        }}
      />
    );
  }

  return <MainShell />;
}

const styles = StyleSheet.create({
  MainShellChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  MainShellContent: {
    flex: 1,
  },
  MainShellOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surface,
  },
});
