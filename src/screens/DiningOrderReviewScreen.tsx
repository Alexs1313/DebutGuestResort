import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {getMenuItemById} from '../data/menu';
import {useDining} from '../context/DiningContext';
import {useAppNavigation} from '../navigation/NavigationContext';
import {colors, fonts, layout, radius} from '../constants/theme';

export function DiningOrderReviewScreen() {
  const {goBack, openDiningOrderSuccess} = useAppNavigation();
  const {cart, cartTotal, setQuantity, submitOrder} = useDining();

  const [deliveryTime, setDeliveryTime] = useState('');
  const [guestName, setGuestName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (cart.length === 0) e.cart = 'Please add at least one item.';
    if (!deliveryTime.trim()) e.deliveryTime = 'Required';
    if (!guestName.trim()) e.guestName = 'Required';
    if (!contact.trim()) e.contact = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlace = () => {
    if (!validate()) return;
    submitOrder({deliveryTime, guestName, contactNote: contact, notes});
    openDiningOrderSuccess();
  };

  if (cart.length === 0) {
    return (
      <View style={styles.DORFacetChassis}>
        <SubScreenHeader title="Review Dining Order" onBack={goBack} />
        <View style={styles.DOREmptyLintel}>
          <Text style={styles.DOREmptySigil}>🍽️</Text>
          <Text style={styles.DOREmptyTitleFiligree}>Cart is empty</Text>
          <Text style={styles.DOREmptyBodyFiligree}>
            Add items from the Dining tab first.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.DORFacetChassis}>
      <SubScreenHeader title="Review Dining Order" onBack={goBack} />
      <ScrollView
        contentContainerStyle={styles.DORScrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.DORSubtitleFiligree}>
          Check your selected items and add visit details.
        </Text>

        {/* Items */}
        <View style={styles.DORItemsCard}>
          {cart.map(line => {
            const item = getMenuItemById(line.itemId);
            if (!item) return null;
            return (
              <View key={line.itemId} style={styles.DORItemRowLintel}>
                <View style={styles.DORItemInfoLintel}>
                  <Text style={styles.DORItemTitleFiligree}>{item.title}</Text>
                  <Text style={styles.DORItemSubFiligree}>
                    ${item.price} each
                  </Text>
                </View>
                <View style={styles.DORQtyLintel}>
                  <Pressable
                    onPress={() => setQuantity(item.id, line.quantity - 1)}
                    style={styles.DORQtyBtn}>
                    <Text style={styles.DORQtyBtnFiligree}>−</Text>
                  </Pressable>
                  <Text style={styles.DORQtyFiligree}>{line.quantity}</Text>
                  <Pressable
                    onPress={() => setQuantity(item.id, line.quantity + 1)}
                    style={styles.DORQtyBtn}>
                    <Text style={styles.DORQtyBtnFiligree}>+</Text>
                  </Pressable>
                </View>
                <Text style={styles.DORItemPriceFiligree}>
                  ${item.price * line.quantity}
                </Text>
              </View>
            );
          })}
          <View style={styles.DORTotalRowLintel}>
            <Text style={styles.DORTotalLabelFiligree}>Total</Text>
            <Text style={styles.DORTotalValueFiligree}>${cartTotal}</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.DORFormCard}>
          {[
            {
              label: 'PICKUP OR TABLE DELIVERY TIME *',
              value: deliveryTime,
              set: setDeliveryTime,
              placeholder: '8:00 PM',
              key: 'deliveryTime',
            },
            {
              label: 'GUEST NAME *',
              value: guestName,
              set: setGuestName,
              placeholder: 'Your name',
              key: 'guestName',
            },
            {
              label: 'PHONE OR CONTACT NOTE *',
              value: contact,
              set: setContact,
              placeholder: '+1 555 000 0000',
              key: 'contact',
            },
          ].map(field => (
            <View key={field.key}>
              <Text style={styles.DORFormLabel}>{field.label}</Text>
              <TextInput
                style={[
                  styles.DORInput,
                  errors[field.key] ? styles.DORInputError : null,
                ]}
                value={field.value}
                onChangeText={field.set}
                placeholder={field.placeholder}
                placeholderTextColor={colors.textLabel}
              />
              {errors[field.key] && (
                <Text style={styles.DORErrorFiligree}>{errors[field.key]}</Text>
              )}
            </View>
          ))}
          <Text style={styles.DORFormLabel}>NOTES</Text>
          <TextInput
            style={[styles.DORInput, styles.DORTextArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any special requests…"
            placeholderTextColor={colors.textLabel}
            multiline
          />
        </View>

        {errors.cart && (
          <Text style={styles.DORErrorFiligree}>{errors.cart}</Text>
        )}

        <PrimaryButton
          label="Place Dining Order"
          onPress={handlePlace}
          fullWidth
          icon="🍽️"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  DORFacetChassis: {backgroundColor: colors.surface, flex: 1},
  DORScrollContent: {
    gap: 12,
    paddingBottom: 32,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 16,
  },
  DORSubtitleFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },
  DOREmptyLintel: {
    alignItems: 'center',
    flex: 1,
    gap: 12,
    justifyContent: 'center',
  },
  DOREmptySigil: {fontSize: 48},

  DOREmptyTitleFiligree: {
    color: colors.textSecondary,
    fontFamily: fonts.sansSemiBold,
    fontSize: 18,
    fontWeight: '600',
  },

  DOREmptyBodyFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
  },
  DORItemsCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },

  DORItemRowLintel: {alignItems: 'center', flexDirection: 'row', gap: 10},
  DORItemInfoLintel: {flex: 1},
  DORItemTitleFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansMedium,
    fontSize: 13,
  },
  DORItemSubFiligree: {
    color: colors.textMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
  },
  DORQtyLintel: {alignItems: 'center', flexDirection: 'row', gap: 8},
  DORQtyBtn: {
    alignItems: 'center',
    backgroundColor: colors.cardHighlight,
    borderRadius: 6,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },

  DORQtyBtnFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  DORQtyFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
    minWidth: 20,
    textAlign: 'center',
  },
  DORItemPriceFiligree: {
    color: colors.amber,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
  },
  DORTotalRowLintel: {
    borderTopColor: colors.divider,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  DORTotalLabelFiligree: {
    color: colors.textPrimary,
    fontFamily: fonts.sansBold,
    fontSize: 16,
    fontWeight: '700',
  },
  DORTotalValueFiligree: {
    color: colors.amber,
    fontFamily: fonts.sansBold,
    fontSize: 18,
    fontWeight: '700',
  },
  DORFormCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  DORFormLabel: {
    color: colors.textLabel,
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginTop: 4,
  },
  DORInput: {
    backgroundColor: colors.inputBg,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.textPrimary,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  DORInputError: {borderColor: colors.coral},
  DORTextArea: {height: 80, textAlignVertical: 'top'},
  DORErrorFiligree: {
    color: colors.coral,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
  },
});
