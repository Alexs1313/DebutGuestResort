import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {GUEST_TIPS} from '../data/guestTips';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

export function GuestTipsScreen() {
  const {goBack} = useAppNavigation();

  return (
    <View style={styles.GTFacetChassis}>

      <SubScreenHeader title="Guest Tips" onBack={goBack} />

      <ScrollView
        contentContainerStyle={styles.GTScrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.GTSubtitleFiligree}>
          Useful tips for a smoother opening visit.
        </Text>
        {GUEST_TIPS.map(tip => (
          <View key={tip.id} style={styles.GTTipCard}>
            <Text style={styles.GTTipIconSigil}>{tip.icon}</Text>
            <Text style={styles.GTTipTextFiligree}>{tip.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  GTFacetChassis: {backgroundColor: colors.surface, flex: 1},
  GTScrollContent: {
    gap: 10,
    paddingBottom: 32,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 16,
  },
  GTSubtitleFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    marginBottom: 8,
  },

  GTTipCard: {
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },

  GTTipIconSigil: {fontSize: 22},
  GTTipTextFiligree: {
    color: colors.textSecondary,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },
});
