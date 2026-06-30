import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {APP_FULL_TITLE} from '../constants/brand';
import {icons} from '../data/assets';
import {colors, fonts} from '../constants/theme';

type LoaderScreenProps = {
  onComplete: () => void;
  onboardingChecked: boolean;
  onboardingCompleted: boolean;
};

export function LoaderScreen({
  onComplete,
  onboardingChecked,
  onboardingCompleted,
}: LoaderScreenProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const listenerId = progress.addListener(({value}) =>
      setPercent(Math.round(value * 100)),
    );

    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    });

    animation.start(({finished}) => {
      if (finished && onboardingChecked) {
        onComplete();
      }
    });

    return () => {
      progress.removeListener(listenerId);
      animation.stop();
    };
  }, [onComplete, onboardingChecked, progress]);

  useEffect(() => {
    if (onboardingChecked && percent >= 100) {
      onComplete();
    }
  }, [onboardingChecked, percent, onComplete]);

  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.LoaderFacetChassis}>
      <ImageBackground
        source={icons.loaderBg}
        style={styles.LoaderBackground}
        resizeMode="cover">
        <View style={styles.LoaderOverlay} />
        <View style={styles.LoaderContent}>
          <Image
            source={icons.loaderLogo}
            style={styles.LoaderLogoSigil}
            resizeMode="contain"
          />

          <Text style={styles.LoaderTitleFiligree}>{APP_FULL_TITLE}</Text>

          <View style={styles.LoaderProgressTrack}>
            <Animated.View
              style={[styles.LoaderProgressFill, {width: fillWidth}]}
            />
          </View>
          <Text style={styles.LoaderPercentFiligree}>{percent}%</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  LoaderFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  LoaderBackground: {
    flex: 1,
  },
  LoaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.loaderOverlay,
  },
  LoaderContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  LoaderLogoSigil: {
    marginBottom: 24,
    width: 220,
    height: 220,
    borderRadius: 50,
  },
  LoaderBrandFiligree: {
    color: colors.neonPink,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    letterSpacing: 3,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  LoaderTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 6,
    textAlign: 'center',
  },
  LoaderStatusFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    marginBottom: 48,
    textAlign: 'center',
  },
  LoaderProgressTrack: {
    backgroundColor: colors.progressTrack,
    borderRadius: 2,
    height: 2,
    overflow: 'hidden',
    width: 200,
  },
  LoaderProgressFill: {
    backgroundColor: colors.neonPink,
    height: 2,
  },
  LoaderPercentFiligree: {
    color: colors.textLabel,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    marginTop: 12,
  },
});
