import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from '../../constants/theme';

type PaginationDotsProps = {
  count: number;
  activeIndex: number;
};

export function PaginationDots({count, activeIndex}: PaginationDotsProps) {
  return (
    <View style={styles.PaginationDotsFacetChassis}>
      {Array.from({length: count}).map((_, index) => (
        <View
          key={index}
          style={[
            styles.PaginationDotsDotSigil,
            index === activeIndex && styles.PaginationDotsActiveDotSigil,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  PaginationDotsFacetChassis: {
    flexDirection: 'row',
    gap: 6,
  },
  PaginationDotsDotSigil: {
    backgroundColor: colors.textLabel,
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  PaginationDotsActiveDotSigil: {
    backgroundColor: colors.neonPink,
    width: 20,
  },
});
