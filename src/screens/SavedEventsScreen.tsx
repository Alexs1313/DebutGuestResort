import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {AFTER_OPENING_EVENTS, AFTER_EVENT_TYPE_STYLES} from '../data/afterOpeningEvents';
import {useSavedAfterEvents} from '../context/SavedAfterEventsContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

export function SavedEventsScreen() {
  const {goBack, openAfterOpeningEventDetail, selectTab} = useAppNavigation();
  const {savedEventIds, toggleSaved} = useSavedAfterEvents();

  const savedEvents = AFTER_OPENING_EVENTS.filter(e => savedEventIds.includes(e.id));

  return (
    <View style={styles.SEFacetChassis}>

      <SubScreenHeader title="Saved Events" onBack={goBack} />

      <ScrollView contentContainerStyle={styles.SEScrollContent} showsVerticalScrollIndicator={false}>
        {savedEvents.length === 0 ? (
          <View style={styles.SEEmptyLintel}>
            <Text style={styles.SEEmptySigil}>🔖</Text>
            <Text style={styles.SEEmptyTitleFiligree}>No saved events yet</Text>
            <Text style={styles.SEEmptyBodyFiligree}>
              Save events from the After Opening Events screen to build your visit plan.
            </Text>
            <PrimaryButton label="Browse Events" onPress={() => selectTab('EventsTab')} fullWidth />
          </View>
        ) : (
          savedEvents.map(event => {
            const typeStyle = AFTER_EVENT_TYPE_STYLES[event.type];
            return (
              <Pressable key={event.id} onPress={() => openAfterOpeningEventDetail(event.id)} style={styles.SEEventCard}>
                <View style={styles.SEEventHeaderLintel}>
                  <View style={[styles.SEEventTypeBadge, {backgroundColor: typeStyle.background}]}>
                    <Text style={[styles.SEEventTypeFiligree, {color: typeStyle.color}]}>{event.type}</Text>
                  </View>
                  <Pressable onPress={() => toggleSaved(event.id)} style={styles.SESavedPortico}>
                    <Text style={styles.SESavedSigil}>🔖</Text>
                  </Pressable>
                </View>
                <Text style={styles.SEEventTitleFiligree}>{event.title}</Text>
                <View style={styles.SEEventMetaLintel}>
                  <Text style={styles.SEEventMetaFiligree}>📍 {event.room}</Text>
                  <Text style={styles.SEEventMetaFiligree}>📅 {event.day}</Text>
                  <Text style={styles.SEEventMetaFiligree}>⏰ {event.time}</Text>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SEFacetChassis: {backgroundColor: colors.surface, flex: 1},
  SEScrollContent: {gap: 10, paddingBottom: 32, paddingHorizontal: layout.screenPadding, paddingTop: 16},
  SEEmptyLintel: {alignItems: 'center', gap: 14, paddingTop: 60},
  SEEmptySigil: {fontSize: 52},
  SEEmptyTitleFiligree: {color: colors.textSecondary, fontFamily: fonts.sansSemiBold, fontSize: 18, fontWeight: '600', textAlign: 'center'},
  SEEmptyBodyFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 14, lineHeight: 20, textAlign: 'center'},
  SEEventCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 8, padding: 16},
  SEEventHeaderLintel: {alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'},
  SEEventTypeBadge: {borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3},
  SEEventTypeFiligree: {fontFamily: fonts.sansSemiBold, fontSize: 10, fontWeight: '600'},
  SESavedPortico: {padding: 4},
  SESavedSigil: {fontSize: 18},
  SEEventTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansSemiBold, fontSize: 15, fontWeight: '600'},
  SEEventMetaLintel: {flexDirection: 'row', flexWrap: 'wrap', gap: 10},
  SEEventMetaFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 12},
});
