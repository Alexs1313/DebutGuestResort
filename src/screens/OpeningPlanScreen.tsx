import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  OPENING_EVENTS,
  OPENING_TIMELINE,
  OPENING_TYPE_STYLES,
} from '../data/openingEvents';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SecondaryButton} from '../components/buttons/PrimaryButton';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

export function OpeningPlanScreen() {
  const {openOpeningEventDetail, openReserveEventSeat} = useAppNavigation();

  return (
    <View style={styles.OpeningFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.OpeningScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.OpeningHeaderLintel}>
          <Text style={styles.OpeningBrandFiligree}>OPENING NIGHT</Text>
          <Text style={styles.OpeningTitleFiligree}>Opening Plan</Text>
          <Text style={styles.OpeningSubtitleFiligree}>
            See what to expect during the opening event.
          </Text>
        </View>

        {/* Timeline summary card */}
        <View style={styles.OpeningTimelineCard}>
          <Text style={styles.OpeningTimelineTitleFiligree}>Opening Night</Text>
          {OPENING_TIMELINE.map((item, i) => (
            <View key={i} style={styles.OpeningTimelineRowLintel}>
              <Text style={styles.OpeningTimelineLabelFiligree}>
                {item.time}
              </Text>
              <Text style={styles.OpeningTimelineValueFiligree}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Event cards */}
        <View style={styles.OpeningEventListLintel}>
          {OPENING_EVENTS.map(event => {
            const typeStyle = OPENING_TYPE_STYLES[event.type];
            return (
              <View key={event.id} style={styles.OpeningEventCard}>
                <View style={styles.OpeningEventHeaderLintel}>
                  <View
                    style={[
                      styles.OpeningEventTypeBadge,
                      {backgroundColor: typeStyle.background},
                    ]}>
                    <Text
                      style={[
                        styles.OpeningEventTypeLabelFiligree,
                        {color: typeStyle.color},
                      ]}>
                      {event.type}
                    </Text>
                  </View>
                </View>
                <Text style={styles.OpeningEventTitleFiligree}>
                  {event.title}
                </Text>
                <View style={styles.OpeningEventMetaLintel}>
                  <Text style={styles.OpeningEventMetaFiligree}>
                    📍 {event.location}
                  </Text>
                  <Text style={styles.OpeningEventMetaFiligree}>
                    ⏰ {event.time}
                  </Text>
                </View>
                <Text style={styles.OpeningEventDescFiligree} numberOfLines={2}>
                  {event.description}
                </Text>
                <View style={styles.OpeningEventActionsLintel}>
                  <SecondaryButton
                    label="View Details"
                    onPress={() => openOpeningEventDetail(event.id)}
                    compact
                  />
                  {event.reservationAvailable && (
                    <PrimaryButton
                      label="Reserve Place"
                      onPress={() => openReserveEventSeat(event.id)}
                      compact
                      style={styles.OpeningEventReserveBtn}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  OpeningFacetChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  OpeningScrollContent: {
    gap: 0,
    paddingBottom: 32,
    paddingTop: 64,
  },

  OpeningHeaderLintel: {
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
    gap: 4,
    paddingBottom: 16,
    paddingHorizontal: layout.screenPadding,
  },

  OpeningBrandFiligree: {
    color: colors.neonPink,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    letterSpacing: 2.5,
  },
  OpeningTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 28,
    fontWeight: '700',
  },
  OpeningSubtitleFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  OpeningTimelineCard: {
    backgroundColor: colors.cardHighlight,
    borderColor: colors.violet,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 10,
    margin: layout.screenPadding,
    padding: 16,
  },

  OpeningTimelineTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  OpeningTimelineRowLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OpeningTimelineLabelFiligree: {
    color: colors.textLabel,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  OpeningTimelineValueFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
  },
  OpeningEventListLintel: {
    gap: 10,
    paddingHorizontal: layout.screenPadding,
  },

  OpeningEventCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  OpeningEventHeaderLintel: {
    flexDirection: 'row',
  },
  OpeningEventTypeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  OpeningEventTypeLabelFiligree: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  OpeningEventTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
  },
  OpeningEventMetaLintel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  OpeningEventMetaFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },

  OpeningEventDescFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
  },
  OpeningEventActionsLintel: {
    flexDirection: 'row',
    gap: 8,
  },
  OpeningEventReserveBtn: {
    flex: 1,
  },
});
