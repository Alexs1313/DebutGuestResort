import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, radius} from '../constants/theme';

export function DiningOrderSuccessScreen() {
  const {selectTab, openSubmittedRequests} = useAppNavigation();

  return (
    <View style={styles.DOSFacetChassis}>
      <View style={styles.DOSContent}>
        <Text style={styles.DOSIconSigil}>✅</Text>
        <Text style={styles.DOSTitleFiligree}>Dining order sent</Text>
        <Text style={styles.DOSBodyFiligree}>
          Your dining request has been prepared for the Win Spirit venue team.
        </Text>
        <View style={styles.DOSStatusLintel}>
          <View style={styles.DOSStatusDot} />
          <Text style={styles.DOSStatusFiligree}>Order Sent</Text>
        </View>
        <PrimaryButton
          label="Back to Menu"
          onPress={() => selectTab('DiningTab')}
          fullWidth
        />
        <PrimaryButton
          label="View Submitted Requests"
          onPress={() => openSubmittedRequests('DiningOrders')}
          fullWidth
          icon="📋"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  DOSFacetChassis: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  DOSContent: {alignItems: 'center', gap: 16, width: '100%'},
  DOSIconSigil: {fontSize: 60},
  DOSTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  DOSBodyFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },

  DOSStatusLintel: {
    alignItems: 'center',
    backgroundColor: colors.successBg,
    borderColor: colors.success,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  DOSStatusDot: {
    backgroundColor: colors.success,
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  DOSStatusFiligree: {
    color: colors.success,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
  },
});
