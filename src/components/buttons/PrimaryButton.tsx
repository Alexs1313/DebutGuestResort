import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import {colors, fonts, layout, radius} from '../../constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  icon?: string;
  compact?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  style,
  fullWidth = false,
  icon,
  compact = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[fullWidth && styles.FullWidthWrapper, style]}>
      {({pressed}) => (
        <View
          style={[
            styles.PrimaryBtnPortico,
            compact && styles.PrimaryBtnCompact,
            pressed && styles.PressedDim,
          ]}>
          {icon ? <Text style={styles.IconSigil}>{icon}</Text> : null}
          <Text style={styles.PrimaryLabelFiligree}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  icon?: string;
  compact?: boolean;
  active?: boolean;
};

export function SecondaryButton({
  label,
  onPress,
  style,
  fullWidth = false,
  icon,
  compact = false,
  active = false,
}: SecondaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.SecondaryBtnPortico,
        compact && styles.SecondaryBtnCompact,
        active && styles.SecondaryBtnActive,
        fullWidth && styles.FullWidthWrapper,
        pressed && styles.PressedDim,
        style,
      ]}>
      {icon ? <Text style={styles.IconSigil}>{icon}</Text> : null}
      <Text
        style={[
          styles.SecondaryLabelFiligree,
          active && styles.SecondaryLabelActive,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function TertiaryButton({
  label,
  onPress,
  style,
  fullWidth = false,
  icon,
  compact = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.TertiaryBtnPortico,
        compact && styles.TertiaryBtnCompact,
        fullWidth && styles.FullWidthWrapper,
        pressed && styles.PressedDim,
        style,
      ]}>
      {icon ? <Text style={styles.IconSigil}>{icon}</Text> : null}
      <Text style={styles.TertiaryLabelFiligree}>{label}</Text>
    </Pressable>
  );
}

// Legacy alias
export const OutlineButton = SecondaryButton;

const styles = StyleSheet.create({
  FullWidthWrapper: {
    width: '100%',
  },
  PressedDim: {
    opacity: 0.82,
  },
  IconSigil: {
    fontSize: 16,
  },
  // Primary (neon pink)
  PrimaryBtnPortico: {
    alignItems: 'center',
    backgroundColor: colors.buttonPrimaryBg,
    borderRadius: radius.button,
    flexDirection: 'row',
    gap: 8,
    height: layout.buttonHeightDefault,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  PrimaryBtnCompact: {
    height: layout.buttonHeightCompact,
  },
  PrimaryLabelFiligree: {
    color: colors.buttonPrimaryText,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  // Secondary (dark purple)
  SecondaryBtnPortico: {
    alignItems: 'center',
    backgroundColor: colors.buttonSecondaryBg,
    borderColor: colors.border,
    borderRadius: radius.button,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    height: layout.buttonHeightCompact,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  SecondaryBtnCompact: {
    height: layout.buttonHeightCompact,
  },
  SecondaryBtnActive: {
    backgroundColor: 'rgba(255, 44, 203, 0.15)',
    borderColor: colors.neonPink,
  },
  SecondaryLabelFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
  },
  SecondaryLabelActive: {
    color: colors.neonPink,
  },
  // Tertiary (elevated card)
  TertiaryBtnPortico: {
    alignItems: 'center',
    backgroundColor: colors.buttonTertiaryBg,
    borderColor: colors.border,
    borderRadius: radius.button,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    height: layout.buttonHeightCompact,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  TertiaryBtnCompact: {
    height: 40,
  },
  TertiaryLabelFiligree: {
    color: colors.buttonTertiaryText,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
  },
});
