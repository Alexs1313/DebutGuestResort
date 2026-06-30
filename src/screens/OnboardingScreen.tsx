import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {PaginationDots} from '../components/nav/PaginationDots';
import {onboardingBackgrounds} from '../data/assets';
import {colors, fonts, layout} from '../constants/theme';

const STEPS = [
  {
    bg: onboardingBackgrounds.step1,
    title: 'Your Opening Pass',
    subtitle:
      'Keep your digital pass ready and unlock helpful guest tools for the opening event.',
  },
  {
    bg: onboardingBackgrounds.step3,
    title: 'Opening Event Plan',
    subtitle:
      'Explore the opening schedule, view event details, and reserve a place for selected moments.',
  },
  {
    bg: onboardingBackgrounds.step2,
    title: 'Dining & Guest Services',
    subtitle:
      'Prepare dining orders, request venue services, save events, and review submitted requests in one place.',
  },
];

type OnboardingScreenProps = {
  onComplete: () => void;
  onSkip: () => void;
};

export function OnboardingScreen({onComplete, onSkip}: OnboardingScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = STEPS[activeIndex];
  const isLast = activeIndex === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setActiveIndex(i => i + 1);
    }
  };

  return (
    <View style={styles.OnboardingFacetChassis}>
      <ImageBackground
        source={step.bg}
        style={styles.OnboardingBackground}
        resizeMode="cover">
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.OnboardingFooterLintel}>
            <Text style={styles.OnboardingTitleFiligree}>{step.title}</Text>
            <Text style={styles.OnboardingSubtitleFiligree}>
              {step.subtitle}
            </Text>

            <PaginationDots count={STEPS.length} activeIndex={activeIndex} />

            <View style={styles.OnboardingActionsLintel}>
              {!isLast && (
                <Pressable
                  onPress={onSkip}
                  style={styles.OnboardingSkipPortico}>
                  <Text style={styles.OnboardingSkipFiligree}>Skip</Text>
                </Pressable>
              )}
              <PrimaryButton
                label={isLast ? 'Get Started' : 'Next'}
                onPress={handleNext}
                style={styles.OnboardingNextBtn}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  OnboardingFacetChassis: {
    backgroundColor: colors.background,
    flex: 1,
  },
  OnboardingBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  OnboardingDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 5, 26, 0.55)',
  },

  OnboardingFooterLintel: {
    gap: 16,
    paddingBottom: 52,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 40,
  },

  OnboardingTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  OnboardingSubtitleFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 22,
  },
  OnboardingActionsLintel: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  OnboardingSkipPortico: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  OnboardingSkipFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansMedium,
    fontSize: 15,
  },
  OnboardingNextBtn: {
    flex: 1,
  },
});
