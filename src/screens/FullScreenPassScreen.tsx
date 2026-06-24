import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {APP_FULL_TITLE, PASS_CODE} from '../constants/brand';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts} from '../constants/theme';

export function FullScreenPassScreen() {
  const {closeOverlay} = useAppNavigation();

  return (
    <View style={styles.FSPassFacetChassis}>
      <View style={styles.FSPassContent}>
        <Image source={require('../assets/debut-guest-resort-app_icon.png')} />
        <Text style={styles.FSPassAppNameFiligree}>{APP_FULL_TITLE}</Text>

        <View style={styles.FSPassCodeCard}>
          <Text style={styles.FSPassCodeLabelFiligree}>
            OPENING ACCESS CODE
          </Text>
          <Text style={styles.FSPassCodeFiligree}>{PASS_CODE}</Text>
          <View style={styles.FSPassGlowLine} />
        </View>

        <Text style={styles.FSPassHintFiligree}>
          Present this code to venue staff when requested.
        </Text>
      </View>

      <Pressable
        onPress={closeOverlay}
        style={({pressed}) => [
          styles.FSPassClosePortico,
          pressed && {opacity: 0.7},
        ]}>
        <Text style={styles.FSPassCloseFiligree}>Close</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  FSPassFacetChassis: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  FSPassContent: {
    alignItems: 'center',
    flex: 1,
    gap: 20,
    justifyContent: 'center',
  },
  FSPassBrandFiligree: {
    color: colors.neonPink,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    letterSpacing: 4,
  },
  FSPassAppNameFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    textAlign: 'center',
  },

  FSPassCodeCard: {
    alignItems: 'center',
    backgroundColor: colors.cardHighlight,
    borderColor: colors.violet,
    borderRadius: 24,
    borderWidth: 1,
    gap: 12,
    paddingHorizontal: 40,
    paddingVertical: 32,
    width: '100%',
  },
  FSPassCodeLabelFiligree: {
    color: colors.textLabel,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    letterSpacing: 2,
  },
  FSPassCodeFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.monoBold,
    fontSize: 52,
    fontWeight: '700',
    letterSpacing: 6,
  },

  FSPassGlowLine: {
    backgroundColor: colors.neonPink,
    borderRadius: 2,
    height: 2,
    width: 80,
  },
  FSPassHintFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  FSPassClosePortico: {
    alignItems: 'center',
    backgroundColor: colors.cardElevated,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 48,
    paddingVertical: 14,
  },

  FSPassCloseFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
  },
});
