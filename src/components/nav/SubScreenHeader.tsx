import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {colors, fonts, layout} from '../../constants/theme';

type SubScreenHeaderProps = {
  title: string;
  onBack: () => void;
  rightAction?: React.ReactNode;
};

export function SubScreenHeader({
  title,
  onBack,
  rightAction,
}: SubScreenHeaderProps) {
  return (
    <View style={styles.SubScreenHeaderFacetChassis}>
      <Pressable onPress={onBack} style={styles.SubScreenHeaderBackPortico}>
        <Text style={styles.SubScreenHeaderBackSigil}>←</Text>
      </Pressable>
      <Text style={styles.SubScreenHeaderTitleFiligree} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.SubScreenHeaderRightLintel}>
        {rightAction ?? null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  SubScreenHeaderFacetChassis: {
    alignItems: 'center',
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14,
    paddingTop: 56,
  },
  SubScreenHeaderBackPortico: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  SubScreenHeaderBackSigil: {
    color: colors.neonPink,
    fontSize: 20,
  },
  SubScreenHeaderTitleFiligree: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: fonts.sansSemiBold,
    fontSize: 16,
    fontWeight: '600',
  },
  SubScreenHeaderRightLintel: {
    alignItems: 'center',
    minWidth: 36,
  },
});
