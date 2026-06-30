import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';

import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

const APP_FEATURES = [
  {label: 'App Language', value: 'English'},
  {
    label: 'App Purpose',
    value: 'Opening event guest planning and venue assistance',
  },
  {label: 'Data Storage', value: 'Stored locally on device'},
  {label: 'Login Required', value: 'No'},
  {label: 'Payments', value: 'None'},
  {label: 'Betting or Gambling', value: 'None'},
];

export function AppInfoScreen() {
  const {goBack} = useAppNavigation();

  return (
    <View style={styles.AIFacetChassis}>

      <SubScreenHeader title="App Info" onBack={goBack} />

      <ScrollView
        contentContainerStyle={styles.AIScrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.AIDescFiligree}>
          Debut Guest Resort is a guest information and planning app
          for digital opening access, opening event schedule, place reservation
          requests, after-opening events, dining menu orders, service requests,
          guest tips, submitted request review, and visit organization.
        </Text>

        <View style={styles.AIDisclaimerCard}>
          <Text style={styles.AIDisclaimerTitleFiligree}>⚠️ Disclaimer</Text>
          <Text style={styles.AIDisclaimerTextFiligree}>
            This app is not a real money gaming app. It focuses on guest access,
            opening event planning, service requests, dining requests, saved
            events, submitted request review, and venue support.
          </Text>
        </View>

        <View style={styles.AIInfoCard}>
          {APP_FEATURES.map(feature => (
            <View key={feature.label} style={styles.AIRowLintel}>
              <Text style={styles.AIRowLabelFiligree}>{feature.label}</Text>
              <Text style={styles.AIRowValueFiligree}>{feature.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  AIFacetChassis: {backgroundColor: colors.surface, flex: 1},
  AIScrollContent: {
    gap: 12,
    paddingBottom: 32,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 16,
  },

  AIDescFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },

  AIDisclaimerCard: {
    backgroundColor: 'rgba(255, 90, 117, 0.08)',
    borderColor: 'rgba(255, 90, 117, 0.3)',
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  AIDisclaimerTitleFiligree: {
    color: colors.coral,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
  },
  AIDisclaimerTextFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19,
  },
  AIInfoCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },

  AIRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  AIRowLabelFiligree: {
    color: colors.textLabel,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  AIRowValueFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    textAlign: 'right',
    width: 200,
  },
});
