import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartSheetProps {
  onOrderSuccess: () => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({
  onOrderSuccess,
}) => {
  const {
    cart,
    totalCount,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    tableNumber,
    orderType,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    specialInstructions,
    setSpecialInstructions,
    sendOrderViaWhatsApp,
  } = useCart();

  const [modalVisible, setModalVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (totalCount === 0 && !modalVisible) {
    return null;
  }

  const handleSendOrder = async () => {
    if (cart.length === 0) return;
    setIsSending(true);
    try {
      const success = await sendOrderViaWhatsApp();
      if (success) {
        setModalVisible(false);
        onOrderSuccess();
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not open WhatsApp. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Floating Bottom Bar */}
      {totalCount > 0 && !modalVisible && (
        <View style={styles.floatingBarWrapper}>
          <TouchableOpacity
            style={styles.floatingBar}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.9}
          >
            <View style={styles.floatingBarLeft}>
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{totalCount}</Text>
              </View>
              <View>
                <Text style={styles.floatingTotalText}>₹{totalAmount}</Text>
                <Text style={styles.floatingSubtext}>
                  Freshly Prepared • Dine-In
                </Text>
              </View>
            </View>

            <View style={styles.floatingBarRight}>
              <Text style={styles.viewCartText}>View Order</Text>
              <Ionicons name="cart" size={18} color="#18181B" />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Slide-up Cart Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Your Order Summary</Text>
                <Text style={styles.modalSubtitle}>
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} from {RESTAURANT_INFO.name}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.cartScroll} showsVerticalScrollIndicator={false}>
              {/* Dining Banner */}
              <View style={styles.tableBanner}>
                <View style={styles.tableBannerLeft}>
                  <Ionicons
                    name="restaurant"
                    size={16}
                    color="#F59E0B"
                  />
                  <Text style={styles.tableBannerValue}>
                    {RESTAURANT_INFO.name} • Dine-In
                  </Text>
                </View>
              </View>

              {/* Customer Contact Details (Optional) */}
              <View style={styles.sectionBox}>
                <Text style={styles.sectionHeading}>Customer Details (Optional)</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    placeholder="Your Name"
                    placeholderTextColor="#6B7280"
                    value={customerName}
                    onChangeText={setCustomerName}
                  />
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    placeholder="Mobile No."
                    placeholderTextColor="#6B7280"
                    keyboardType="phone-pad"
                    value={customerPhone}
                    onChangeText={setCustomerPhone}
                  />
                </View>
              </View>

              {/* Items List */}
              <View style={styles.sectionBox}>
                <View style={styles.itemsHeaderRow}>
                  <Text style={styles.sectionHeading}>Items in Cart</Text>
                  <TouchableOpacity onPress={clearCart}>
                    <Text style={styles.clearText}>Clear All</Text>
                  </TouchableOpacity>
                </View>

                {cart.length === 0 ? (
                  <View style={styles.emptyCartBox}>
                    <Ionicons name="basket-outline" size={40} color="#4B5563" />
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                  </View>
                ) : (
                  cart.map((item) => {
                    let displayName = item.menuItem.name;
                    if (item.prepType) {
                      displayName = displayName.replace(
                        'Fried Rice / Noodles',
                        item.prepType
                      );
                    }

                    return (
                      <View key={item.id} style={styles.cartItemRow}>
                        <View style={styles.cartItemLeft}>
                          <View
                            style={[
                              styles.vegBadgeBox,
                              item.menuItem.isVeg
                                ? styles.vegBorder
                                : styles.nonVegBorder,
                            ]}
                          >
                            <View
                              style={[
                                styles.vegBadgeDot,
                                item.menuItem.isVeg
                                  ? styles.vegDotBg
                                  : styles.nonVegDotBg,
                              ]}
                            />
                          </View>
                          <View style={styles.cartItemInfo}>
                            <Text style={styles.cartItemName}>{displayName}</Text>
                            {item.variant && (
                              <Text style={styles.cartItemVariant}>
                                Option: {item.variant.name}
                              </Text>
                            )}
                            {item.itemNotes ? (
                              <Text style={styles.cartItemNote}>
                                📝 {item.itemNotes}
                              </Text>
                            ) : null}
                            <Text style={styles.cartItemPrice}>
                              ₹{item.unitPrice} × {item.quantity} = ₹
                              {item.unitPrice * item.quantity}
                            </Text>
                          </View>
                        </View>

                        {/* Stepper */}
                        <View style={styles.cartStepper}>
                          <TouchableOpacity
                            style={styles.cartStepperBtn}
                            onPress={() => updateQuantity(item.id, -1)}
                          >
                            <Ionicons
                              name={item.quantity === 1 ? 'trash-outline' : 'remove'}
                              size={14}
                              color={item.quantity === 1 ? '#EF4444' : '#F59E0B'}
                            />
                          </TouchableOpacity>
                          <Text style={styles.cartStepperQty}>{item.quantity}</Text>
                          <TouchableOpacity
                            style={styles.cartStepperBtn}
                            onPress={() => updateQuantity(item.id, 1)}
                          >
                            <Ionicons name="add" size={14} color="#F59E0B" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })
                )}
              </View>

              {/* Special Cooking Notes */}
              <View style={styles.sectionBox}>
                <Text style={styles.sectionHeading}>Cooking Instructions for Kitchen</Text>
                <TextInput
                  style={styles.notesTextArea}
                  placeholder="e.g. Less spicy, keep gravy separate, deliver quickly..."
                  placeholderTextColor="#6B7280"
                  multiline
                  numberOfLines={2}
                  value={specialInstructions}
                  onChangeText={setSpecialInstructions}
                />
              </View>

              {/* Bill Details */}
              <View style={styles.sectionBox}>
                <Text style={styles.sectionHeading}>Bill Breakdown</Text>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Item Total</Text>
                  <Text style={styles.billValue}>₹{totalAmount}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Packaging / Service Fee</Text>
                  <Text style={styles.billFreeValue}>FREE</Text>
                </View>
                <View style={[styles.billRow, styles.grandTotalRow]}>
                  <Text style={styles.grandTotalLabel}>Grand Total</Text>
                  <Text style={styles.grandTotalValue}>₹{totalAmount}</Text>
                </View>
              </View>

              {/* Safety & Note Banner */}
              <View style={styles.whatsappNotice}>
                <Ionicons name="logo-whatsapp" size={16} color="#22C55E" />
                <Text style={styles.whatsappNoticeText}>
                  Your order will be instantly pushed to The Mom's Kitchen WhatsApp ({RESTAURANT_INFO.phone}) for cooking.
                </Text>
              </View>
            </ScrollView>

            {/* Bottom Checkout CTA */}
            <View style={styles.footer}>
              <View>
                <Text style={styles.footerTotalLabel}>Total Amount</Text>
                <Text style={styles.footerTotalValue}>₹{totalAmount}</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.whatsappSubmitBtn,
                  cart.length === 0 && styles.btnDisabled,
                ]}
                onPress={handleSendOrder}
                disabled={cart.length === 0 || isSending}
                activeOpacity={0.85}
              >
                {isSending ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
                    <Text style={styles.whatsappBtnText}>Send Order to WhatsApp</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingBarWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    zIndex: 999,
  },
  floatingBar: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartCountBadge: {
    backgroundColor: '#18181B',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#F59E0B',
    fontWeight: '800',
    fontSize: 13,
  },
  floatingTotalText: {
    color: '#18181B',
    fontSize: 16,
    fontWeight: '800',
  },
  floatingSubtext: {
    color: '#3F3F46',
    fontSize: 11,
    fontWeight: '600',
  },
  floatingBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#18181B15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  viewCartText: {
    color: '#18181B',
    fontSize: 13,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1E1E22',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D35',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F9FAFB',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    backgroundColor: '#27272A',
    borderRadius: 20,
  },
  cartScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tableBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#27272A',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3F3F46',
    marginBottom: 14,
  },
  tableBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tableBannerLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  tableBannerValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F9FAFB',
  },
  changeTableBtn: {
    backgroundColor: '#F59E0B22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F59E0B66',
  },
  changeTableText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionBox: {
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  textInput: {
    backgroundColor: '#27272A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F9FAFB',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#3F3F46',
    outlineStyle: 'none' as any,
  },
  itemsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  clearText: {
    color: '#EF4444',
    fontSize: 11,
    fontWeight: '600',
  },
  emptyCartBox: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  emptyCartText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#27272A',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#3F3F46',
  },
  cartItemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
  },
  vegBadgeBox: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  vegBorder: {
    borderColor: '#22C55E',
  },
  nonVegBorder: {
    borderColor: '#EF4444',
  },
  vegBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  vegDotBg: {
    backgroundColor: '#22C55E',
  },
  nonVegDotBg: {
    backgroundColor: '#EF4444',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    color: '#F9FAFB',
    fontSize: 14,
    fontWeight: '700',
  },
  cartItemVariant: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  cartItemNote: {
    color: '#9CA3AF',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 2,
  },
  cartItemPrice: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  cartStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E22',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3F3F46',
    gap: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  cartStepperBtn: {
    padding: 4,
  },
  cartStepperQty: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '800',
    minWidth: 16,
    textAlign: 'center',
  },
  notesTextArea: {
    backgroundColor: '#27272A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#F9FAFB',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#3F3F46',
    textAlignVertical: 'top',
    outlineStyle: 'none' as any,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  billLabel: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  billValue: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '600',
  },
  billFreeValue: {
    color: '#22C55E',
    fontSize: 12,
    fontWeight: '700',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#3F3F46',
    paddingTop: 8,
    marginTop: 6,
  },
  grandTotalLabel: {
    color: '#F9FAFB',
    fontSize: 15,
    fontWeight: '800',
  },
  grandTotalValue: {
    color: '#F59E0B',
    fontSize: 18,
    fontWeight: '800',
  },
  whatsappNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#14532D22',
    borderWidth: 1,
    borderColor: '#22C55E44',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  whatsappNoticeText: {
    color: '#86EFAC',
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#2D2D35',
    backgroundColor: '#18181B',
  },
  footerTotalLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F59E0B',
  },
  whatsappSubmitBtn: {
    backgroundColor: '#22C55E',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  whatsappBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});
