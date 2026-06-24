import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SecondaryButton} from '../components/buttons/PrimaryButton';
import {getOpeningEventById, OPENING_TYPE_STYLES} from '../data/openingEvents';
import {SEAT_PREFERENCES, type SeatPreference} from '../data/winSpiritServices';
import {useOpeningBookings, type OpeningBookingDraft} from '../context/OpeningBookingsContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

type Props = {eventId: string};

export function ReserveEventSeatScreen({eventId}: Props) {
  const {goBack, openSeatReservationReview} = useAppNavigation();
  const {setDraft} = useOpeningBookings();
  const event = getOpeningEventById(eventId);

  const [date, setDate] = useState('Jun 16');
  const [timeSlot, setTimeSlot] = useState(event?.time ?? '');
  const [guests, setGuests] = useState('');
  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [seatPref, setSeatPref] = useState<SeatPreference>('No Preference');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!date.trim()) e.date = 'Required';
    if (!timeSlot.trim()) e.timeSlot = 'Required';
    if (!guests.trim()) e.guests = 'Required';
    if (!guestName.trim()) e.guestName = 'Required';
    if (!contact.trim()) e.contact = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    const draft: OpeningBookingDraft = {
      eventId,
      date,
      preferredTimeSlot: timeSlot,
      numberOfGuests: guests,
      guestName,
      contactNote: contact,
      seatPreference: seatPref,
      specialNotes: notes,
    };
    setDraft(draft);
    openSeatReservationReview(eventId);
  };

  const typeStyle = event ? OPENING_TYPE_STYLES[event.type] : null;

  return (
    <View style={styles.RSFacetChassis}>
      <SubScreenHeader title="Reserve Place" onBack={goBack} />
      <ScrollView contentContainerStyle={styles.RSScrollContent} showsVerticalScrollIndicator={false}>
        {/* Selected event card */}
        {event && typeStyle && (
          <View style={styles.RSEventCard}>
            <View style={[styles.RSEventBadge, {backgroundColor: typeStyle.background}]}>
              <Text style={[styles.RSEventBadgeFiligree, {color: typeStyle.color}]}>{event.type}</Text>
            </View>
            <Text style={styles.RSEventTitleFiligree}>{event.title}</Text>
            <Text style={styles.RSEventMetaFiligree}>⏰ {event.time} · 📍 {event.location}</Text>
          </View>
        )}

        <View style={styles.RSFormCard}>
          {[
            {label: 'DATE *', value: date, set: setDate, placeholder: 'Jun 16', key: 'date'},
            {label: 'PREFERRED TIME SLOT *', value: timeSlot, set: setTimeSlot, placeholder: event?.time ?? '7:30 PM', key: 'timeSlot'},
            {label: 'NUMBER OF GUESTS *', value: guests, set: setGuests, placeholder: '2', key: 'guests'},
            {label: 'GUEST NAME *', value: guestName, set: setGuestName, placeholder: 'Your name', key: 'guestName'},
            {label: 'PHONE OR CONTACT NOTE *', value: contact, set: setContact, placeholder: '+1 555 000 0000', key: 'contact'},
          ].map(field => (
            <View key={field.key}>
              <Text style={styles.RSFormLabel}>{field.label}</Text>
              <TextInput
                style={[styles.RSInput, errors[field.key] ? styles.RSInputError : null]}
                value={field.value}
                onChangeText={field.set}
                placeholder={field.placeholder}
                placeholderTextColor={colors.textLabel}
              />
              {errors[field.key] && <Text style={styles.RSErrorFiligree}>{errors[field.key]}</Text>}
            </View>
          ))}

          <Text style={styles.RSFormLabel}>SEAT PREFERENCE</Text>
          <View style={styles.RSSeatChipsLintel}>
            {SEAT_PREFERENCES.map(pref => (
              <SecondaryButton
                key={pref}
                label={pref}
                onPress={() => setSeatPref(pref)}
                active={seatPref === pref}
                compact
                style={styles.RSSeatChip}
              />
            ))}
          </View>

          <Text style={styles.RSFormLabel}>SPECIAL NOTES</Text>
          <TextInput
            style={[styles.RSInput, styles.RSTextArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any additional requests…"
            placeholderTextColor={colors.textLabel}
            multiline
          />
        </View>

        <PrimaryButton label="Continue Reservation" onPress={handleContinue} fullWidth icon="→" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  RSFacetChassis: {backgroundColor: colors.surface, flex: 1},
  RSScrollContent: {gap: 12, paddingBottom: 32, paddingHorizontal: layout.screenPadding, paddingTop: 16},
  RSEventCard: {backgroundColor: colors.cardHighlight, borderColor: colors.violet, borderRadius: radius.card, borderWidth: 1, gap: 8, padding: 16},
  RSEventBadge: {alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3},
  RSEventBadgeFiligree: {fontFamily: fonts.sansSemiBold, fontSize: 10, fontWeight: '600'},
  RSEventTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansSemiBold, fontSize: 15, fontWeight: '600'},
  RSEventMetaFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 12},
  RSFormCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 10, padding: 16},
  RSFormLabel: {color: colors.textLabel, fontFamily: fonts.sansSemiBold, fontSize: 10, fontWeight: '600', letterSpacing: 1.2, marginTop: 4},
  RSInput: {backgroundColor: colors.inputBg, borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.textPrimary, fontFamily: fonts.sansRegular, fontSize: 14, paddingHorizontal: 14, paddingVertical: 12},
  RSInputError: {borderColor: colors.coral},
  RSErrorFiligree: {color: colors.coral, fontFamily: fonts.sansRegular, fontSize: 11, marginTop: 2},
  RSTextArea: {height: 80, textAlignVertical: 'top'},
  RSSeatChipsLintel: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  RSSeatChip: {flex: 0, paddingHorizontal: 14},
});
