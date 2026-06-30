import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {SubScreenHeader} from '../components/nav/SubScreenHeader';
import {PrimaryButton} from '../components/buttons/PrimaryButton';
import {useOpeningBookings} from '../context/OpeningBookingsContext';
import {useServiceRequests} from '../context/ServiceRequestsContext';
import {useDining} from '../context/DiningContext';
import {getMenuItemById} from '../data/menu';
import {useAppNavigation} from '../navigation/NavigationContext';
import {type SubmittedFilter} from '../navigation/types';
import {colors, fonts, layout, radius} from '../constants/theme';

const FILTER_CHIPS: SubmittedFilter[] = ['All', 'Services', 'EventBookings', 'DiningOrders', 'InReview', 'Sent'];
const FILTER_LABELS: Record<SubmittedFilter, string> = {All: 'All', Services: 'Services', EventBookings: 'Event Bookings', DiningOrders: 'Dining Orders', InReview: 'In Review', Sent: 'Sent'};

type Props = {initialFilter?: SubmittedFilter};

export function SubmittedRequestsScreen({initialFilter}: Props) {
  const {goBack, selectTab, openSubmittedRequests} = useAppNavigation();
  const {bookings} = useOpeningBookings();
  const {requests} = useServiceRequests();
  const {orders} = useDining();
  const [filter, setFilter] = useState<SubmittedFilter>(initialFilter ?? 'All');

  const showServices = filter === 'All' || filter === 'Services' || filter === 'InReview';
  const showBookings = filter === 'All' || filter === 'EventBookings' || filter === 'InReview';
  const showOrders = filter === 'All' || filter === 'DiningOrders' || filter === 'Sent';

  const hasAnything = bookings.length > 0 || requests.length > 0 || orders.length > 0;

  return (
    <View style={styles.SubFacetChassis}>

      <SubScreenHeader title="Submitted Requests" onBack={goBack} />

      <ScrollView contentContainerStyle={styles.SubScrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.SubSubtitleFiligree}>Review your service requests, event bookings, and dining orders sent for venue review.</Text>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.SubFilterStrip}>
          {FILTER_CHIPS.map(chip => (
            <Pressable key={chip} onPress={() => setFilter(chip)} style={[styles.SubFilterChip, filter === chip && styles.SubFilterChipActive]}>
              <Text style={[styles.SubFilterChipFiligree, filter === chip && styles.SubFilterChipActiveFiligree]}>
                {FILTER_LABELS[chip]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {!hasAnything ? (
          <View style={styles.SubGlobalEmptyLintel}>
            <Text style={styles.SubEmptySigil}>📋</Text>
            <Text style={styles.SubEmptyTitleFiligree}>No submitted requests yet</Text>
            <Text style={styles.SubEmptyBodyFiligree}>Your sent service requests, event bookings, and dining orders will appear here.</Text>
            <PrimaryButton label="Browse Services" onPress={() => selectTab('ServicesTab')} fullWidth />
            <PrimaryButton label="Open Opening Plan" onPress={() => selectTab('OpeningTab')} fullWidth />
            <PrimaryButton label="Open Dining Menu" onPress={() => selectTab('DiningTab')} fullWidth />
          </View>
        ) : (
          <>
            {/* Service Requests */}
            {showServices && (
              <View style={styles.SubGroupLintel}>
                <Text style={styles.SubGroupTitleFiligree}>Service Requests</Text>
                {requests.length === 0 ? (
                  <View style={styles.SubEmptyCard}>
                    <Text style={styles.SubEmptyCardTitleFiligree}>No service requests yet</Text>
                    <Text style={styles.SubEmptyCardBodyFiligree}>Choose a guest service and send your first request for venue review.</Text>
                    <PrimaryButton label="Browse Services" onPress={() => selectTab('ServicesTab')} compact />
                  </View>
                ) : (
                  requests.map(req => (
                    <View key={req.id} style={styles.SubRequestCard}>
                      <View style={styles.SubRequestHeaderLintel}>
                        <Text style={styles.SubRequestIconSigil}>{req.serviceIcon}</Text>
                        <View style={styles.SubRequestHeaderTextLintel}>
                          <Text style={styles.SubRequestTitleFiligree}>{req.serviceName}</Text>
                          <View style={styles.SubSmallLabelLintel}>
                            <Text style={styles.SubSmallLabelFiligree}>Service Request</Text>
                          </View>
                        </View>
                        <View style={styles.SubStatusLintel}>
                          <Text style={styles.SubStatusFiligree}>{req.status}</Text>
                        </View>
                      </View>
                      <Text style={styles.SubRequestMetaFiligree}>📅 {req.preferredDate} ⏰ {req.preferredTime}</Text>
                      <Text style={styles.SubRequestMetaFiligree}>👤 {req.guestName}</Text>
                      <Text style={styles.SubRequestCreatedFiligree}>{req.createdAt}</Text>
                    </View>
                  ))
                )}
              </View>
            )}

            {/* Event Bookings */}
            {showBookings && (
              <View style={styles.SubGroupLintel}>
                <Text style={styles.SubGroupTitleFiligree}>Event Bookings</Text>
                {bookings.length === 0 ? (
                  <View style={styles.SubEmptyCard}>
                    <Text style={styles.SubEmptyCardTitleFiligree}>No event bookings yet</Text>
                    <Text style={styles.SubEmptyCardBodyFiligree}>Choose an opening event and send your first place request.</Text>
                    <PrimaryButton label="Open Opening Plan" onPress={() => selectTab('OpeningTab')} compact />
                  </View>
                ) : (
                  bookings.map(booking => (
                    <View key={booking.id} style={styles.SubRequestCard}>
                      <View style={styles.SubRequestHeaderLintel}>
                        <View style={styles.SubRequestHeaderTextLintel}>
                          <Text style={styles.SubRequestTitleFiligree}>{booking.eventName}</Text>
                          <View style={styles.SubSmallLabelLintel}>
                            <Text style={styles.SubSmallLabelFiligree}>Event Booking</Text>
                          </View>
                        </View>
                        <View style={[styles.SubStatusLintel, styles.SubStatusInReview]}>
                          <Text style={[styles.SubStatusFiligree, styles.SubStatusInReviewFiligree]}>{booking.status}</Text>
                        </View>
                      </View>
                      <Text style={styles.SubRequestMetaFiligree}>📅 {booking.date} ⏰ {booking.preferredTimeSlot}</Text>
                      <Text style={styles.SubRequestMetaFiligree}>👤 {booking.guestName} · {booking.numberOfGuests} guests</Text>
                      <Text style={styles.SubRequestMetaFiligree}>🪑 {booking.seatPreference}</Text>
                      <Text style={styles.SubRequestCreatedFiligree}>{booking.createdAt}</Text>
                    </View>
                  ))
                )}
              </View>
            )}

            {/* Dining Orders */}
            {showOrders && (
              <View style={styles.SubGroupLintel}>
                <Text style={styles.SubGroupTitleFiligree}>Dining Orders</Text>
                {orders.length === 0 ? (
                  <View style={styles.SubEmptyCard}>
                    <Text style={styles.SubEmptyCardTitleFiligree}>No dining orders yet</Text>
                    <Text style={styles.SubEmptyCardBodyFiligree}>Choose items from the menu and prepare your first dining order.</Text>
                    <PrimaryButton label="Open Dining Menu" onPress={() => selectTab('DiningTab')} compact />
                  </View>
                ) : (
                  orders.map(order => (
                    <View key={order.id} style={styles.SubRequestCard}>
                      <View style={styles.SubRequestHeaderLintel}>
                        <View style={styles.SubRequestHeaderTextLintel}>
                          <Text style={styles.SubRequestTitleFiligree}>
                            {order.items.length} item{order.items.length > 1 ? 's' : ''} · ${order.totalPrice}
                          </Text>
                          <View style={[styles.SubSmallLabelLintel, styles.SubSmallLabelDining]}>
                            <Text style={[styles.SubSmallLabelFiligree, styles.SubSmallLabelDiningFiligree]}>Dining Order</Text>
                          </View>
                        </View>
                        <View style={[styles.SubStatusLintel, styles.SubStatusSent]}>
                          <Text style={[styles.SubStatusFiligree, styles.SubStatusSentFiligree]}>{order.status}</Text>
                        </View>
                      </View>
                      {order.items.map(item => {
                        const menuItem = getMenuItemById(item.itemId);
                        return menuItem ? (
                          <Text key={item.itemId} style={styles.SubRequestMetaFiligree}>
                            {item.quantity}× {menuItem.title}
                          </Text>
                        ) : null;
                      })}
                      <Text style={styles.SubRequestMetaFiligree}>👤 {order.guestName} ⏰ {order.deliveryTime}</Text>
                      <Text style={styles.SubRequestCreatedFiligree}>{order.createdAt}</Text>
                    </View>
                  ))
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  SubFacetChassis: {backgroundColor: colors.surface, flex: 1},
  SubScrollContent: {gap: 16, paddingBottom: 32, paddingHorizontal: layout.screenPadding, paddingTop: 16},
  SubSubtitleFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 13, lineHeight: 19},
  SubFilterStrip: {gap: 8, paddingBottom: 4},
  SubFilterChip: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: 20, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 7},
  SubFilterChipActive: {backgroundColor: 'rgba(255, 44, 203, 0.15)', borderColor: colors.neonPink},
  SubFilterChipFiligree: {color: colors.textMuted, fontFamily: fonts.sansMedium, fontSize: 12},
  SubFilterChipActiveFiligree: {color: colors.neonPink},
  SubGlobalEmptyLintel: {alignItems: 'center', gap: 12, paddingTop: 20},
  SubEmptySigil: {fontSize: 48},
  SubEmptyTitleFiligree: {color: colors.textSecondary, fontFamily: fonts.sansSemiBold, fontSize: 18, fontWeight: '600', textAlign: 'center'},
  SubEmptyBodyFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 14, lineHeight: 20, textAlign: 'center'},
  SubGroupLintel: {gap: 8},
  SubGroupTitleFiligree: {color: colors.textLabel, fontFamily: fonts.sansSemiBold, fontSize: 11, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase'},
  SubEmptyCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 8, padding: 16},
  SubEmptyCardTitleFiligree: {color: colors.textSecondary, fontFamily: fonts.sansSemiBold, fontSize: 14, fontWeight: '600'},
  SubEmptyCardBodyFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 13, lineHeight: 18},
  SubRequestCard: {backgroundColor: colors.card, borderColor: colors.cardBorder, borderRadius: radius.card, borderWidth: 1, gap: 6, padding: 14},
  SubRequestHeaderLintel: {alignItems: 'flex-start', flexDirection: 'row', gap: 10},
  SubRequestIconSigil: {fontSize: 20},
  SubRequestHeaderTextLintel: {flex: 1, gap: 4},
  SubRequestTitleFiligree: {color: colors.textPrimary, fontFamily: fonts.sansSemiBold, fontSize: 14, fontWeight: '600'},
  SubSmallLabelLintel: {alignSelf: 'flex-start', backgroundColor: 'rgba(175, 162, 216, 0.12)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2},
  SubSmallLabelFiligree: {color: colors.textLabel, fontFamily: fonts.sansRegular, fontSize: 10},
  SubSmallLabelDining: {backgroundColor: 'rgba(255, 184, 74, 0.12)'},
  SubSmallLabelDiningFiligree: {color: colors.amber},
  SubStatusLintel: {backgroundColor: colors.inReviewBg, borderColor: colors.inReview, borderRadius: 6, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3},
  SubStatusFiligree: {color: colors.inReview, fontFamily: fonts.sansSemiBold, fontSize: 10, fontWeight: '600'},
  SubStatusInReview: {backgroundColor: 'rgba(139, 61, 255, 0.12)', borderColor: colors.violet},
  SubStatusInReviewFiligree: {color: colors.violet},
  SubStatusSent: {backgroundColor: colors.successBg, borderColor: colors.success},
  SubStatusSentFiligree: {color: colors.success},
  SubRequestMetaFiligree: {color: colors.textMuted, fontFamily: fonts.sansRegular, fontSize: 12},
  SubRequestCreatedFiligree: {color: colors.textLabel, fontFamily: fonts.sansRegular, fontSize: 11},
});
