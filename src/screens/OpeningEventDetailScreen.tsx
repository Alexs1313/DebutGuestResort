import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {getOpeningEventById, OPENING_TYPE_STYLES} from '../data/openingEvents';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

type Props = {eventId: string};

export function OpeningEventDetailScreen({eventId}: Props) {
  const {goBack, openReserveEventSeat} = useAppNavigation();
  const event = getOpeningEventById(eventId);

  if (!event) return null;

  const typeStyle = OPENING_TYPE_STYLES[event.type];

  return (
    <View style={styles.OEDFacetChassis}>
      <SubScreenHeader title={event.title} onBack={goBack} />
      <ScrollView
        contentContainerStyle={styles.OEDScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.OEDHeroLintel}>
          <View
            style={[
              styles.OEDTypeBadge,
              {backgroundColor: typeStyle.background},
            ]}>
            <Text style={[styles.OEDTypeFiligree, {color: typeStyle.color}]}>
              {event.type}
            </Text>
          </View>
          <Text style={styles.OEDTitleFiligree}>{event.title}</Text>
          <View style={styles.OEDMetaLintel}>
            <Text style={styles.OEDMetaFiligree}>📍 {event.location}</Text>
            <Text style={styles.OEDMetaFiligree}>⏰ {event.time}</Text>
          </View>
        </View>

        <View style={styles.OEDCard}>
          <Text style={styles.OEDSectionLabel}>DESCRIPTION</Text>
          <Text style={styles.OEDBodyFiligree}>{event.description}</Text>
        </View>

        <View style={styles.OEDCard}>
          {[
            {label: 'Expected Guests', value: event.expectedGuestCount},
            {label: 'Dress Mood', value: event.dressMood},
            {
              label: 'Reservation',
              value: event.reservationAvailable ? 'Available' : 'Not Required',
            },
          ].map(row => (
            <View key={row.label} style={styles.OEDRowLintel}>
              <Text style={styles.OEDRowLabelFiligree}>{row.label}</Text>
              <Text style={styles.OEDRowValueFiligree}>{row.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.OEDNoteCard}>
          <Text style={styles.OEDNoteIconSigil}>💡</Text>
          <Text style={styles.OEDNoteFiligree}>{event.usefulNote}</Text>
        </View>

        {event.reservationAvailable && (
          <PrimaryButton
            label="Reserve Place"
            onPress={() => openReserveEventSeat(eventId)}
            fullWidth
            icon="🎫"
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  OEDFacetChassis: {backgroundColor: colors.surface, flex: 1},
  OEDScrollContent: {
    gap: 12,
    paddingBottom: 32,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 16,
  },

  OEDHeroLintel: {gap: 8},
  OEDTypeBadge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  OEDTypeFiligree: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  OEDTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 24,
    fontWeight: '700',
  },
  OEDMetaLintel: {flexDirection: 'row', flexWrap: 'wrap', gap: 12},
  OEDMetaFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  OEDCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  OEDSectionLabel: {
    color: colors.textLabel,
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
  },

  OEDBodyFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 20,
  },

  OEDRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  OEDRowLabelFiligree: {
    color: colors.textLabel,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  OEDRowValueFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    textAlign: 'right',
  },
  OEDNoteCard: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(139, 61, 255, 0.1)',
    borderColor: 'rgba(139, 61, 255, 0.3)',
    borderRadius: radius.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 14,
  },

  OEDNoteIconSigil: {fontSize: 18},
  OEDNoteFiligree: {
    color: colors.textSecondary,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19,
  },
});
