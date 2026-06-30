import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {
  AFTER_OPENING_EVENTS,
  ALL_WEEK_DAYS,
  AFTER_EVENT_TYPE_STYLES,
  type AfterEventFilter,
  type WeekDay,
} from '../data/afterOpeningEvents';
import {useSavedAfterEvents} from '../context/SavedAfterEventsContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

const FILTER_CHIPS: AfterEventFilter[] = [
  'All',
  'Today',
  'Tomorrow',
  'Weekend',
  'Music',
  'Dining',
  'Lounge',
  'Guest Info',
];

const DAY_DATES: Record<WeekDay, number> = {
  Mon: 16,
  Tue: 17,
  Wed: 18,
  Thu: 19,
  Fri: 20,
  Sat: 21,
  Sun: 22,
};

function filterEvents(
  filter: AfterEventFilter,
  selectedDay: WeekDay | null,
  events: typeof AFTER_OPENING_EVENTS,
) {
  let result = events;
  if (selectedDay) {
    result = result.filter(e => e.day === selectedDay);
  }
  if (filter === 'All') return result;
  if (filter === 'Today') return result.filter(e => e.day === 'Fri');
  if (filter === 'Tomorrow') return result.filter(e => e.day === 'Sat');
  if (filter === 'Weekend')
    return result.filter(e => e.day === 'Sat' || e.day === 'Sun');
  if (filter === 'Music') return result.filter(e => e.type === 'Live Music');
  if (filter === 'Dining')
    return result.filter(
      e =>
        e.type === 'Dining Event' ||
        e.type === 'Dining Preview' ||
        e.type === 'Culinary Preview',
    );
  if (filter === 'Lounge')
    return result.filter(
      e =>
        e.type === 'Lounge Experience' ||
        e.type === 'Lounge Evening' ||
        e.type === 'Social Evening',
    );
  if (filter === 'Guest Info')
    return result.filter(e => e.type === 'Guest Info');
  return result;
}

export function AfterOpeningEventsScreen() {
  const {openAfterOpeningEventDetail, openSavedEvents} = useAppNavigation();
  const {isEventSaved, savedCount} = useSavedAfterEvents();
  const [selectedDay, setSelectedDay] = useState<WeekDay | null>(null);
  const [filter, setFilter] = useState<AfterEventFilter>('All');

  const visibleEvents = useMemo(
    () => filterEvents(filter, selectedDay, AFTER_OPENING_EVENTS),
    [filter, selectedDay],
  );

  return (
    <View style={styles.AEFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.AEScrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.AEHeaderLintel}>
          <View style={styles.AEHeaderTextLintel}>
            <Text style={styles.AEBrandFiligree}>AFTER OPENING</Text>
            <Text style={styles.AETitleFiligree}>After Opening Events</Text>
            <Text style={styles.AESubtitleFiligree}>
              Explore upcoming events after the opening celebration.
            </Text>
          </View>
          <Pressable onPress={openSavedEvents} style={styles.AESavedPortico}>
            <Text style={styles.AESavedSigil}>🔖</Text>
            {savedCount > 0 && (
              <View style={styles.AESavedBadge}>
                <Text style={styles.AESavedBadgeFiligree}>{savedCount}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Weekly Calendar */}
        <View style={styles.AECalendarSection}>
          <Text style={styles.AECalendarTitleFiligree}>Upcoming Week</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.AECalendarStrip}>
            {ALL_WEEK_DAYS.map(day => {
              const isActive = selectedDay === day;
              const dayEvents = AFTER_OPENING_EVENTS.filter(e => e.day === day);
              return (
                <Pressable
                  key={day}
                  onPress={() => setSelectedDay(isActive ? null : day)}
                  style={[
                    styles.AEDayCard,
                    isActive && styles.AEDayCardActive,
                  ]}>
                  <Text
                    style={[
                      styles.AEDayNameFiligree,
                      isActive && styles.AEDayNameActiveFiligree,
                    ]}>
                    {day}
                  </Text>
                  <Text
                    style={[
                      styles.AEDayNumFiligree,
                      isActive && styles.AEDayNumActiveFiligree,
                    ]}>
                    {DAY_DATES[day]}
                  </Text>
                  {dayEvents.length > 0 && (
                    <View
                      style={[
                        styles.AEDayDot,
                        isActive && styles.AEDayDotActive,
                      ]}
                    />
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.AEFilterStrip}>
          {FILTER_CHIPS.map(chip => (
            <Pressable
              key={chip}
              onPress={() => setFilter(chip)}
              style={[
                styles.AEFilterChip,
                filter === chip && styles.AEFilterChipActive,
              ]}>
              <Text
                style={[
                  styles.AEFilterChipFiligree,
                  filter === chip && styles.AEFilterChipActiveFiligree,
                ]}>
                {chip}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Event cards */}
        <View style={styles.AEEventListLintel}>
          {visibleEvents.length === 0 ? (
            <View style={styles.AEEmptyLintel}>
              <Text style={styles.AEEmptySigil}>📅</Text>
              <Text style={styles.AEEmptyTitleFiligree}>
                No events for this selection
              </Text>
              <Text style={styles.AEEmptyBodyFiligree}>
                Try a different day or filter.
              </Text>
            </View>
          ) : (
            visibleEvents.map(event => {
              const typeStyle = AFTER_EVENT_TYPE_STYLES[event.type];
              const saved = isEventSaved(event.id);
              return (
                <View key={event.id} style={styles.AEEventCard}>
                  <View style={styles.AEEventHeaderLintel}>
                    <View
                      style={[
                        styles.AEEventTypeBadge,
                        {backgroundColor: typeStyle.background},
                      ]}>
                      <Text
                        style={[
                          styles.AEEventTypeLabelFiligree,
                          {color: typeStyle.color},
                        ]}>
                        {event.type}
                      </Text>
                    </View>
                    {saved && <Text style={styles.AEEventSavedSigil}>🔖</Text>}
                  </View>
                  <Text style={styles.AEEventTitleFiligree}>{event.title}</Text>
                  <View style={styles.AEEventMetaLintel}>
                    <Text style={styles.AEEventMetaFiligree}>
                      📍 {event.room}
                    </Text>
                    <Text style={styles.AEEventMetaFiligree}>
                      📅 {event.day}
                    </Text>
                    <Text style={styles.AEEventMetaFiligree}>
                      ⏰ {event.time}
                    </Text>
                  </View>
                  <Text style={styles.AEEventDescFiligree} numberOfLines={2}>
                    {event.description}
                  </Text>
                  <Pressable
                    onPress={() => openAfterOpeningEventDetail(event.id)}
                    style={styles.AEViewEventPortico}>
                    <Text style={styles.AEViewEventFiligree}>View Event →</Text>
                  </Pressable>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  AEFacetChassis: {backgroundColor: colors.surface, flex: 1},
  AEScrollContent: {gap: 0, paddingBottom: 32, paddingTop: 64},
  AEHeaderLintel: {
    alignItems: 'flex-start',
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 16,
    paddingHorizontal: layout.screenPadding,
  },
  AEHeaderTextLintel: {flex: 1, gap: 4},
  AEBrandFiligree: {
    color: colors.neonPink,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    letterSpacing: 2.5,
  },
  AETitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 26,
    fontWeight: '700',
  },

  AESubtitleFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  AESavedPortico: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    width: 40,
  },
  AESavedSigil: {fontSize: 22},
  AESavedBadge: {
    alignItems: 'center',
    backgroundColor: colors.neonPink,
    borderRadius: 8,
    height: 16,
    justifyContent: 'center',
    minWidth: 16,
    paddingHorizontal: 3,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  AESavedBadgeFiligree: {
    color: colors.white,
    fontFamily: fonts.sansBold,
    fontSize: 9,
    fontWeight: '700',
  },
  // Calendar
  AECalendarSection: {
    gap: 10,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 16,
  },
  AECalendarTitleFiligree: {
    color: colors.textLabel,
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  AECalendarStrip: {gap: 8, paddingBottom: 4},
  AEDayCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 56,
  },
  AEDayCardActive: {
    backgroundColor: 'rgba(255, 44, 203, 0.15)',
    borderColor: colors.neonPink,
  },

  AEDayNameFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansMedium,
    fontSize: 11,
  },
  AEDayNameActiveFiligree: {color: colors.neonPink},
  AEDayNumFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  AEDayNumActiveFiligree: {color: colors.textPrimary},
  AEDayDot: {
    backgroundColor: colors.violet,
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  AEDayDotActive: {backgroundColor: colors.neonPink},
  // Filters
  AEFilterStrip: {
    gap: 8,
    paddingHorizontal: layout.screenPadding,
    paddingVertical: 12,
  },

  AEFilterChip: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  AEFilterChipActive: {
    backgroundColor: 'rgba(255, 44, 203, 0.15)',
    borderColor: colors.neonPink,
  },

  AEFilterChipFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
  },
  AEFilterChipActiveFiligree: {color: colors.neonPink},
  // Events
  AEEventListLintel: {gap: 10, paddingHorizontal: layout.screenPadding},
  AEEmptyLintel: {alignItems: 'center', gap: 10, paddingTop: 40},
  AEEmptySigil: {fontSize: 40},
  AEEmptyTitleFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    fontWeight: '600',
  },
  AEEmptyBodyFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  AEEventCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  AEEventHeaderLintel: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AEEventTypeBadge: {borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3},
  AEEventTypeLabelFiligree: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
  },

  AEEventSavedSigil: {fontSize: 16},
  AEEventTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
  },
  AEEventMetaLintel: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  AEEventMetaFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },
  AEEventDescFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
  },
  AEViewEventPortico: {
    alignSelf: 'flex-start',
    borderBottomColor: colors.neonPink,
    borderBottomWidth: 1,
    paddingBottom: 1,
  },

  AEViewEventFiligree: {
    color: colors.neonPink,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
  },
});
