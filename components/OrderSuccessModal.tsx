import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

interface OrderSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  visible,
  onClose,
}) => {
  const { lastOrderDetails, clearCart } = useCart();

  if (!lastOrderDetails) return null;

  const handleDone = () => {
    clearCart();
    onClose();
  };

  const handleCallRestaurant = () => {
    Linking.openURL(`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleDone}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          {/* Success Icon */}
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-done" size={38} color="#22C55E" />
          </View>

          <Text style={styles.title}>Order Sent to Kitchen!</Text>
          <Text style={styles.subtitle}>
            Your order details have been forwarded to {RESTAURANT_INFO.name}'s WhatsApp for cooking.
          </Text>

          {/* Receipt Card */}
          <View style={styles.receiptCard}>
            <View style={styles.receiptHeader}>
              <View>
                <Text style={styles.receiptTable}>
                  {lastOrderDetails.tableNumber}
                </Text>
                <Text style={styles.receiptTime}>
                  {lastOrderDetails.orderTime}
                </Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>Order Placed</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <ScrollView style={styles.receiptItemsScroll} showsVerticalScrollIndicator={false}>
              {lastOrderDetails.items.map((item: any, idx: number) => {
                let displayName = item.menuItem.name;
                if (item.prepType) {
                  displayName = displayName.replace(
                    'Fried Rice / Noodles',
                    item.prepType
                  );
                }
                if (item.variant) {
                  displayName += ` (${item.variant.name})`;
                }

                return (
                  <View key={idx} style={styles.itemLine}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {item.quantity}x {displayName}
                    </Text>
                    <Text style={styles.itemTotal}>
                      ₹{item.unitPrice * item.quantity}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>

            {lastOrderDetails.specialInstructions ? (
              <View style={styles.notesBox}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesVal}>
                  {lastOrderDetails.specialInstructions}
                </Text>
              </View>
            ) : null}

            <View style={styles.divider} />

            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>Total Bill</Text>
              <Text style={styles.totalValue}>
                ₹{lastOrderDetails.totalAmount}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
              <Text style={styles.doneBtnText}>Back to Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.callBtn}
              onPress={handleCallRestaurant}
            >
              <Ionicons name="call-outline" size={16} color="#F59E0B" />
              <Text style={styles.callBtnText}>Call Restaurant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#1E1E22',
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#14532D33',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#22C55E66',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F9FAFB',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
    lineHeight: 18,
  },
  receiptCard: {
    backgroundColor: '#27272A',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptTable: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F59E0B',
  },
  receiptTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  statusPill: {
    backgroundColor: '#14532D',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
  },
  statusPillText: {
    color: '#86EFAC',
    fontSize: 10,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#3F3F46',
    marginVertical: 12,
  },
  receiptItemsScroll: {
    maxHeight: 140,
  },
  itemLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemTitle: {
    color: '#E5E7EB',
    fontSize: 13,
    flex: 1,
    paddingRight: 8,
  },
  itemTotal: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '600',
  },
  notesBox: {
    backgroundColor: '#1E1E22',
    padding: 8,
    borderRadius: 8,
    marginTop: 6,
  },
  notesLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '700',
  },
  notesVal: {
    fontSize: 11,
    color: '#D1D5DB',
  },
  totalLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F59E0B',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    width: '100%',
  },
  doneBtn: {
    flex: 1,
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#18181B',
    fontSize: 13,
    fontWeight: '800',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#27272A',
    borderWidth: 1,
    borderColor: '#3F3F46',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  callBtnText: {
    color: '#F59E0B',
    fontSize: 13,
    fontWeight: '700',
  },
});
