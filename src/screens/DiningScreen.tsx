import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  OPENING_MENU,
  MENU_CATEGORY_STYLES,
  type MenuCategory,
} from '../data/menu';
import {useDining} from '../context/DiningContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';
import {PrimaryButton} from '../components/buttons/PrimaryButton';

const CATEGORY_FILTERS: Array<'All' | MenuCategory> = [
  'All',
  'Opening Specials',
  'Small Plates',
  'Main Dishes',
  'Sweet',
  'Drinks',
  'Extras',
];

export function DiningScreen() {
  const {openDiningOrderReview} = useAppNavigation();
  const {cart, cartTotal, cartItemCount, addToCart, setQuantity} = useDining();
  const [activeCategory, setActiveCategory] = useState<'All' | MenuCategory>(
    'All',
  );

  const visibleItems =
    activeCategory === 'All'
      ? OPENING_MENU
      : OPENING_MENU.filter(item => item.category === activeCategory);

  const getQty = (itemId: string) =>
    cart.find(c => c.itemId === itemId)?.quantity ?? 0;

  return (
    <View style={styles.DiningFacetChassis}>
      <ScrollView
        contentContainerStyle={styles.DiningScrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.DiningHeaderLintel}>
          <Text style={styles.DiningBrandFiligree}>OPENING DINING</Text>
          <Text style={styles.DiningTitleFiligree}>Dining</Text>
          <Text style={styles.DiningSubtitleFiligree}>
            Choose dining items and prepare your Win Spirit opening order.
          </Text>
        </View>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.DiningCategoryStrip}>
          {CATEGORY_FILTERS.map(cat => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.DiningCatChip,
                activeCategory === cat && styles.DiningCatChipActive,
              ]}>
              <Text
                style={[
                  styles.DiningCatChipFiligree,
                  activeCategory === cat && styles.DiningCatChipActiveFiligree,
                ]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Items */}
        <View style={styles.DiningItemListLintel}>
          {visibleItems.map(item => {
            const qty = getQty(item.id);
            const catStyle = MENU_CATEGORY_STYLES[item.category];
            return (
              <View key={item.id} style={styles.DiningItemCard}>
                <Image
                  source={item.image}
                  style={styles.DiningItemImageSigil}
                  resizeMode="cover"
                />
                <View style={styles.DiningItemContentLintel}>
                  <View style={styles.DiningItemHeaderLintel}>
                    <View
                      style={[
                        styles.DiningCatBadge,
                        {backgroundColor: catStyle.background},
                      ]}>
                      <Text
                        style={[
                          styles.DiningCatBadgeFiligree,
                          {color: catStyle.color},
                        ]}>
                        {item.category}
                      </Text>
                    </View>
                    {item.featured && (
                      <Text style={styles.DiningFeaturedSigil}>⭐</Text>
                    )}
                  </View>
                  <Text style={styles.DiningItemTitleFiligree}>
                    {item.title}
                  </Text>
                  <Text style={styles.DiningItemDescFiligree} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.DiningItemFooterLintel}>
                    <Text style={styles.DiningItemPriceFiligree}>
                      ${item.price}
                    </Text>
                    {qty === 0 ? (
                      <Pressable
                        onPress={() => addToCart(item.id)}
                        style={styles.DiningAddPortico}>
                        <Text style={styles.DiningAddFiligree}>+ Add</Text>
                      </Pressable>
                    ) : (
                      <View style={styles.DiningQtyLintel}>
                        <Pressable
                          onPress={() => setQuantity(item.id, qty - 1)}
                          style={styles.DiningQtyBtn}>
                          <Text style={styles.DiningQtyBtnFiligree}>−</Text>
                        </Pressable>
                        <Text style={styles.DiningQtyFiligree}>{qty}</Text>
                        <Pressable
                          onPress={() => addToCart(item.id)}
                          style={styles.DiningQtyBtn}>
                          <Text style={styles.DiningQtyBtnFiligree}>+</Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom order summary */}
      <View style={styles.DiningOrderSummaryLintel}>
        {cartItemCount === 0 ? (
          <Text style={styles.DiningOrderEmptyFiligree}>
            No dining items selected yet.
          </Text>
        ) : (
          <View style={styles.DiningOrderSummaryRow}>
            <View>
              <Text style={styles.DiningOrderCountFiligree}>
                {cartItemCount} item{cartItemCount > 1 ? 's' : ''} selected
              </Text>
              <Text style={styles.DiningOrderTotalFiligree}>
                Total: ${cartTotal}
              </Text>
            </View>
            <PrimaryButton
              label="Review Order"
              onPress={openDiningOrderReview}
              compact
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  DiningFacetChassis: {backgroundColor: colors.surface, flex: 1},
  DiningScrollContent: {gap: 0, paddingBottom: 100, paddingTop: 64},
  DiningHeaderLintel: {
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
    gap: 4,
    paddingBottom: 16,
    paddingHorizontal: layout.screenPadding,
  },

  DiningBrandFiligree: {
    color: colors.neonPink,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    letterSpacing: 2.5,
  },

  DiningTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 28,
    fontWeight: '700',
  },
  DiningSubtitleFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  DiningCategoryStrip: {
    gap: 8,
    paddingHorizontal: layout.screenPadding,
    paddingVertical: 12,
  },
  DiningCatChip: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  DiningCatChipActive: {
    backgroundColor: 'rgba(255, 44, 203, 0.15)',
    borderColor: colors.neonPink,
  },
  DiningCatChipFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansMedium,
    fontSize: 12,
  },

  DiningCatChipActiveFiligree: {color: colors.neonPink},
  DiningItemListLintel: {gap: 10, paddingHorizontal: layout.screenPadding},
  DiningItemCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    overflow: 'hidden',
  },
  DiningItemImageSigil: {height: 140, width: '100%'},
  DiningItemContentLintel: {gap: 8, padding: 14},
  DiningItemHeaderLintel: {alignItems: 'center', flexDirection: 'row', gap: 8},
  DiningCatBadge: {borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3},
  DiningCatBadgeFiligree: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
  },

  DiningFeaturedSigil: {fontSize: 13},
  DiningItemTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    fontWeight: '600',
  },
  DiningItemDescFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 18,
  },

  DiningItemFooterLintel: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  DiningItemPriceFiligree: {
    color: colors.amber,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  DiningAddPortico: {
    backgroundColor: colors.neonPink,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  DiningAddFiligree: {
    color: colors.white,
    fontFamily: fonts.sansBold,
    fontSize: 13,
    fontWeight: '700',
  },

  DiningQtyLintel: {alignItems: 'center', flexDirection: 'row', gap: 12},
  DiningQtyBtn: {
    alignItems: 'center',
    backgroundColor: colors.cardHighlight,
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  DiningQtyBtnFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 18,
    fontWeight: '700',
  },
  DiningQtyFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
    minWidth: 24,
    textAlign: 'center',
  },

  // Bottom summary
  DiningOrderSummaryLintel: {
    backgroundColor: colors.surface,
    borderTopColor: colors.divider,
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    paddingHorizontal: layout.screenPadding,
    paddingVertical: 12,
    position: 'absolute',
    right: 0,
  },
  DiningOrderEmptyFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    textAlign: 'center',
  },
  DiningOrderSummaryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DiningOrderCountFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
  },
  DiningOrderTotalFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
});
