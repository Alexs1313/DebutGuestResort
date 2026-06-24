import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import {createQrMatrix} from '../../utils/qrMatrix';
import {colors} from '../../constants/theme';

type PassQrCodeProps = {
  value: string;
  size: number;
  color?: string;
  backgroundColor?: string;
};

export function PassQrCode({
  value,
  size,
  color = colors.cream,
  backgroundColor = 'transparent',
}: PassQrCodeProps) {
  const matrix = useMemo(() => createQrMatrix(value), [value]);
  const cellSize = size / matrix.length;

  return (
    <View style={[styles.PassQrCodeFacetChassis, {width: size, height: size, backgroundColor}]}>
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.PassQrCodeRowLintel}>
          {row.map((isDark, colIndex) => (
            <View
              key={colIndex}
              style={[
                styles.PassQrCodeCellSigil,
                {
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: isDark ? color : 'transparent',
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  PassQrCodeFacetChassis: {
    overflow: 'hidden',
  },
  PassQrCodeRowLintel: {
    flexDirection: 'row',
  },
  PassQrCodeCellSigil: {},
});
