import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {WIN_SPIRIT_SERVICES, SERVICE_TAG_STYLES} from '../data/winSpiritServices';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

const HUB_CARDS = [
  {id: 'qa', icon: '❓', title: 'Q&A Help', desc: 'Find quick answers for access, services, reservations, events, dining orders, and submitted requests.'},
  {id: 'saved', icon: '🔖', title: 'Saved Events', desc: 'View events you saved from the After Opening Events screen.'},
  {id: 'tips', icon: '💡', title: 'Guest Tips', desc: 'Read useful tips for a smoother opening visit.'},
  {id: 'venue', icon: '🏨', title: 'Venue Info', desc: 'View a simple overview of the opening venue tools inside the app.'},
  {id: 'app', icon: 'ℹ️', title: 'App Info', desc: 'Learn what this opening guest app is designed to help with.'},
] as const;

export function ServicesScreen() {
  const {openServiceRequestForm, openSubmittedRequests, openQAHelp, openSavedEvents, openGuestTips, openVenueInfo, openAppInfo} = useAppNavigation();

  const hubActions: Record<string, () => void> = {
    qa: openQAHelp, saved: openSavedEvents, tips: openGuestTips, venue: openVenueInfo, app: openAppInfo,
  };

  return (
    <View style={styles.SvcFacetChassis}>
      <ScrollView contentContainerStyle={styles.SvcScrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.SvcHeaderLintel}>
          <Text style={styles.SvcBrandFiligree}>GUEST SERVICES</Text>
          <Text style={styles.SvcTitleFiligree}>Services</Text>
          <Text style={styles.SvcSubtitleFiligree}>Request guest services and review everything you have sent for venue review.</Text>
        </View>

        {/* Summary card */}
        <View style={styles.SvcSummaryCard}>
          <Text style={styles.SvcSummaryTitleFiligree}>Welcome Events & Service</Text>
          <Text style={styles.SvcSummaryBodyFiligree}>
            Choose a service, send a request, and let the venue team review your details.
          </Text>
          <PrimaryButton label="View Submitted Requests" onPress={() => openSubmittedRequests()} fullWidth icon="📋" />
        </View>

        {/* Service list */}
        <Text style={styles.SvcSectionLabelFiligree}>Guest Services</Text>
        <View style={styles.SvcServiceListLintel}>
          {WIN_SPIRIT_SERVICES.map(service => {
            const tagStyle = SERVICE_TAG_STYLES[service.tag];
            return (
              <View key={service.id} style={styles.SvcServiceCard}>
                <View style={styles.SvcServiceHeaderLintel}>
                  <Text style={styles.SvcServiceIconSigil}>{service.icon}</Text>
                  <View style={styles.SvcServiceHeaderTextLintel}>
                    <View style={[styles.SvcServiceTagBadge, {backgroundColor: tagStyle.background}]}>
                      <Text style={[styles.SvcServiceTagFiligree, {color: tagStyle.color}]}>{service.tag}</Text>
                    </View>
                    <Text style={styles.SvcServiceTitleFiligree}>{service.title}</Text>
                  </View>
                </View>
                <Text style={styles.SvcServiceDescFiligree}>{service.description}</Text>
                <PrimaryButton
                  label="Request Service"
                  onPress={() => openServiceRequestForm(service.id)}
                  fullWidth
                  compact
                />
              </View>
            );
          })}
        </View>

        {/* Hub cards */}
        <Text style={styles.SvcSectionLabelFiligree}>Need quick answers?</Text>
        <View style={styles.SvcHubListLintel}>
          {HUB_CARDS.map(card => (
            <Pressable key={card.id} onPress={hubActions[card.id]} style={styles.SvcHubCard}>
              <View style={styles.SvcHubIconLintel}>
                <Text style={styles.SvcHubIconSigil}>{card.icon}</Text>
              </View>
              <View style={styles.SvcHubTextLintel}>
                <Text style={styles.SvcHubTitleFiligree}>{card.title}</Text>
                <Text style={styles.SvcHubDescFiligree}>{card.desc}</Text>
              </View>
              <Text style={styles.SvcHubArrowSigil}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SvcFacetChassis: {backgroundColor: colors.surface, flex: 1},
  SvcScrollContent: {gap: 0, paddingBottom: 32, paddingTop: 64},
  SvcHeaderLintel: {borderBottomColor: colors.divider, borderBottomWidth: 1, gap: 4, paddingBottom: 16, paddingHorizontal: layout.screenPadding},
  SvcBrandFiligree: {color: colors.neonPink, fontFamily: fonts.sansRegular, fontSize: 10, letterSpacing: 2.5},
  SvcTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansBold, fontSize: 28, fontWeight: '700'},
  SvcSubtitleFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 13},
  SvcSummaryCard: {backgroundColor: colors.cardHighlight, borderColor: colors.violet, borderRadius: radius.card, borderWidth: 1, gap: 12, margin: layout.screenPadding, padding: 16},
  SvcSummaryTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansBold, fontSize: 16, fontWeight: '700'},
  SvcSummaryBodyFiligree: {color: colors.textSecondary, fontFamily: fonts.sansRegular, fontSize: 13, lineHeight: 19},
  SvcSectionLabelFiligree: {color: colors.textLabel, fontFamily: fonts.sansSemiBold, fontSize: 11, fontWeight: '600', letterSpacing: 1.2, paddingHorizontal: layout.screenPadding, paddingTop: 8, textTransform: 'uppercase'},
  SvcServiceListLintel: {gap: 10, paddingHorizontal: layout.screenPadding, paddingTop: 10},
  SvcServiceCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 12, padding: 16},
  SvcServiceHeaderLintel: {alignItems: 'flex-start', flexDirection: 'row', gap: 12},
  SvcServiceIconSigil: {fontSize: 26},
  SvcServiceHeaderTextLintel: {flex: 1, gap: 4},
  SvcServiceTagBadge: {alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3},
  SvcServiceTagFiligree: {fontFamily: fonts.sansSemiBold, fontSize: 10, fontWeight: '600'},
  SvcServiceTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansSemiBold, fontSize: 14, fontWeight: '600'},
  SvcServiceDescFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 13, lineHeight: 18},
  SvcHubListLintel: {gap: 8, paddingHorizontal: layout.screenPadding, paddingTop: 10},
  SvcHubCard: {alignItems: 'center', backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, flexDirection: 'row', gap: 12, padding: 14},
  SvcHubIconLintel: {alignItems: 'center', backgroundColor: colors.cardHighlight, borderRadius: 12, height: 44, justifyContent: 'center', width: 44},
  SvcHubIconSigil: {fontSize: 22},
  SvcHubTextLintel: {flex: 1, gap: 2},
  SvcHubTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansSemiBold, fontSize: 14, fontWeight: '600'},
  SvcHubDescFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 12, lineHeight: 17},
  SvcHubArrowSigil: {color: colors.textLabel, fontSize: 22},
});
