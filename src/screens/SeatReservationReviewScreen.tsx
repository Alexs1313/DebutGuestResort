import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SecondaryButton} from '../components/buttons/PrimaryButton';
import {getOpeningEventById} from '../data/openingEvents';
import {useOpeningBookings} from '../context/OpeningBookingsContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

type Props = {eventId: string};

export function SeatReservationReviewScreen({eventId}: Props) {
  const {goBack, openSeatReservationSuccess, openReserveEventSeat} = useAppNavigation();
  const {draft, submitBooking} = useOpeningBookings();
  const event = getOpeningEventById(eventId);

  if (!draft) {
    goBack();
    return null;
  }

  const handleSend = () => {
    submitBooking();
    openSeatReservationSuccess();
  };

  const rows = [
    {label: 'Opening Event', value: event?.title ?? draft.eventId},
    {label: 'Date', value: draft.date},
    {label: 'Time Slot', value: draft.preferredTimeSlot},
    {label: 'Number of Guests', value: draft.numberOfGuests},
    {label: 'Guest Name', value: draft.guestName},
    {label: 'Contact Note', value: draft.contactNote},
    {label: 'Seat Preference', value: draft.seatPreference},
    ...(draft.specialNotes ? [{label: 'Special Notes', value: draft.specialNotes}] : []),
  ];

  return (
    <View style={styles.SRRFacetChassis}>

      <SubScreenHeader title="Review Reservation" onBack={goBack} />

      <ScrollView contentContainerStyle={styles.SRRScrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.SRRSubtitleFiligree}>Check your details before sending the request.</Text>
        <View style={styles.SRRSummaryCard}>
          {rows.map(row => (
            <View key={row.label} style={styles.SRRRowLintel}>
              <Text style={styles.SRRLabelFiligree}>{row.label}</Text>
              <Text style={styles.SRRValueFiligree}>{row.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.SRRActionsLintel}>
          <SecondaryButton label="Edit Details" onPress={() => openReserveEventSeat(eventId)} compact />
          <PrimaryButton label="Send Reservation" onPress={handleSend} icon="✉️" style={styles.SRRSendBtn} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SRRFacetChassis: {backgroundColor: colors.surface, flex: 1},
  SRRScrollContent: {gap: 14, paddingBottom: 32, paddingHorizontal: layout.screenPadding, paddingTop: 16},
  SRRSubtitleFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 14},
  SRRSummaryCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 12, padding: 16},
  SRRRowLintel: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2},
  SRRLabelFiligree: {color: colors.textLabel, fontFamily: fonts.sansRegular, fontSize: 13},
  SRRValueFiligree: {color: colors.textSecondary, fontFamily: fonts.sansMedium, fontSize: 13, maxWidth: '55%', textAlign: 'right'},
  SRRActionsLintel: {flexDirection: 'row', gap: 10},
  SRRSendBtn: {flex: 1},
});
