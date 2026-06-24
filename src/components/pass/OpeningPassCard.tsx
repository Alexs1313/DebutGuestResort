import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {PASS_DETAILS} from '../../data/passInfo';
import {PassQrCode} from './PassQrCode';
import {useAdaptive} from '../../hooks/useAdaptive';
import {colors, fonts, radius} from '../../constants/theme';

type OpeningPassCardProps = {
  passId: string;
  onShowFullPass: () => void;
};

export function OpeningPassCard({passId, onShowFullPass}: OpeningPassCardProps) {
  const adaptive = useAdaptive();

  return (
    <View style={styles.OpeningPassCardFacetChassis}>
      <View style={styles.OpeningPassCardHeaderLintel}>
        <View style={styles.OpeningPassCardHeaderTextLintel}>
          <Text style={styles.OpeningPassCardGuestTypeFiligree}>
            {PASS_DETAILS.guestType.toUpperCase()}
          </Text>
          <Text style={styles.OpeningPassCardPassTitleFiligree}>
            {PASS_DETAILS.passTitle}
          </Text>
        </View>
        <View style={styles.OpeningPassCardStatusLintel}>
          <Text style={styles.OpeningPassCardStatusFiligree}>
            {PASS_DETAILS.status}
          </Text>
        </View>
      </View>

      <View style={styles.OpeningPassCardDivider} />

      <View style={styles.OpeningPassCardQrLintel}>
        <PassQrCode
          value={passId}
          size={adaptive.qrSize}
          color={colors.cream}
          backgroundColor={colors.surfaceDeep}
        />
      </View>

      <View style={styles.OpeningPassCardCodeLintel}>
        <Text style={styles.OpeningPassCardCodeFiligree}>{passId}</Text>
      </View>

      <View style={styles.OpeningPassCardMetaLintel}>
        <View style={styles.OpeningPassCardMetaItemLintel}>
          <Text style={styles.OpeningPassCardMetaLabelFiligree}>Access</Text>
          <Text style={styles.OpeningPassCardMetaValueFiligree}>{PASS_DETAILS.access}</Text>
        </View>
        <View style={styles.OpeningPassCardMetaItemLintel}>
          <Text style={styles.OpeningPassCardMetaLabelFiligree}>Validity</Text>
          <Text style={styles.OpeningPassCardMetaValueFiligree}>{PASS_DETAILS.validity}</Text>
        </View>
        <View style={styles.OpeningPassCardMetaItemLintel}>
          <Text style={styles.OpeningPassCardMetaLabelFiligree}>Date</Text>
          <Text style={styles.OpeningPassCardMetaValueFiligree}>{PASS_DETAILS.dateLabel}</Text>
        </View>
      </View>

      <Pressable onPress={onShowFullPass} style={({pressed}) => [
        styles.OpeningPassCardShowPortico,
        pressed && styles.OpeningPassCardShowPressedPortico,
      ]}>
        <Text style={styles.OpeningPassCardShowFiligree}>Show Full Pass</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  OpeningPassCardFacetChassis: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 16,
    overflow: 'hidden',
    padding: 20,
  },
  OpeningPassCardHeaderLintel: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OpeningPassCardHeaderTextLintel: {
    gap: 2,
  },
  OpeningPassCardGuestTypeFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    letterSpacing: 1.5,
  },
  OpeningPassCardPassTitleFiligree: {
    color: colors.cream,
    fontFamily: fonts.serifBold,
    fontSize: 18,
    fontWeight: '700',
  },
  OpeningPassCardStatusLintel: {
    backgroundColor: colors.successMuted,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  OpeningPassCardStatusFiligree: {
    color: colors.success,
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    fontWeight: '600',
  },
  OpeningPassCardDivider: {
    backgroundColor: colors.border,
    height: 1,
  },
  OpeningPassCardQrLintel: {
    alignItems: 'center',
    backgroundColor: colors.surfaceDeep,
    borderRadius: 12,
    padding: 16,
  },
  OpeningPassCardCodeLintel: {
    alignItems: 'center',
  },
  OpeningPassCardCodeFiligree: {
    color: colors.gold,
    fontFamily: fonts.monoBold,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 3,
  },
  OpeningPassCardMetaLintel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OpeningPassCardMetaItemLintel: {
    gap: 2,
  },
  OpeningPassCardMetaLabelFiligree: {
    color: colors.label,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  OpeningPassCardMetaValueFiligree: {
    color: colors.body,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
  },
  OpeningPassCardShowPortico: {
    alignItems: 'center',
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.goldBorder,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
  },
  OpeningPassCardShowPressedPortico: {
    opacity: 0.7,
  },
  OpeningPassCardShowFiligree: {
    color: colors.gold,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
  },
});
