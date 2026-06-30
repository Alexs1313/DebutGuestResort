import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {QA_ITEMS, QA_CATEGORIES, type QACategory} from '../data/qaHelp';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

export function QAHelpScreen() {
  const {goBack} = useAppNavigation();
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<QACategory | 'All'>(
    'All',
  );

  const visibleItems =
    activeCategory === 'All'
      ? QA_ITEMS
      : QA_ITEMS.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) =>
    setOpenId(prev => (prev === id ? null : id));

  return (
    <View style={styles.QAFacetChassis}>

      <SubScreenHeader title="Q&A Help" onBack={goBack} />

      <ScrollView
        contentContainerStyle={styles.QAScrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.QASubtitleFiligree}>
          Quick answers for common opening guest questions.
        </Text>

        {/* Category filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.QAFilterStrip}>
          {(['All', ...QA_CATEGORIES] as Array<'All' | QACategory>).map(cat => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.QAFilterChip,
                activeCategory === cat && styles.QAFilterChipActive,
              ]}>
              <Text
                style={[
                  styles.QAFilterChipFiligree,
                  activeCategory === cat && styles.QAFilterChipActiveFiligree,
                ]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Accordion */}
        <View style={styles.QAListLintel}>
          {visibleItems.map(item => {
            const isOpen = openId === item.id;
            return (
              <View key={item.id} style={styles.QAAccordionCard}>
                <Pressable
                  onPress={() => toggleItem(item.id)}
                  style={styles.QAQuestionRowLintel}>
                  <Text style={styles.QAQuestionFiligree}>{item.question}</Text>
                  <Text style={styles.QAToggleSigil}>{isOpen ? '−' : '+'}</Text>
                </Pressable>
                {isOpen && (
                  <View style={styles.QAAnswerLintel}>
                    <View style={styles.QAAnswerDivider} />
                    <Text style={styles.QAAnswerFiligree}>{item.answer}</Text>
                    <View style={[styles.QACatBadge]}>
                      <Text style={styles.QACatBadgeFiligree}>
                        {item.category}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  QAFacetChassis: {backgroundColor: colors.surface, flex: 1},
  QAScrollContent: {
    gap: 14,
    paddingBottom: 32,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 16,
  },
  QASubtitleFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },
  QAFilterStrip: {gap: 8, paddingBottom: 4},
  QAFilterChip: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  QAFilterChipActive: {
    backgroundColor: 'rgba(255, 44, 203, 0.15)',
    borderColor: colors.neonPink,
  },
  QAFilterChipFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
  },
  QAFilterChipActiveFiligree: {color: colors.neonPink},
  QAListLintel: {gap: 8},
  QAAccordionCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    overflow: 'hidden',
  },
  QAQuestionRowLintel: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },

  QAQuestionFiligree: {
    color: colors.textPrimary,
    flex: 1,
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  QAToggleSigil: {
    color: colors.neonPink,
    fontFamily: fonts.sansBold,
    fontSize: 20,
    fontWeight: '700',
  },
  QAAnswerLintel: {gap: 10, paddingBottom: 16, paddingHorizontal: 16},
  QAAnswerDivider: {backgroundColor: colors.divider, height: 1},
  QAAnswerFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  QACatBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(139, 61, 255, 0.12)',
    borderColor: colors.violet,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  QACatBadgeFiligree: {
    color: colors.violet,
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
  },
});
