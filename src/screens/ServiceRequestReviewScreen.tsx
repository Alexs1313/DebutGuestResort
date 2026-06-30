import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SecondaryButton} from '../components/buttons/PrimaryButton';
import {getServiceById} from '../data/winSpiritServices';
import {useServiceRequests} from '../context/ServiceRequestsContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

type Props = {serviceId: string};

export function ServiceRequestReviewScreen({serviceId}: Props) {
  const {goBack, openServiceRequestSuccess, openServiceRequestForm} = useAppNavigation();
  const {draft, submitRequest} = useServiceRequests();
  const service = getServiceById(serviceId);

  if (!draft) {
    goBack();
    return null;
  }

  const handleSend = () => {
    submitRequest();
    openServiceRequestSuccess();
  };

  const mainRows = [
    {label: 'Service', value: service?.title ?? serviceId},
    {label: 'Preferred Date', value: draft.preferredDate},
    {label: 'Preferred Time', value: draft.preferredTime},
    {label: 'Guest Name', value: draft.guestName},
    {label: 'Contact Note', value: draft.contactNote},
    {label: 'Number of Guests', value: draft.numberOfGuests},
    {label: 'Request Details', value: draft.requestDetails},
    ...(draft.specialNotes ? [{label: 'Special Notes', value: draft.specialNotes}] : []),
  ];

  const extraRows = Object.entries(draft.extraFields)
    .filter(([, v]) => v)
    .map(([k, v]) => ({
      label: k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
      value: v,
    }));

  return (
    <View style={styles.SRRVFacetChassis}>

      <SubScreenHeader title="Review Service Request" onBack={goBack} />

      <ScrollView contentContainerStyle={styles.SRRVScrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.SRRVSubtitleFiligree}>Check your details before sending the request for review.</Text>

        <View style={styles.SRRVSummaryCard}>
          {[...mainRows, ...extraRows].map(row => (
            <View key={row.label} style={styles.SRRVRowLintel}>
              <Text style={styles.SRRVLabelFiligree}>{row.label}</Text>
              <Text style={styles.SRRVValueFiligree}>{row.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.SRRVActionsLintel}>
          <SecondaryButton label="Edit Details" onPress={() => openServiceRequestForm(serviceId)} compact />
          <PrimaryButton label="Send Service Request" onPress={handleSend} icon="✉️" style={styles.SRRVSendBtn} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SRRVFacetChassis: {backgroundColor: colors.surface, flex: 1},
  SRRVScrollContent: {gap: 14, paddingBottom: 32, paddingHorizontal: layout.screenPadding, paddingTop: 16},
  SRRVSubtitleFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 14},
  SRRVSummaryCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 12, padding: 16},
  SRRVRowLintel: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2},
  SRRVLabelFiligree: {color: colors.textLabel, fontFamily: fonts.sansRegular, fontSize: 13},
  SRRVValueFiligree: {color: colors.textSecondary, fontFamily: fonts.sansMedium, fontSize: 13, maxWidth: '55%', textAlign: 'right'},
  SRRVActionsLintel: {flexDirection: 'row', gap: 10},
  SRRVSendBtn: {flex: 1},
});
