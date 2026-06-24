import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SecondaryButton} from '../components/buttons/PrimaryButton';
import {
  getAfterOpeningEventById,
  AFTER_EVENT_TYPE_STYLES,
} from '../data/afterOpeningEvents';
import {useSavedAfterEvents} from '../context/SavedAfterEventsContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

type Props = {eventId: string};

export function AfterOpeningEventDetailScreen({eventId}: Props) {
  const {goBack} = useAppNavigation();
  const {isEventSaved, toggleSaved} = useSavedAfterEvents();
  const event = getAfterOpeningEventById(eventId);
  const saved = isEventSaved(eventId);

  if (!event) return null;

  const typeStyle = AFTER_EVENT_TYPE_STYLES[event.type];

  return (
    <View style={styles.AEDFacetChassis}>
      <SubScreenHeader title={event.title} onBack={goBack} />
      <ScrollView
        contentContainerStyle={styles.AEDScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.AEDHeroLintel}>
          <View
            style={[
              styles.AEDTypeBadge,
              {backgroundColor: typeStyle.background},
            ]}>
            <Text style={[styles.AEDTypeFiligree, {color: typeStyle.color}]}>
              {event.type}
            </Text>
          </View>
          <Text style={styles.AEDTitleFiligree}>{event.title}</Text>
          <View style={styles.AEDMetaLintel}>
            <Text style={styles.AEDMetaFiligree}>📍 {event.room}</Text>
            <Text style={styles.AEDMetaFiligree}>📅 {event.day}</Text>
            <Text style={styles.AEDMetaFiligree}>⏰ {event.time}</Text>
          </View>
        </View>

        <View style={styles.AEDCard}>
          <Text style={styles.AEDSectionLabel}>DESCRIPTION</Text>
          <Text style={styles.AEDBodyFiligree}>{event.description}</Text>
        </View>

        <View style={styles.AEDCard}>
          {[
            {label: 'Guest Count', value: event.guestCount},
            {label: 'Dress Mood', value: event.dressMood},
          ].map(row => (
            <View key={row.label} style={styles.AEDRowLintel}>
              <Text style={styles.AEDRowLabelFiligree}>{row.label}</Text>
              <Text style={styles.AEDRowValueFiligree}>{row.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.AEDNoteCard}>
          <Text style={styles.AEDNoteIconSigil}>💡</Text>
          <Text style={styles.AEDNoteFiligree}>{event.usefulNote}</Text>
        </View>

        <SecondaryButton
          label={saved ? 'Saved ✓' : 'Save Event'}
          onPress={() => toggleSaved(eventId)}
          active={saved}
          icon={saved ? undefined : '🔖'}
          fullWidth
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  AEDFacetChassis: {backgroundColor: colors.surface, flex: 1},
  AEDScrollContent: {
    gap: 12,
    paddingBottom: 32,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 16,
  },
  AEDHeroLintel: {gap: 8},
  AEDTypeBadge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  AEDTypeFiligree: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
  },
  AEDTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 24,
    fontWeight: '700',
  },
  AEDMetaLintel: {flexDirection: 'row', flexWrap: 'wrap', gap: 12},
  AEDMetaFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },

  AEDCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  AEDSectionLabel: {
    color: colors.textLabel,
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  AEDBodyFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  AEDRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  AEDRowLabelFiligree: {
    color: colors.textLabel,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },

  AEDRowValueFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    textAlign: 'right',
  },
  AEDNoteCard: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(139, 61, 255, 0.1)',
    borderColor: 'rgba(139, 61, 255, 0.3)',
    borderRadius: radius.card,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 14,
  },

  AEDNoteIconSigil: {fontSize: 18},
  AEDNoteFiligree: {
    color: colors.textSecondary,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19,
  },
});
