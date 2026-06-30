import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {APP_FULL_TITLE} from '../constants/brand';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

const INFO_CARDS = [
  {icon: '🪪', title: 'Opening Access', text: 'Use your pass code when access or verification is requested.'},
  {icon: '🎪', title: 'Opening Plan', text: 'View the main opening-night moments and reserve a place for selected activities.'},
  {icon: '📅', title: 'After Opening Events', text: 'Browse upcoming events after the official opening and save the ones you want to visit.'},
  {icon: '🍽️', title: 'Dining', text: 'Choose dining items and prepare your venue order.'},
  {icon: '🛎️', title: 'Services', text: 'Send service requests for parking, lounge seating, dining table support, arrival help, venue guidance, and guest care.'},
];

export function VenueInfoScreen() {
  const {goBack} = useAppNavigation();

  return (
    <View style={styles.VIFacetChassis}>

      <SubScreenHeader title="Venue Info" onBack={goBack} />

      <ScrollView contentContainerStyle={styles.VIScrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.VIIntroFiligree}>
          {APP_FULL_TITLE} helps guests organize access, opening event moments, after-opening events, dining requests, guest services, and useful venue information during their visit.
        </Text>
        {INFO_CARDS.map(card => (
          <View key={card.title} style={styles.VIInfoCard}>
            <View style={styles.VIInfoHeaderLintel}>
              <Text style={styles.VIInfoIconSigil}>{card.icon}</Text>
              <Text style={styles.VIInfoTitleFiligree}>{card.title}</Text>
            </View>
            <Text style={styles.VIInfoTextFiligree}>{card.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  VIFacetChassis: {backgroundColor: colors.surface, flex: 1},
  VIScrollContent: {gap: 10, paddingBottom: 32, paddingHorizontal: layout.screenPadding, paddingTop: 16},
  VIIntroFiligree: {color: colors.textSecondary, fontFamily: fonts.sansRegular, fontSize: 14, lineHeight: 21, marginBottom: 8},
  VIInfoCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 8, padding: 16},
  VIInfoHeaderLintel: {alignItems: 'center', flexDirection: 'row', gap: 10},
  VIInfoIconSigil: {fontSize: 22},
  VIInfoTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansSemiBold, fontSize: 15, fontWeight: '600'},
  VIInfoTextFiligree: {color: colors.textSecondary, fontFamily: fonts.sansRegular, fontSize: 13, lineHeight: 19},
});
