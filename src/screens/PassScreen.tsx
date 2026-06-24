import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {SecondaryButton} from '../components/buttons/PrimaryButton';
import {useApp} from '../context/AppContext';
import {useBrightnessToggle} from '../hooks/useBrightnessToggle';
import {useAppNavigation} from '../navigation/NavigationContext';
import {APP_FULL_TITLE, APP_SUBTITLE, PASS_CODE} from '../constants/brand';
import {colors, fonts, layout, radius} from '../constants/theme';

export function PassScreen() {
  const {openFullScreenPass} = useAppNavigation();
  const {isMaxBrightness, toggleBrightness} = useBrightnessToggle();

  return (
    <View style={styles.PassFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.PassScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.PassHeaderLintel}>
          <Text style={styles.PassBrandFiligree}>OPENING PASS</Text>
          <Text style={styles.PassTitleFiligree}>Opening Pass</Text>
          <Text style={styles.PassSubtitleFiligree}>{APP_SUBTITLE}</Text>
        </View>

        {/* Pass Card */}
        <View style={styles.PassCardChassis}>
          <View style={styles.PassCardGlowEdge} />
          <Text style={styles.PassCardLabelFiligree}>Opening Guest Access</Text>
          <Text style={styles.PassCardAppNameFiligree}>{APP_FULL_TITLE}</Text>
          <Text style={styles.PassCardCodeFiligree}>{PASS_CODE}</Text>
          <View style={styles.PassCardStatusLintel}>
            <Text style={styles.PassCardStatusFiligree}>
              Valid for Opening Visit
            </Text>
          </View>
          <Text style={styles.PassCardHintFiligree}>
            Tap below to show full screen
          </Text>
        </View>

        <PrimaryButton
          label="Show Full Screen Pass"
          onPress={openFullScreenPass}
          fullWidth
          icon="🪪"
        />

        <View style={styles.PassActionsLintel}>
          <SecondaryButton
            label={
              isMaxBrightness ? 'Brightness Active' : 'Increase Brightness'
            }
            onPress={toggleBrightness}
            icon="☀️"
            active={isMaxBrightness}
            compact
          />
        </View>

        {/* Activation Notes */}
        <View style={styles.PassNotesCard}>
          <Text style={styles.PassNotesTitleFiligree}>Activation Notes</Text>
          {[
            'Keep the screen brightness high for easy staff scanning.',
            'The pass can be activated during your venue visit.',
            'Ask staff to verify your opening access code.',
            'Some app tools become available after staff confirmation.',
            'Do not share your pass code with other guests.',
          ].map((note, i) => (
            <View key={i} style={styles.PassNoteRowLintel}>
              <Text style={styles.PassNoteDotSigil}>·</Text>
              <Text style={styles.PassNoteTextFiligree}>{note}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  PassFacetChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },

  PassScrollContent: {
    gap: 14,
    paddingBottom: 32,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 64,
  },

  PassHeaderLintel: {
    gap: 4,
    paddingBottom: 16,
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
  },

  PassBrandFiligree: {
    color: colors.neonPink,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    letterSpacing: 2.5,
  },

  PassTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 28,
    fontWeight: '700',
  },
  PassSubtitleFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  // Pass card
  PassCardChassis: {
    backgroundColor: colors.card,
    borderColor: colors.violet,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 10,
    overflow: 'hidden',
    padding: 24,
    position: 'relative',
  },
  PassCardGlowEdge: {
    backgroundColor: colors.neonPink,
    height: 3,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  PassCardLabelFiligree: {
    color: colors.textLabel,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  PassCardAppNameFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
  },
  PassCardCodeFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.monoBold,
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: 6,
    marginVertical: 8,
  },
  PassCardStatusLintel: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139, 61, 255, 0.2)',
    borderColor: colors.violet,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  PassCardStatusFiligree: {
    color: colors.violet,
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    fontWeight: '600',
  },
  PassCardHintFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    marginTop: 4,
  },
  PassActionsLintel: {
    flexDirection: 'row',
  },
  // Notes
  PassNotesCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  PassNotesTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  PassNoteRowLintel: {
    flexDirection: 'row',
    gap: 8,
  },
  PassNoteDotSigil: {
    color: colors.violet,
    fontSize: 16,
    lineHeight: 20,
  },
  PassNoteTextFiligree: {
    color: colors.textSecondary,
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 20,
  },
});
