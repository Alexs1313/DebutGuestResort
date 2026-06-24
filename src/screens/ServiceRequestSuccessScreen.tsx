import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SecondaryButton} from '../components/buttons/PrimaryButton';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, radius} from '../constants/theme';

export function ServiceRequestSuccessScreen() {
  const {selectTab, openSubmittedRequests} = useAppNavigation();

  return (
    <View style={styles.SRSFacetChassis}>
      <View style={styles.SRSContent}>
        <Text style={styles.SRSIconSigil}>✅</Text>
        <Text style={styles.SRSTitleFiligree}>Service request sent</Text>
        <Text style={styles.SRSBodyFiligree}>
          Your request has been sent for review. Venue staff may confirm availability or details during your visit.
        </Text>
        <View style={styles.SRSStatusLintel}>
          <View style={styles.SRSStatusDot} />
          <Text style={styles.SRSStatusFiligree}>In Review</Text>
        </View>
        <PrimaryButton label="View Submitted Requests" onPress={() => openSubmittedRequests('Services')} fullWidth icon="📋" />
        <PrimaryButton label="Back to Services" onPress={() => selectTab('ServicesTab')} fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SRSFacetChassis: {alignItems: 'center', backgroundColor: colors.surface, flex: 1, justifyContent: 'center', paddingHorizontal: 32},
  SRSContent: {alignItems: 'center', gap: 16, width: '100%'},
  SRSIconSigil: {fontSize: 60},
  SRSTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansBold, fontSize: 24, fontWeight: '700', textAlign: 'center'},
  SRSBodyFiligree: {color: colors.textSecondary, fontFamily: fonts.sansRegular, fontSize: 14, lineHeight: 21, textAlign: 'center'},
  SRSStatusLintel: {alignItems: 'center', backgroundColor: colors.inReviewBg, borderColor: colors.inReview, borderRadius: 10, borderWidth: 1, flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 8},
  SRSStatusDot: {backgroundColor: colors.inReview, borderRadius: 4, height: 8, width: 8},
  SRSStatusFiligree: {color: colors.inReview, fontFamily: fonts.sansSemiBold, fontSize: 13, fontWeight: '600'},
});
