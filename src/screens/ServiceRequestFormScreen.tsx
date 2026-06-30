import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SecondaryButton} from '../components/buttons/PrimaryButton';
import {getServiceById, PARKING_AREAS, DINING_AREAS, SEAT_PREFERENCES, ACCESSIBILITY_TYPES} from '../data/winSpiritServices';
import {useServiceRequests, type ServiceRequestDraft} from '../context/ServiceRequestsContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

type Props = {serviceId: string};

export function ServiceRequestFormScreen({serviceId}: Props) {
  const {goBack, openServiceRequestReview} = useAppNavigation();
  const {setDraft} = useServiceRequests();
  const service = getServiceById(serviceId);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [guests, setGuests] = useState('');
  const [details, setDetails] = useState('');
  const [notes, setNotes] = useState('');
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setExtraField = (key: string, value: string) => setExtra(prev => ({...prev, [key]: value}));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!date.trim()) e.date = 'Required';
    if (!time.trim()) e.time = 'Required';
    if (!guestName.trim()) e.guestName = 'Required';
    if (!contact.trim()) e.contact = 'Required';
    if (!guests.trim()) e.guests = 'Required';
    if (!details.trim()) e.details = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    const draft: ServiceRequestDraft = {
      serviceId,
      preferredDate: date,
      preferredTime: time,
      guestName,
      contactNote: contact,
      numberOfGuests: guests,
      requestDetails: details,
      specialNotes: notes,
      extraFields: extra,
    };
    setDraft(draft);
    openServiceRequestReview(serviceId);
  };

  return (
    <View style={styles.SRFacetChassis}>

      <SubScreenHeader title="Service Request" onBack={goBack} />

      <ScrollView contentContainerStyle={styles.SRScrollContent} showsVerticalScrollIndicator={false}>
        {/* Selected service card */}
        {service && (
          <View style={styles.SRServiceCard}>
            <Text style={styles.SRServiceIconSigil}>{service.icon}</Text>
            <Text style={styles.SRServiceTitleFiligree}>{service.title}</Text>
            <Text style={styles.SRServiceDescFiligree}>{service.description}</Text>
            <View style={styles.SRServiceDraftStatusLintel}>
              <Text style={styles.SRServiceDraftStatusFiligree}>Draft</Text>
            </View>
          </View>
        )}

        <View style={styles.SRFormCard}>
          {[
            {label: 'PREFERRED DATE *', value: date, set: setDate, placeholder: 'Jun 16', key: 'date'},
            {label: 'PREFERRED TIME *', value: time, set: setTime, placeholder: '7:00 PM', key: 'time'},
            {label: 'GUEST NAME *', value: guestName, set: setGuestName, placeholder: 'Your name', key: 'guestName'},
            {label: 'PHONE OR CONTACT NOTE *', value: contact, set: setContact, placeholder: '+1 555 000 0000', key: 'contact'},
            {label: 'NUMBER OF GUESTS *', value: guests, set: setGuests, placeholder: '2', key: 'guests'},
          ].map(field => (
            <View key={field.key}>
              <Text style={styles.SRFormLabel}>{field.label}</Text>
              <TextInput
                style={[styles.SRInput, errors[field.key] ? styles.SRInputError : null]}
                value={field.value}
                onChangeText={field.set}
                placeholder={field.placeholder}
                placeholderTextColor={colors.textLabel}
              />
              {errors[field.key] && <Text style={styles.SRErrorFiligree}>{errors[field.key]}</Text>}
            </View>
          ))}

          {/* Parking-specific */}
          {serviceId === 'parking-place-request' && (
            <>
              <Text style={styles.SRFormLabel}>PREFERRED PARKING AREA</Text>
              <View style={styles.SRChipGrid}>
                {PARKING_AREAS.map(area => (
                  <SecondaryButton key={area} label={area} onPress={() => setExtraField('parkingArea', area)} active={extra.parkingArea === area} compact style={styles.SRChip} />
                ))}
              </View>
              <Text style={styles.SRFormLabel}>CAR NOTE OR LICENSE PLATE</Text>
              <TextInput style={styles.SRInput} value={extra.carNote ?? ''} onChangeText={v => setExtraField('carNote', v)} placeholder="Optional" placeholderTextColor={colors.textLabel} />
              <Text style={styles.SRFormLabel}>ARRIVAL TIME</Text>
              <TextInput style={styles.SRInput} value={extra.arrivalTime ?? ''} onChangeText={v => setExtraField('arrivalTime', v)} placeholder="6:00 PM" placeholderTextColor={colors.textLabel} />
            </>
          )}

          {/* Dining table */}
          {serviceId === 'dining-table-request' && (
            <>
              <Text style={styles.SRFormLabel}>PREFERRED DINING AREA</Text>
              <View style={styles.SRChipGrid}>
                {DINING_AREAS.map(area => (
                  <SecondaryButton key={area} label={area} onPress={() => setExtraField('diningArea', area)} active={extra.diningArea === area} compact style={styles.SRChip} />
                ))}
              </View>
              <Text style={styles.SRFormLabel}>TABLE SIZE</Text>
              <TextInput style={styles.SRInput} value={extra.tableSize ?? ''} onChangeText={v => setExtraField('tableSize', v)} placeholder="2 people" placeholderTextColor={colors.textLabel} />
            </>
          )}

          {/* Lounge seat */}
          {serviceId === 'lounge-seat-request' && (
            <>
              <Text style={styles.SRFormLabel}>SEAT PREFERENCE</Text>
              <View style={styles.SRChipGrid}>
                {SEAT_PREFERENCES.map(pref => (
                  <SecondaryButton key={pref} label={pref} onPress={() => setExtraField('seatPref', pref)} active={extra.seatPref === pref} compact style={styles.SRChip} />
                ))}
              </View>
            </>
          )}

          {/* Accessibility */}
          {serviceId === 'accessibility-support' && (
            <>
              <Text style={styles.SRFormLabel}>SUPPORT TYPE</Text>
              <View style={styles.SRChipGrid}>
                {ACCESSIBILITY_TYPES.map(type => (
                  <SecondaryButton key={type} label={type} onPress={() => setExtraField('supportType', type)} active={extra.supportType === type} compact style={styles.SRChip} />
                ))}
              </View>
              <Text style={styles.SRFormLabel}>MOBILITY NOTE</Text>
              <TextInput style={styles.SRInput} value={extra.mobilityNote ?? ''} onChangeText={v => setExtraField('mobilityNote', v)} placeholder="Optional details" placeholderTextColor={colors.textLabel} />
            </>
          )}

          <Text style={styles.SRFormLabel}>REQUEST DETAILS *</Text>
          <TextInput
            style={[styles.SRInput, styles.SRTextArea, errors.details ? styles.SRInputError : null]}
            value={details}
            onChangeText={setDetails}
            placeholder="Describe your request…"
            placeholderTextColor={colors.textLabel}
            multiline
          />
          {errors.details && <Text style={styles.SRErrorFiligree}>{errors.details}</Text>}

          <Text style={styles.SRFormLabel}>SPECIAL NOTES</Text>
          <TextInput
            style={[styles.SRInput, styles.SRTextArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Optional additional notes…"
            placeholderTextColor={colors.textLabel}
            multiline
          />
        </View>

        <PrimaryButton label="Continue Request" onPress={handleContinue} fullWidth icon="→" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SRFacetChassis: {backgroundColor: colors.surface, flex: 1},
  SRScrollContent: {gap: 12, paddingBottom: 32, paddingHorizontal: layout.screenPadding, paddingTop: 16},
  SRServiceCard: {backgroundColor: colors.cardHighlight, borderColor: colors.violet, borderRadius: radius.card, borderWidth: 1, gap: 6, padding: 16},
  SRServiceIconSigil: {fontSize: 28},
  SRServiceTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansSemiBold, fontSize: 16, fontWeight: '600'},
  SRServiceDescFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 13, lineHeight: 18},
  SRServiceDraftStatusLintel: {alignSelf: 'flex-start', backgroundColor: 'rgba(175, 162, 216, 0.15)', borderColor: colors.textLabel, borderRadius: 6, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3},
  SRServiceDraftStatusFiligree: {color: colors.textLabel, fontFamily: fonts.sansSemiBold, fontSize: 10, fontWeight: '600'},
  SRFormCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 10, padding: 16},
  SRFormLabel: {color: colors.textLabel, fontFamily: fonts.sansSemiBold, fontSize: 10, fontWeight: '600', letterSpacing: 1.2, marginTop: 4},
  SRInput: {backgroundColor: colors.inputBg, borderColor: colors.border, borderRadius: 12, borderWidth: 1, color: colors.textPrimary, fontFamily: fonts.sansRegular, fontSize: 14, paddingHorizontal: 14, paddingVertical: 12},
  SRInputError: {borderColor: colors.coral},
  SRTextArea: {height: 80, textAlignVertical: 'top'},
  SRErrorFiligree: {color: colors.coral, fontFamily: fonts.sansRegular, fontSize: 11},
  SRChipGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  SRChip: {flex: 0, paddingHorizontal: 12},
});
